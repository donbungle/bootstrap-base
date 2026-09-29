/* Gallery controls are independent of Plotly, so discovery still works if its CDN fails. */
(() => {
  const examples = window.chartExamples;
  const cards = [...document.querySelectorAll(".chart-card")];
  const search = document.getElementById("chartSearch");
  const category = document.getElementById("chartCategory");
  const count = document.getElementById("resultCount");
  const status = document.getElementById("libraryStatus");
  const colors = [
    "#6651d9",
    "#35a896",
    "#edac62",
    "#d56e9e",
    "#749ce0",
    "#9e82c5",
  ];
  const config = {
    responsive: true,
    displaylogo: false,
    scrollZoom: false,
    displayModeBar: true,
    modeBarButtonsToRemove: ["sendDataToCloud"],
    toImageButtonOptions: { format: "png", scale: 2 },
  };
  const axis = {
    automargin: true,
    gridcolor: "#efedf4",
    zerolinecolor: "#ddd7e9",
    tickfont: { size: 10 },
  };
  const makeLayout = (example) => ({
    autosize: true,
    height: 330,
    margin: { l: 45, r: 24, t: 35, b: 48 },
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
    colorway: colors,
    font: { family: "Arial, sans-serif", size: 11, color: "#696175" },
    showlegend:
      example.data.length > 1 ||
      example.data.some((trace) => ["pie", "funnelarea"].includes(trace.type)),
    legend: { orientation: "h", x: 0, y: -0.23, font: { size: 10 } },
    ...example.layout,
    xaxis: { ...axis, ...example.layout.xaxis },
    yaxis: { ...axis, ...example.layout.yaxis },
  });
  examples.forEach((example) => {
    document.querySelector(`#${example.id} pre`).textContent = JSON.stringify(
      { data: example.data, layout: makeLayout(example), config },
      null,
      2,
    );
  });
  let observer;
  let queue = Promise.resolve();
  function schedule(card) {
    if (!window.Plotly || card.hidden || card.dataset.state) return;
    card.dataset.state = "queued";
    // Serial rendering prevents a burst of expensive work when many cards enter view.
    queue = queue.then(async () => {
      if (card.hidden) {
        delete card.dataset.state;
        return;
      }
      const example = examples.find((item) => item.id === card.id);
      const plot = card.querySelector(".chart-plot");
      const message = card.querySelector(".chart-loading");
      try {
        await Plotly.newPlot(
          plot,
          structuredClone(example.data),
          makeLayout(example),
          config,
        );
        card.dataset.state = "ready";
        message.hidden = true;
        plot.setAttribute("aria-busy", "false");
      } catch (error) {
        card.dataset.state = "error";
        message.textContent =
          "This chart could not render. Reload to retry; its description and definition are available below.";
        message.classList.add("text-danger");
        plot.setAttribute("aria-busy", "false");
        console.error(`Unable to render ${example.id}`, error);
      }
    });
  }
  function observeVisible() {
    if (!window.Plotly) return;
    cards
      .filter((card) => !card.hidden)
      .forEach((card) => {
        if (card.dataset.state === "ready")
          Plotly.Plots.resize(card.querySelector(".chart-plot"));
        else if (observer) {
          observer.unobserve(card);
          observer.observe(card);
        } else schedule(card);
      });
  }
  function filter() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card, i) => {
      const example = examples[i];
      card.hidden = !(
        (category.value === "all" || category.value === example.category) &&
        `${example.title} ${example.description} ${example.category}`
          .toLowerCase()
          .includes(query)
      );
      if (!card.hidden) visible++;
    });
    count.textContent = `${visible} of ${examples.length} charts`;
    document.getElementById("emptyState").hidden = visible > 0;
    observeVisible();
  }
  search.addEventListener("input", filter);
  category.addEventListener("change", filter);
  document.getElementById("resetFilters").addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    filter();
    search.focus();
  });
  function revealHash() {
    const card = cards.find((item) => `#${item.id}` === location.hash);
    if (!card) return;
    if (card.hidden) {
      search.value = "";
      category.value = "all";
      filter();
    }
    schedule(card);
    requestAnimationFrame(() => card.scrollIntoView());
  }
  if (window.Plotly) {
    status.textContent = `Plotly ${Plotly.version} · Hover, zoom, and export your charts`;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) schedule(entry.target);
          }),
        { rootMargin: "250px" },
      );
    }
    observeVisible();
  } else {
    status.textContent =
      "Plotly could not load. Check your internet connection and reload. Chart descriptions and definitions remain available.";
    status.setAttribute("role", "alert");
    cards.forEach((card) => {
      card.querySelector(".chart-loading").textContent =
        "Chart unavailable — Plotly did not load.";
      card.querySelector(".chart-plot").setAttribute("aria-busy", "false");
    });
  }
  window.addEventListener("hashchange", revealHash);
  if (location.hash) revealHash();
})();
