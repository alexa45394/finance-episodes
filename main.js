// ─────────────────────────────────────────────
// CPI DATA — BLS CPI-U Annual Averages 2000–2025
// Source: Minneapolis Fed / BLS
// https://www.minneapolisfed.org/about-us/monetary-policy/inflation-calculator/consumer-price-index-1913-
// ─────────────────────────────────────────────

const CPI_DATA = [
  { year: 2000, cpi: 172.2 },
  { year: 2001, cpi: 177.1 },
  { year: 2002, cpi: 179.9 },
  { year: 2003, cpi: 184.0 },
  { year: 2004, cpi: 188.9 },
  { year: 2005, cpi: 195.3 },
  { year: 2006, cpi: 201.6 },
  { year: 2007, cpi: 207.3 },
  { year: 2008, cpi: 215.3 },
  { year: 2009, cpi: 214.5 },
  { year: 2010, cpi: 218.1 },
  { year: 2011, cpi: 224.9 },
  { year: 2012, cpi: 229.6 },
  { year: 2013, cpi: 233.0 },
  { year: 2014, cpi: 236.7 },
  { year: 2015, cpi: 237.0 },
  { year: 2016, cpi: 240.0 },
  { year: 2017, cpi: 245.1 },
  { year: 2018, cpi: 251.1 },
  { year: 2019, cpi: 255.7 },
  { year: 2020, cpi: 258.8 },
  { year: 2021, cpi: 271.0 },
  { year: 2022, cpi: 292.7 },
  { year: 2023, cpi: 304.7 },
  { year: 2024, cpi: 313.7 },
  { year: 2025, cpi: 321.9 },
];

const CPI_BASE_YEAR = 2000;
const CPI_BASE = 172.2;

const EPISODE_ANNOTATIONS = [
  { year: 2000, label: "Dot-Com" },
  { year: 2008, label: "2008 Crisis" },
  { year: 2020, label: "COVID" },
  { year: 2022, label: "Inflation" },
  { year: 2023, label: "AI Rally" },
];

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

let state = {
  episode: "Dot-Com Crash",
  asset: "S&P 500",
  currentSlide: 1,
};

let crisisData = [];
let episodeMeta = [];

// ─────────────────────────────────────────────
// LOAD DATA
// ─────────────────────────────────────────────

Promise.all([
  d3.csv("data/market_crisis_data.csv"),
  d3.json("data/crisis_periods.json"),
]).then(([csvData, jsonMeta]) => {

  crisisData = csvData.map(d => ({
    ...d,
    date: new Date(d.date),
    indexed_100: +d.indexed_100,
    episode_day: +d.episode_day,
  }));

  episodeMeta = jsonMeta;

  populateAssetDropdown();
  drawInflationChart();
});

// ─────────────────────────────────────────────
// POPULATE ASSET DROPDOWN
// ─────────────────────────────────────────────

function populateAssetDropdown() {
  const assets = [...new Set(crisisData.map(d => d.asset_name))].sort();
  const dropdown = d3.select("#asset-dropdown");

  dropdown.selectAll("option")
    .data(assets)
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  dropdown.property("value", "S&P 500");

  dropdown.on("change", function () {
    state.asset = this.value;
  });
}

// ─────────────────────────────────────────────
// EPISODE BUTTONS
// ─────────────────────────────────────────────

d3.selectAll(".episode-btn").on("click", function () {
  d3.selectAll(".episode-btn").classed("active", false);
  d3.select(this).classed("active", true);
  state.episode = this.dataset.episode;
});

// ─────────────────────────────────────────────
// BEGIN BUTTON — launches the slideshow
// ─────────────────────────────────────────────

document.getElementById("begin-btn").addEventListener("click", () => {
  // Show episode story banner
  const meta = episodeMeta.find(d => d.episode === state.episode);
  if (meta) {
    const banner = document.getElementById("episode-banner");
    banner.textContent = `${state.episode}: ${meta.story}`;
    banner.classList.add("visible");
  }

  // Show slideshow, go to slide 1
  document.getElementById("slideshow").classList.add("visible");
  goToSlide(1);

  // Scroll down to slideshow
  document.getElementById("slideshow").scrollIntoView({ behavior: "smooth" });
});

