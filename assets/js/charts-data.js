/* Deterministic, local sample data. Each entry is a reusable Plotly figure.
 * No fetch calls or build tooling: works when charts.html is opened directly. */
window.chartExamples = (() => {
  const examples = [];
  const colors = [
    "#6651d9",
    "#35a896",
    "#edac62",
    "#d56e9e",
    "#749ce0",
    "#9e82c5",
  ];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const sales = [24, 32, 29, 45, 51, 62];
  const teams = ["Design", "Product", "Engineering", "Support"];
  const add = (category, title, description, data, layout = {}) =>
    examples.push({
      id: `chart-${String(examples.length + 1).padStart(2, "0")}`,
      category,
      title,
      description,
      data,
      layout,
    });
  const line = (y, extra = {}) => ({
    type: "scatter",
    mode: "lines+markers",
    x: months,
    y,
    ...extra,
  });
  const bar = (y, extra = {}) => ({ type: "bar", x: teams, y, ...extra });
  const sample = Array.from(
    { length: 90 },
    (_, i) => 45 + 12 * Math.sin(i * 1.7) + 8 * Math.cos(i * 0.63),
  );
  const sample2 = sample.map((v, i) => v + 9 + 4 * Math.sin(i));
  const matrix = [
    [2, 4, 6, 8, 5],
    [3, 7, 9, 6, 4],
    [5, 8, 12, 7, 3],
    [2, 5, 7, 4, 1],
  ];

  add(
    "Trends",
    "Classic line",
    "Monthly sales rise from 24 to 62 units, with a small dip in March.",
    [line(sales)],
    { yaxis: { title: { text: "Units sold" } } },
  );
  add(
    "Trends",
    "Multiple lines",
    "Compare sales and a steadily increasing target over six months.",
    [
      line(sales, { name: "Sales" }),
      line([28, 33, 38, 43, 48, 53], { name: "Target" }),
    ],
  );
  add(
    "Trends",
    "Smooth spline",
    "A curved line emphasizes the overall shape of monthly demand.",
    [line(sales, { line: { shape: "spline", width: 3 }, marker: { size: 8 } })],
  );
  add(
    "Trends",
    "Step line",
    "Capacity changes in discrete steps rather than continuously.",
    [
      line([20, 20, 40, 40, 60, 60], {
        line: { shape: "hv", color: colors[1] },
      }),
    ],
  );
  add(
    "Trends",
    "Filled area",
    "A filled baseline emphasizes the size of the monthly total.",
    [line(sales, { fill: "tozeroy", fillcolor: "rgba(102,81,217,.16)" })],
  );
  add(
    "Trends",
    "Stacked area",
    "Organic and referral traffic combine into a growing total.",
    [
      line([20, 26, 29, 35, 40, 44], {
        stackgroup: "traffic",
        name: "Organic",
      }),
      line([8, 10, 12, 14, 16, 20], {
        stackgroup: "traffic",
        name: "Referral",
      }),
    ],
  );
  add(
    "Trends",
    "Confidence band",
    "An illustrative uncertainty band surrounds the central forecast.",
    [
      line(
        sales.map((v) => v - 8),
        {
          mode: "lines",
          line: { width: 0 },
          showlegend: false,
          hoverinfo: "skip",
        },
      ),
      line(
        sales.map((v) => v + 8),
        {
          mode: "lines",
          fill: "tonexty",
          fillcolor: "rgba(102,81,217,.15)",
          line: { width: 0 },
          name: "±8 units",
        },
      ),
      line(sales, { name: "Forecast" }),
    ],
  );
  add(
    "Trends",
    "Dashed forecast",
    "A dashed segment distinguishes future estimates from observed values.",
    [
      {
        type: "scatter",
        x: months.slice(0, 4),
        y: sales.slice(0, 4),
        mode: "lines+markers",
        name: "Observed",
      },
      {
        type: "scatter",
        x: months.slice(3),
        y: sales.slice(3),
        mode: "lines+markers",
        line: { dash: "dash", color: colors[2] },
        name: "Forecast",
      },
    ],
  );
  add(
    "Trends",
    "Range slider",
    "Use the slider below the timeline to inspect a smaller date window.",
    [
      {
        type: "scatter",
        mode: "lines",
        x: Array.from(
          { length: 24 },
          (_, i) =>
            `2026-${String(Math.floor(i / 2) + 1).padStart(2, "0")}-${i % 2 ? "15" : "01"}`,
        ),
        y: Array.from({ length: 24 }, (_, i) => 30 + i * 2 + 9 * Math.sin(i)),
      },
    ],
    {
      xaxis: { type: "date", rangeslider: { visible: true, thickness: 0.17 } },
    },
  );
  add(
    "Trends",
    "Logarithmic growth",
    "A logarithmic vertical axis makes exponential growth easier to compare.",
    [line([10, 30, 100, 300, 1000, 3000], { marker: { color: colors[1] } })],
    { yaxis: { type: "log", title: { text: "Users · log scale" } } },
  );

  add(
    "Comparison",
    "Vertical bars",
    "Engineering has the largest project count among four teams.",
    [bar([18, 24, 38, 16])],
  );
  add(
    "Comparison",
    "Horizontal bars",
    "Horizontal labels give category names room to breathe.",
    [
      {
        type: "bar",
        orientation: "h",
        y: teams,
        x: [18, 24, 38, 16],
        marker: { color: colors[1] },
      },
    ],
  );
  add(
    "Comparison",
    "Grouped bars",
    "Compare completed and planned work side by side for each team.",
    [
      bar([18, 24, 38, 16], { name: "Completed" }),
      bar([22, 28, 42, 20], { name: "Planned" }),
    ],
    { barmode: "group" },
  );
  add(
    "Comparison",
    "Stacked bars",
    "Completed work and remaining work add up to each team’s workload.",
    [
      bar([18, 24, 38, 16], { name: "Completed" }),
      bar([8, 12, 10, 6], { name: "Remaining" }),
    ],
    { barmode: "stack" },
  );
  add(
    "Comparison",
    "100% stacked bars",
    "Normalize each team’s workload to compare completion percentages.",
    [
      bar([18, 24, 38, 16], { name: "Completed" }),
      bar([8, 12, 10, 6], { name: "Remaining" }),
    ],
    { barmode: "stack", barnorm: "percent", yaxis: { ticksuffix: "%" } },
  );
  add(
    "Comparison",
    "Diverging bars",
    "Positive and negative responses extend in opposite directions.",
    [
      bar([18, 24, 30, 20], { name: "Positive" }),
      bar([-8, -5, -12, -6], {
        name: "Negative",
        marker: { color: colors[3] },
      }),
    ],
    {
      barmode: "relative",
      yaxis: { zeroline: true, zerolinecolor: "#8a809e" },
    },
  );
  add(
    "Comparison",
    "Patterned bars",
    "Patterns provide an additional visual cue beyond category color.",
    [
      bar([18, 24, 38, 16], {
        marker: { color: colors, pattern: { shape: ["/", "x", ".", "+"] } },
      }),
    ],
  );
  add(
    "Comparison",
    "Lollipop",
    "Thin stems and large markers create a lighter alternative to bars.",
    [
      bar([18, 24, 38, 16], { width: 0.04, showlegend: false }),
      {
        type: "scatter",
        mode: "markers",
        x: teams,
        y: [18, 24, 38, 16],
        marker: { size: 16, color: colors[0] },
        showlegend: false,
      },
    ],
  );
  add(
    "Comparison",
    "Dumbbell",
    "Connecting two dots reveals the change from before to after.",
    { before: [18, 24, 28, 16], after: [28, 32, 38, 26] }.before.map(
      (v, i) => ({
        type: "scatter",
        mode: "lines+markers",
        x: [v, [28, 32, 38, 26][i]],
        y: [teams[i], teams[i]],
        line: { color: "#d7d0e9", width: 3 },
        marker: { color: [colors[0], colors[1]], size: 12 },
        showlegend: false,
        text: ["Before", "After"],
        hovertemplate: "%{y}: %{x} (%{text})<extra></extra>",
      }),
    ),
    { xaxis: { title: { text: "Score · purple: before, green: after" } } },
  );
  add(
    "Comparison",
    "Ranked dot plot",
    "Ordered dots make differences between category totals easy to scan.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: [16, 18, 24, 38],
        y: ["Support", "Design", "Product", "Engineering"],
        marker: {
          size: 14,
          color: [16, 18, 24, 38],
          colorscale: [
            [0, "#f1ecfc"],
            [0.5, "#b4a1e0"],
            [1, "#59418e"],
          ],
          showscale: false,
        },
      },
    ],
  );

  add(
    "Distribution",
    "Histogram",
    "Count observations within equal-width bins.",
    [
      {
        type: "histogram",
        x: sample,
        nbinsx: 12,
        marker: { color: colors[0], line: { color: "white", width: 1 } },
      },
    ],
    { bargap: 0.06 },
  );
  add(
    "Distribution",
    "Overlaid histograms",
    "Transparent distributions reveal overlap between two cohorts.",
    [
      {
        type: "histogram",
        x: sample,
        opacity: 0.6,
        name: "Cohort A",
        xbins: { start: 20, end: 85, size: 5 },
      },
      {
        type: "histogram",
        x: sample2,
        opacity: 0.6,
        name: "Cohort B",
        xbins: { start: 20, end: 85, size: 5 },
      },
    ],
    { barmode: "overlay" },
  );
  add(
    "Distribution",
    "Cumulative histogram",
    "The cumulative percentage reaches 100% at the largest observations.",
    [
      {
        type: "histogram",
        x: sample,
        cumulative: { enabled: true },
        histnorm: "percent",
        nbinsx: 12,
      },
    ],
    { yaxis: { ticksuffix: "%" } },
  );
  add(
    "Distribution",
    "Box plot",
    "Quartiles and whiskers summarize two cohorts with different centers.",
    [
      { type: "box", y: sample, name: "Cohort A" },
      { type: "box", y: sample2, name: "Cohort B" },
    ],
  );
  add(
    "Distribution",
    "Horizontal box plot",
    "Horizontal distributions make room for longer group labels.",
    [
      { type: "box", x: sample, name: "New customers", boxpoints: false },
      {
        type: "box",
        x: sample2,
        name: "Returning customers",
        boxpoints: false,
      },
    ],
  );
  add(
    "Distribution",
    "Violin plot",
    "The width of each violin describes the shape of its distribution.",
    [
      {
        type: "violin",
        y: sample,
        name: "Cohort A",
        box: { visible: true },
        meanline: { visible: true },
      },
      {
        type: "violin",
        y: sample2,
        name: "Cohort B",
        box: { visible: true },
        meanline: { visible: true },
      },
    ],
  );
  add(
    "Distribution",
    "Jittered observations",
    "Individual observations are spread around a box summary.",
    [
      {
        type: "box",
        y: sample.slice(0, 35),
        name: "Observations",
        boxpoints: "all",
        jitter: 0.5,
        pointpos: -1.6,
        marker: { size: 5, opacity: 0.65 },
      },
    ],
  );
  add(
    "Distribution",
    "Empirical cumulative curve",
    "Each sorted observation contributes an equal step to the cumulative share.",
    [
      {
        type: "scatter",
        mode: "lines",
        x: [...sample].sort((a, b) => a - b),
        y: sample.map((_, i) => (i + 1) / sample.length),
        line: { shape: "hv", color: colors[1] },
      },
    ],
    { yaxis: { tickformat: ".0%", title: { text: "Cumulative share" } } },
  );

  const xs = Array.from({ length: 35 }, (_, i) => i + 1);
  const ys = xs.map((i) => 12 + i * 1.7 + 9 * Math.sin(i * 1.5));
  add(
    "Relationships",
    "Scatter plot",
    "The sample points show a positive relationship with some variation.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: xs,
        y: ys,
        marker: { size: 9, opacity: 0.75 },
      },
    ],
    {
      xaxis: { title: { text: "Effort" } },
      yaxis: { title: { text: "Outcome" } },
    },
  );
  add(
    "Relationships",
    "Bubble chart",
    "Marker size adds a third dimension to the relationship.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: [12, 20, 28, 35, 42],
        y: [20, 38, 30, 55, 48],
        text: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        marker: {
          size: [16, 30, 22, 44, 36],
          sizemode: "diameter",
          color: colors,
          opacity: 0.7,
        },
      },
    ],
  );
  add(
    "Relationships",
    "Continuous color scatter",
    "Marker color encodes a continuous score alongside position.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: xs,
        y: ys,
        marker: {
          size: 10,
          color: xs,
          colorscale: "Viridis",
          showscale: true,
          colorbar: { thickness: 10, title: { text: "Score" } },
        },
      },
    ],
  );
  add(
    "Relationships",
    "Error bars",
    "Vertical error bars communicate illustrative measurement uncertainty.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: teams,
        y: [24, 32, 40, 28],
        error_y: { type: "data", array: [3, 5, 4, 6], visible: true },
        marker: { size: 12 },
      },
    ],
  );
  add(
    "Relationships",
    "Reference trend line",
    "Observed points are compared with the known generating trend, not a fitted regression.",
    [
      {
        type: "scatter",
        mode: "markers",
        x: xs,
        y: ys,
        name: "Observations",
        marker: { opacity: 0.6 },
      },
      {
        type: "scatter",
        mode: "lines",
        x: [1, 35],
        y: [13.7, 71.5],
        name: "Reference trend",
        line: { color: colors[2], dash: "dash" },
      },
    ],
  );
  add(
    "Relationships",
    "Connected scatter",
    "A connecting path reveals the order of six observations.",
    [
      {
        type: "scatter",
        mode: "lines+markers+text",
        x: [20, 35, 28, 45, 40, 55],
        y: [30, 28, 45, 38, 55, 60],
        text: months,
        textposition: "top center",
        marker: { size: 10 },
        line: { color: colors[1] },
      },
    ],
  );

  const labels = ["Direct", "Search", "Social", "Referral"];
  const values = [38, 30, 20, 12];
  add(
    "Composition",
    "Pie chart",
    "Slices show the four traffic sources as parts of a whole.",
    [{ type: "pie", labels, values, textinfo: "percent", marker: { colors } }],
  );
  add(
    "Composition",
    "Donut chart",
    "A central opening leaves room for a concise total.",
    [
      {
        type: "pie",
        labels,
        values,
        hole: 0.65,
        textinfo: "percent",
        marker: { colors },
      },
    ],
    {
      annotations: [
        {
          text: "<b>100%</b><br>traffic",
          x: 0.5,
          y: 0.5,
          showarrow: false,
          font: { size: 19 },
        },
      ],
    },
  );
  add(
    "Composition",
    "Pulled slice",
    "One separated slice emphasizes the largest traffic source.",
    [
      {
        type: "pie",
        labels,
        values,
        pull: [0.1, 0, 0, 0],
        marker: { colors },
        textinfo: "label+percent",
        textposition: "inside",
      },
    ],
  );
  add(
    "Composition",
    "Treemap",
    "Nested rectangles show category sizes within a hierarchy.",
    [
      {
        type: "treemap",
        labels: [
          "Portfolio",
          "Web",
          "Mobile",
          "Design",
          "Commerce",
          "Content",
          "iOS",
          "Android",
        ],
        parents: [
          "",
          "Portfolio",
          "Portfolio",
          "Portfolio",
          "Web",
          "Web",
          "Mobile",
          "Mobile",
        ],
        values: [100, 45, 35, 20, 25, 20, 20, 15],
        branchvalues: "total",
        textinfo: "label+value",
      },
    ],
  );
  add(
    "Composition",
    "Sunburst",
    "Concentric rings reveal parent-child relationships.",
    [
      {
        type: "sunburst",
        labels: [
          "Portfolio",
          "Web",
          "Mobile",
          "Design",
          "Commerce",
          "Content",
          "iOS",
          "Android",
        ],
        parents: [
          "",
          "Portfolio",
          "Portfolio",
          "Portfolio",
          "Web",
          "Web",
          "Mobile",
          "Mobile",
        ],
        values: [100, 45, 35, 20, 25, 20, 20, 15],
        branchvalues: "total",
      },
    ],
  );
  add(
    "Composition",
    "Icicle",
    "Rectangular tiers display the same hierarchy from top to bottom.",
    [
      {
        type: "icicle",
        labels: [
          "Portfolio",
          "Web",
          "Mobile",
          "Design",
          "Commerce",
          "Content",
          "iOS",
          "Android",
        ],
        parents: [
          "",
          "Portfolio",
          "Portfolio",
          "Portfolio",
          "Web",
          "Web",
          "Mobile",
          "Mobile",
        ],
        values: [100, 45, 35, 20, 25, 20, 20, 15],
        branchvalues: "total",
        tiling: { orientation: "v" },
      },
    ],
  );
  add(
    "Composition",
    "Funnel area",
    "Area narrows as prospects move through the sample sales process.",
    [
      {
        type: "funnelarea",
        labels: ["Visits", "Leads", "Qualified", "Customers"],
        values: [1000, 650, 380, 180],
        marker: { colors },
        textinfo: "label+value",
      },
    ],
  );
  add(
    "Composition",
    "Sankey flow",
    "Link widths show how traffic sources split across two destinations.",
    [
      {
        type: "sankey",
        node: {
          label: ["Search", "Direct", "Social", "Store", "Blog"],
          color: colors,
          pad: 20,
          thickness: 15,
        },
        link: {
          source: [0, 0, 1, 1, 2, 2],
          target: [3, 4, 3, 4, 3, 4],
          value: [30, 20, 25, 10, 5, 15],
          color: "rgba(102,81,217,.2)",
        },
      },
    ],
  );

  add(
    "Specialized",
    "Heatmap",
    "Color intensity reveals patterns in a team-by-day matrix.",
    [
      {
        type: "heatmap",
        z: matrix,
        x: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        y: teams,
        colorscale: [
          [0, "#f1ecfc"],
          [0.5, "#b4a1e0"],
          [1, "#59418e"],
        ],
        colorbar: { thickness: 10 },
      },
    ],
  );
  add(
    "Specialized",
    "Annotated heatmap",
    "Printed values make the colored matrix readable without relying on color alone.",
    [
      {
        type: "heatmap",
        z: matrix,
        x: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        y: teams,
        colorscale: "Blues",
        texttemplate: "%{z}",
        showscale: false,
      },
    ],
  );
  add(
    "Specialized",
    "Filled contour",
    "Contour bands connect equal levels on a sample response surface.",
    [
      {
        type: "contour",
        z: matrix,
        colorscale: "Viridis",
        contours: { coloring: "fill" },
        colorbar: { thickness: 10 },
      },
    ],
  );
  add(
    "Specialized",
    "Contour lines",
    "Labeled contour lines expose the shape of the surface without filled bands.",
    [
      {
        type: "contour",
        z: matrix,
        contours: { coloring: "lines", showlabels: true },
        colorscale: [
          [0, "#f1ecfc"],
          [0.5, "#b4a1e0"],
          [1, "#59418e"],
        ],
        showscale: false,
      },
    ],
  );
  add(
    "Specialized",
    "Radar comparison",
    "Compare two profiles across five common capabilities.",
    [
      {
        type: "scatterpolar",
        r: [80, 60, 75, 90, 65, 80],
        theta: ["Speed", "Quality", "Cost", "Support", "Scale", "Speed"],
        fill: "toself",
        name: "Studio",
      },
      {
        type: "scatterpolar",
        r: [65, 85, 60, 75, 90, 65],
        theta: ["Speed", "Quality", "Cost", "Support", "Scale", "Speed"],
        fill: "toself",
        name: "Business",
      },
    ],
    { polar: { radialaxis: { range: [0, 100] } } },
  );
  add(
    "Specialized",
    "Polar bars",
    "Radial bars represent counts across eight compass directions.",
    [
      {
        type: "barpolar",
        r: [12, 18, 25, 16, 10, 14, 22, 17],
        theta: [0, 45, 90, 135, 180, 225, 270, 315],
        marker: {
          color: [12, 18, 25, 16, 10, 14, 22, 17],
          colorscale: [
            [0, "#f1ecfc"],
            [0.5, "#b4a1e0"],
            [1, "#59418e"],
          ],
        },
      },
    ],
  );
  add(
    "Specialized",
    "Waterfall",
    "Positive and negative contributions bridge an opening and closing balance.",
    [
      {
        type: "waterfall",
        x: ["Opening", "Sales", "Services", "Costs", "Closing"],
        measure: ["absolute", "relative", "relative", "relative", "total"],
        y: [100, 60, 25, -45, 0],
        increasing: { marker: { color: colors[1] } },
        decreasing: { marker: { color: colors[3] } },
        totals: { marker: { color: colors[0] } },
      },
    ],
  );
  add(
    "Specialized",
    "Conversion funnel",
    "Horizontal stages compare visitor counts through a conversion process.",
    [
      {
        type: "funnel",
        y: ["Visits", "Sign-ups", "Trials", "Paid"],
        x: [1200, 780, 420, 190],
        textinfo: "value+percent initial",
        marker: { color: colors },
      },
    ],
  );
  add(
    "Specialized",
    "Angular gauge",
    "An indicator shows 72 out of 100 against an 85-point threshold.",
    [
      {
        type: "indicator",
        mode: "gauge+number",
        value: 72,
        title: { text: "Readiness" },
        gauge: {
          axis: { range: [0, 100] },
          bar: { color: colors[0] },
          steps: [
            { range: [0, 50], color: "#f1eefb" },
            { range: [50, 100], color: "#dcd4f5" },
          ],
          threshold: { value: 85, line: { color: colors[3], width: 3 } },
        },
      },
    ],
  );
  add(
    "Specialized",
    "Bullet indicator",
    "A compact gauge compares current performance with a target of 90.",
    [
      {
        type: "indicator",
        mode: "number+gauge+delta",
        value: 78,
        delta: { reference: 70 },
        domain: { x: [0.1, 0.9], y: [0.3, 0.7] },
        title: { text: "Delivery" },
        gauge: {
          shape: "bullet",
          axis: { range: [0, 100] },
          bar: { color: colors[1] },
          threshold: { value: 90, line: { color: colors[0], width: 3 } },
          steps: [
            { range: [0, 60], color: "#eeebf5" },
            { range: [60, 100], color: "#dbede8" },
          ],
        },
      },
    ],
  );
  add(
    "Specialized",
    "Candlestick",
    "Daily open, high, low, and close values describe sample price movement.",
    [
      {
        type: "candlestick",
        x: [
          "2026-09-21",
          "2026-09-22",
          "2026-09-23",
          "2026-09-24",
          "2026-09-25",
        ],
        open: [30, 33, 31, 35, 36],
        high: [35, 36, 37, 38, 40],
        low: [28, 30, 29, 33, 34],
        close: [33, 31, 35, 36, 39],
        increasing: { line: { color: colors[1] } },
        decreasing: { line: { color: colors[3] } },
      },
    ],
    { xaxis: { rangeslider: { visible: false } }, yaxis: { tickprefix: "$" } },
  );
  add(
    "Specialized",
    "OHLC",
    "Thin price bars offer another view of the same daily market ranges.",
    [
      {
        type: "ohlc",
        x: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        open: [30, 33, 31, 35, 36],
        high: [35, 36, 37, 38, 40],
        low: [28, 30, 29, 33, 34],
        close: [33, 31, 35, 36, 39],
        increasing: { line: { color: colors[1] } },
        decreasing: { line: { color: colors[3] } },
      },
    ],
    { yaxis: { tickprefix: "$" } },
  );
  return examples;
})();
