(() => {
  const cards = [...document.querySelectorAll(".icon-example")];
  const search = document.getElementById("iconSearch");
  const category = document.getElementById("iconCategory");
  const feedback = document.getElementById("demoFeedback");
  function announce(message) {
    document.getElementById("feedbackText").textContent = message;
    feedback.hidden = false;
  }
  function filter() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const text =
        `${card.querySelector("h2").textContent} ${card.querySelector(".example-description").textContent} ${card.dataset.category}`.toLowerCase();
      card.hidden = !(
        (category.value === "all" ||
          category.value === card.dataset.category) &&
        text.includes(query)
      );
      if (!card.hidden) visible++;
    });
    document.getElementById("iconCount").textContent =
      `${visible} of ${cards.length} examples`;
    document.getElementById("iconEmpty").hidden = visible > 0;
  }
  search.addEventListener("input", filter);
  category.addEventListener("change", filter);
  document.getElementById("resetIcons").addEventListener("click", () => {
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
    requestAnimationFrame(() => card.scrollIntoView());
  }
  window.addEventListener("hashchange", revealHash);
  if (location.hash) revealHash();
  document.getElementById("dismissFeedback").addEventListener("click", () => {
    feedback.hidden = true;
  });
  document
    .querySelectorAll("[data-demo-message]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        announce(button.dataset.demoMessage),
      ),
    );
  document.querySelectorAll("[data-toggle-icon]").forEach((button) =>
    button.addEventListener("click", () => {
      const selected = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("active", selected);
      button.querySelector("i").classList.toggle("fa-solid", selected);
      button.querySelector("i").classList.toggle("fa-regular", !selected);
      button.querySelector("span").textContent =
        button.dataset.toggleIcon === "heart"
          ? selected
            ? "Liked"
            : "Like example"
          : selected
            ? "Saved"
            : "Save example";
    }),
  );
  document.querySelectorAll("[data-view]").forEach((button) =>
    button.addEventListener("click", () => {
      button.parentElement.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      button
        .closest(".example-demo")
        .querySelector(".view-preview").textContent =
        `${button.dataset.view} view selected`;
    }),
  );
  const sampleSearch = document.getElementById("sampleSearch");
  function findSample() {
    const query = sampleSearch.value.trim().toLowerCase();
    const files = ["Report.pdf", "Cover.png", "Budget.xlsx"];
    const matches = files.filter((file) => file.toLowerCase().includes(query));
    document.getElementById("sampleSearchResult").textContent = query
      ? matches.length
        ? `Found: ${matches.join(", ")}`
        : "No matching sample files."
      : "Enter a file name to search.";
  }
  document
    .getElementById("sampleSearchButton")
    .addEventListener("click", findSample);
  sampleSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      findSample();
    }
  });
  document.getElementById("downloadSample").addEventListener("click", () => {
    const url = URL.createObjectURL(
      new Blob(
        ["Hello from Foundation\nA local Font Awesome download example.\n"],
        { type: "text/plain" },
      ),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "foundation-example.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce("Your sample text-file download has started.");
  });
  document.getElementById("copySample").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("Hello from Foundation");
      announce("Copied: Hello from Foundation");
    } catch {
      announce(
        "Clipboard unavailable. Select and copy this text: Hello from Foundation",
      );
    }
  });
  const motion = document.getElementById("toggleMotion");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  function setMotion(enabled) {
    document.body.classList.toggle("motion-enabled", enabled);
    motion.setAttribute("aria-pressed", String(enabled));
    motion.querySelector("span").textContent = enabled
      ? "Pause animations"
      : "Play animations";
    motion.querySelector("i").className =
      `fa-solid fa-${enabled ? "pause" : "play"}`;
  }
  motion.addEventListener("click", () => {
    if (reducedMotion.matches) {
      setMotion(false);
      announce(
        "Animations remain paused to respect your reduced-motion preference.",
      );
      return;
    }
    setMotion(motion.getAttribute("aria-pressed") !== "true");
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) setMotion(false);
  });
  const status = document.getElementById("fontStatus");
  Promise.all([
    document.fonts.load('900 16px "Font Awesome 6 Free"'),
    document.fonts.load('400 16px "Font Awesome 6 Free"'),
    document.fonts.load('400 16px "Font Awesome 6 Brands"'),
  ])
    .then((fonts) => {
      if (fonts.some((group) => !group.length))
        throw new Error("Missing icon font");
      status.textContent =
        "Font Awesome Free 6.7.2 · Solid, Regular, and Brands";
    })
    .catch(() => {
      status.textContent =
        "Some icons could not load. Check your internet connection and reload; text labels and HTML examples are still available.";
    });
})();