// ─────────────────────────────────────────────
// SLIDE NAVIGATION
// ─────────────────────────────────────────────

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.direction;
    if (direction === "next") goToSlide(state.currentSlide + 1);
    if (direction === "back") goToSlide(state.currentSlide - 1);
  });
});

function goToSlide(n) {
  // Clamp between 1 and 4
  n = Math.max(1, Math.min(4, n));
  state.currentSlide = n;

  // Hide all slides, show the target
  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
  document.getElementById(`slide-${n}`).classList.add("active");

  // Draw the right chart when we land on slide 2
  if (n === 2) drawMainChart();

  // Scroll to top of slideshow
  document.getElementById("slideshow").scrollIntoView({ behavior: "smooth" });
}

// ─────────────────────────────────────────────
// INFLATION CHART
// Shows how $100 in 2000 loses purchasing power.
// Formula: realValue = 100 × (CPI_2000 / CPI_year)
// ─────────────────────────────────────────────

function drawInflationChart() {
  const container = document.getElementById("inflation-chart");
  const W = container.clientWidth || 780;
  const H = 280;
  const margin = { top: 24, right: 24, bottom: 40, left: 52 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const inflationLine = CPI_DATA.map(d => ({
    year: d.year,
    value: +(100 * (CPI_BASE / d.cpi)).toFixed(2),
  }));

  d3.select("#inflation-chart").selectAll("*").remove();

  const svg = d3.select("#inflation-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${W} ${H}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([2000, 2025]).range([0, w]);
  const y = d3.scaleLinear().domain([45, 105]).range([h, 0]);

  // Shaded area under line
  const areaGen = d3.area()
    .x(d => x(d.year))
    .y0(h)
    .y1(d => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(inflationLine)
    .attr("fill", "#fff3cd")
    .attr("opacity", 0.6)
    .attr("d", areaGen);

  // $100 baseline
  g.append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ccc")
    .attr("stroke-dasharray", "5,4")
    .attr("stroke-width", 1);

  g.append("text")
    .attr("x", 4)
    .attr("y", y(100) - 6)
    .attr("fill", "#aaa")
    .attr("font-size", "11px")
    .text("$100 in 2000");

  // Episode annotation lines
  EPISODE_ANNOTATIONS.forEach(ep => {
    g.append("line")
      .attr("x1", x(ep.year)).attr("x2", x(ep.year))
      .attr("y1", 0).attr("y2", h)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);

    g.append("text")
      .attr("x", x(ep.year) + 4)
      .attr("y", h - 6)
      .attr("fill", "#bbb")
      .attr("font-size", "10px")
      .text(ep.label);
  });

  // Main line
  const lineGen = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(inflationLine)
    .attr("fill", "none")
    .attr("stroke", "#e6a817")
    .attr("stroke-width", 2.5)
    .attr("d", lineGen);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
    .call(g => g.select(".domain").remove());

  g.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`))
    .call(g => g.select(".domain").remove());

  // Y axis label
  g.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .text("Purchasing power of original $100");

  // ── Interactive hover ──
  const tooltip = d3.select("body").selectAll(".tooltip").data([null])
    .join("div").attr("class", "tooltip");

  const hoverDot = g.append("circle")
    .attr("r", 5)
    .attr("fill", "#e6a817")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .style("opacity", 0);

  const bisect = d3.bisector(d => d.year).left;

  g.append("rect")
    .attr("width", w).attr("height", h)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const yr = Math.round(x.invert(mx));
      const i = bisect(inflationLine, yr);
      const d = inflationLine[Math.min(i, inflationLine.length - 1)];

      hoverDot
        .attr("cx", x(d.year))
        .attr("cy", y(d.value))
        .style("opacity", 1);

      tooltip
        .style("opacity", 1)
        .style("left", (event.pageX + 14) + "px")
        .style("top", (event.pageY - 36) + "px")
        .html(`
          <strong>${d.year}</strong><br/>
          Your $100 from 2000<br/>is worth <strong>$${d.value}</strong> today
        `);
    })
    .on("mouseleave", () => {
      hoverDot.style("opacity", 0);
      tooltip.style("opacity", 0);
    });
}

// ─────────────────────────────────────────────
// MAIN $100 INVESTMENT CHART
// ─────────────────────────────────────────────

function drawMainChart() {
  d3.select("#main-chart").selectAll("*").remove();

  const filtered = crisisData.filter(d =>
    d.episode === state.episode &&
    d.asset_name === state.asset
  );

  // Update slide 2 title and description
  const meta = episodeMeta.find(d => d.episode === state.episode);
  document.getElementById("slide-2-title").textContent =
    `$100 in ${state.asset} during the ${state.episode}`;
  document.getElementById("slide-2-desc").textContent =
    meta ? meta.story : "";

  if (filtered.length === 0) {
    d3.select("#main-chart")
      .append("p")
      .style("color", "#888")
      .style("padding", "40px 0")
      .text(`${state.asset} data isn't available for the ${state.episode} period.`);
    return;
  }

  const container = document.getElementById("main-chart");
  const W = container.clientWidth || 780;
  const H = 360;
  const margin = { top: 24, right: 80, bottom: 48, left: 56 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const svg = d3.select("#main-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${W} ${H}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .domain(d3.extent(filtered, d => d.date))
    .range([0, w]);

  const allValues = filtered.map(d => d.indexed_100);
  const yMin = Math.min(d3.min(allValues) * 0.95, 85);
  const yMax = Math.max(d3.max(allValues) * 1.05, 110);

  const y = d3.scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([h, 0]);

  // $100 baseline
  g.append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "5,4")
    .attr("stroke-width", 1.5);

  g.append("text")
    .attr("x", w + 4)
    .attr("y", y(100) + 4)
    .attr("fill", "#bbb")
    .attr("font-size", "11px")
    .text("$100");

  const group = filtered[0].group;
  const lineColor = group === "New money" ? "#4a90d9"
                  : group === "Old money"  ? "#e6a817"
                  : "#888";

  const lineGen = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.indexed_100))
    .curve(d3.curveMonotoneX);

  // Animated line draw
  const path = g.append("path")
    .datum(filtered)
    .attr("fill", "none")
    .attr("stroke", lineColor)
    .attr("stroke-width", 2.5)
    .attr("d", lineGen);

  const totalLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(1200)
    .ease(d3.easeQuadInOut)
    .attr("stroke-dashoffset", 0);

  // Final value label
  const lastPoint = filtered[filtered.length - 1];
  const finalVal = lastPoint.indexed_100.toFixed(0);
  const isPositive = lastPoint.indexed_100 >= 100;

  g.append("text")
    .attr("x", x(lastPoint.date) + 8)
    .attr("y", y(lastPoint.indexed_100) + 4)
    .attr("fill", isPositive ? "#2a9d5c" : "#d9534f")
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .text(`$${finalVal}`);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(6))
    .call(g => g.select(".domain").attr("stroke", "#eee"));

  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}`))
    .call(g => g.select(".domain").attr("stroke", "#eee"));

  g.append("text")
    .attr("class", "axis-label")
    .attr("x", w / 2)
    .attr("y", h + 38)
    .attr("text-anchor", "middle")
    .text("Date");

  g.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2)
    .attr("y", -44)
    .attr("text-anchor", "middle")
    .text("Value of $100 invested");

  // Hover tooltip
  const tooltip = d3.select("body").selectAll(".tooltip").data([null])
    .join("div").attr("class", "tooltip");

  const hoverDot = g.append("circle")
    .attr("r", 5)
    .attr("fill", lineColor)
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .style("opacity", 0);

  const bisectDate = d3.bisector(d => d.date).left;

  g.append("rect")
    .attr("width", w).attr("height", h)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const i = bisectDate(filtered, date, 1);
      const d = filtered[Math.min(i, filtered.length - 1)];

      hoverDot
        .attr("cx", x(d.date))
        .attr("cy", y(d.indexed_100))
        .style("opacity", 1);

      tooltip
        .style("opacity", 1)
        .style("left", (event.pageX + 14) + "px")
        .style("top", (event.pageY - 36) + "px")
        .html(`
          <strong>${d.asset_name}</strong><br/>
          ${d.date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}<br/>
          $100 → <strong>$${(+d.indexed_100).toFixed(2)}</strong>
        `);
    })
    .on("mouseleave", () => {
      hoverDot.style("opacity", 0);
      tooltip.style("opacity", 0);
    });
}