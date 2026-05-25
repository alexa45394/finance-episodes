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

const CPI_BASE = 172.2;

const EPISODE_ANNOTATIONS = [
  { year: 2000, label: "Dot-Com" },
  { year: 2008, label: "2008 Crisis" },
  { year: 2020, label: "COVID" },
  { year: 2022, label: "Inflation" },
  { year: 2023, label: "AI Rally" },
];

const EPISODE_YEARS = {
  "Dot-Com Crash":           { start: 2000, end: 2002 },
  "Global Financial Crisis": { start: 2007, end: 2009 },
  "COVID Crash":             { start: 2020, end: 2020 },
  "2022 Inflation Shock":    { start: 2022, end: 2022 },
  "Regional Banking Crisis": { start: 2023, end: 2023 },
  "AI Rally":                { start: 2023, end: 2024 },
};

// ─────────────────────────────────────────────
// ASSET INFO — plain English descriptions
// and which group each asset belongs to
// ─────────────────────────────────────────────

const ASSET_INFO = {
  "Gold": {
    group: "Old money",
    description: "Gold is one of the oldest stores of value in human history. Investors flock to it during times of fear and uncertainty because it holds its value when paper money doesn't. It doesn't pay dividends or interest — it just sits there, and people trust it.",
  },
  "Financials": {
    group: "Old money",
    description: "This tracks large financial companies like JPMorgan Chase, Bank of America, and Goldman Sachs. When the economy is doing well, banks make money. When credit dries up or loans go bad, they're often the first to fall.",
  },
  "Regional Banks": {
    group: "Old money",
    description: "Smaller, community-focused banks that serve local businesses and consumers. They're more exposed to local economic conditions and specific risks — like commercial real estate — than the big national banks.",
  },
  "Energy": {
    group: "Old money",
    description: "Oil and gas companies like ExxonMobil and Chevron. Energy prices are tied to global supply and demand, making this sector highly sensitive to geopolitical events, recessions, and shifts in consumer behavior.",
  },
  "Utilities": {
    group: "Old money",
    description: "Electric, water, and gas companies that people rely on no matter what the economy is doing. Because demand is steady, utilities are considered boring but stable — except when rising interest rates make their debt expensive.",
  },
  "Long Bonds": {
    group: "Old money",
    description: "U.S. government bonds that mature in 20 or more years. Traditionally the safest asset class — backed by the full faith of the U.S. government. But they're extremely sensitive to interest rates: when rates rise, bond prices fall hard.",
  },
  "Nasdaq 100": {
    group: "New money",
    description: "The 100 largest non-financial companies listed on the Nasdaq exchange, heavily weighted toward tech giants like Apple, Microsoft, and Alphabet. It moves fast in both directions — huge gains in booms, sharp drops in downturns.",
  },
  "Technology": {
    group: "New money",
    description: "A broad basket of technology companies including hardware, software, and services. This sector has driven much of the stock market's growth over the past two decades but is vulnerable to rising interest rates and slowing growth expectations.",
  },
  "Semiconductors": {
    group: "New money",
    description: "Companies that design and manufacture computer chips — the physical foundation of the modern digital economy. Demand exploded with AI. Nvidia alone became one of the most valuable companies in the world during the AI rally.",
  },
  "Innovation Stocks": {
    group: "New money",
    description: "High-risk bets on early-stage companies trying to disrupt industries — think electric vehicles, gene editing, and fintech. These stocks soared during COVID when money was cheap, then crashed hard when interest rates rose in 2022.",
  },
  "Bitcoin": {
    group: "New money",
    description: "The world's largest cryptocurrency. Bitcoin is decentralized — no government controls it. It's become a speculative asset that moves dramatically in both directions. Some see it as digital gold; others see it as a pure gamble.",
  },
};

// Per-episode takeaways for each asset
// These tell the specific story of that asset in that episode
const EPISODE_TAKEAWAYS = {
  "Dot-Com Crash": {
    "Gold":             "Gold was a quiet winner during the dot-com crash — while tech imploded, investors rotated into safe havens and gold gained over 10%.",
    "Financials":       "Financials took a moderate hit but held up better than tech, since the crash was driven by internet speculation rather than broad credit problems.",
    "Regional Banks":   "Regional banks were relatively insulated from the dot-com bust since their exposure to tech startups was limited.",
    "Energy":           "Energy held relatively steady — the dot-com crash was a tech story, and oil demand kept chugging along.",
    "Utilities":        "Utilities were one of the better places to hide during the dot-com crash, offering steady returns when growth stocks were collapsing.",
    "Long Bonds":       "Long bonds rallied strongly as investors fled stocks and the Fed cut rates — exactly what bonds are supposed to do in a crisis.",
    "Nasdaq 100":       "The Nasdaq 100 was ground zero for the dot-com crash, losing nearly 80% of its value as internet bubble valuations collapsed.",
    "Technology":       "Technology stocks were devastated — many companies that had never turned a profit simply ceased to exist.",
    "Semiconductors":   "Semiconductors crashed hard as demand for tech hardware evaporated along with the companies buying it.",
    "Innovation Stocks":"Innovation-style stocks didn't exist as a formal category yet, but the speculative tech companies of the era were wiped out.",
    "Bitcoin":          "Bitcoin didn't exist during the dot-com crash — it was created in 2009.",
  },
  "Global Financial Crisis": {
    "Gold":             "Gold surged during the financial crisis as trust in banks collapsed — one of its best-known safe-haven performances.",
    "Financials":       "Financials were the epicenter of the 2008 crisis. Banks had loaded up on toxic mortgage debt and the whole sector nearly collapsed.",
    "Regional Banks":   "Regional banks were hit hard — many failed outright. The FDIC had to take over hundreds of smaller institutions.",
    "Energy":           "Energy crashed as the global recession crushed demand for oil, with crude prices falling from $145 to under $35 per barrel.",
    "Utilities":        "Utilities fell less than most but still dropped significantly as the credit crunch made their heavy debt loads more expensive.",
    "Long Bonds":       "Long bonds were a strong safe haven in 2008 — the Fed slashed rates to zero and investors piled into U.S. Treasuries.",
    "Nasdaq 100":       "The Nasdaq dropped over 50% during the financial crisis as the broad economic collapse hit even tech companies.",
    "Technology":       "Technology fell sharply as corporate spending froze and consumer demand collapsed.",
    "Semiconductors":   "Semiconductors were crushed as global demand for electronics dropped with the economy.",
    "Innovation Stocks":"Highly speculative investments were abandoned as investors sought safety — anything risky got sold.",
    "Bitcoin":          "Bitcoin was created in January 2009, right at the tail end of the crisis. It had essentially no market value at the time.",
  },
  "COVID Crash": {
    "Gold":             "Gold held up well during COVID and finished the period higher, as it often does when fear spikes.",
    "Financials":       "Financials dropped sharply as loan defaults were feared — banks faced enormous uncertainty about who would be able to repay.",
    "Regional Banks":   "Regional banks were hit hard by fears of small business failures and loan losses in their local communities.",
    "Energy":           "Energy was devastated — oil briefly traded at negative prices as demand collapsed and storage ran out.",
    "Utilities":        "Utilities fell moderately but recovered — people still needed electricity and water even during lockdowns.",
    "Long Bonds":       "Long bonds rallied initially as the Fed cut rates to zero and investors panicked, but then stabilized.",
    "Nasdaq 100":       "The Nasdaq crashed hard in March 2020 but then roared back — tech companies actually benefited from a remote-everything world.",
    "Technology":       "Technology rebounded faster than almost any other sector as Zoom, cloud computing, and e-commerce demand exploded.",
    "Semiconductors":   "Semiconductors had a wild ride — initial crash followed by a massive surge as demand for chips in consumer electronics and servers exploded.",
    "Innovation Stocks":"Innovation stocks were among the biggest winners of COVID — low rates, stimulus checks, and retail investor enthusiasm sent them soaring.",
    "Bitcoin":          "Bitcoin crashed 50% in March 2020 alongside everything else, then recovered completely and surged through the rest of the year.",
  },
  "2022 Inflation Shock": {
    "Gold":             "Gold was supposed to be an inflation hedge but largely disappointed in 2022 — it dropped as rising rates made holding non-yielding assets less attractive.",
    "Financials":       "Financials had a mixed year — higher rates helped bank lending margins, but fears of recession hurt the sector overall.",
    "Regional Banks":   "Regional banks struggled as the economic outlook darkened and concerns about loan quality grew.",
    "Energy":           "Energy was the big winner of 2022 — soaring oil and gas prices following Russia's invasion of Ukraine made this the only major sector with positive returns.",
    "Utilities":        "Utilities fell despite being considered defensive — rising interest rates made their bonds less attractive relative to alternatives.",
    "Long Bonds":       "Long bonds had their worst year in modern history. Rising rates crushed bond prices — the asset most people use for safety lost over 30%.",
    "Nasdaq 100":       "The Nasdaq dropped over 30% in 2022 as rising rates punished high-growth, high-valuation tech companies.",
    "Technology":       "Technology stocks were decimated as the era of cheap money ended and investors demanded real profits over future growth.",
    "Semiconductors":   "Semiconductors fell sharply as the chip demand boom cooled and recession fears grew.",
    "Innovation Stocks":"Innovation stocks collapsed in 2022 — ARKK lost over 60% as the speculative bubble from 2020-2021 fully deflated.",
    "Bitcoin":          "Bitcoin fell over 65% in 2022 as rising rates and the collapse of FTX and other crypto platforms triggered a full crypto winter.",
  },
  "Regional Banking Crisis": {
    "Gold":             "Gold rose during the banking crisis as investors sought safety when Silicon Valley Bank collapsed.",
    "Financials":       "Large financials were rattled but held up — the crisis was contained to smaller regional banks, not the biggest institutions.",
    "Regional Banks":   "Regional banks were the story — SVB, Signature, and First Republic all failed within weeks, and the sector lost a huge chunk of its value.",
    "Energy":           "Energy was largely unaffected by the banking crisis, moving on its own supply-and-demand dynamics.",
    "Utilities":        "Utilities held relatively steady — the banking crisis didn't fundamentally change the business of providing power and water.",
    "Long Bonds":       "Long bonds rallied as the crisis triggered expectations of Fed rate cuts — a reminder that banking fear and bond prices often move together.",
    "Nasdaq 100":       "Big tech barely noticed the regional banking crisis — the Nasdaq continued its 2023 recovery throughout the turmoil.",
    "Technology":       "Technology held up well, continuing its rebound from the 2022 selloff even as banks collapsed.",
    "Semiconductors":   "Semiconductors were unaffected by the banking crisis and continued their AI-driven rally.",
    "Innovation Stocks":"Innovation stocks had a mixed period — they benefited from falling rate expectations but were still recovering from 2022.",
    "Bitcoin":          "Bitcoin surged during the banking crisis as some investors saw it as an alternative to a fragile traditional banking system.",
  },
  "AI Rally": {
    "Gold":             "Gold had modest gains during the AI rally — it wasn't the star of the show, but it held its value as a steady background asset.",
    "Financials":       "Financials recovered from 2023's banking crisis fears and delivered solid returns, though nothing like the tech gains.",
    "Regional Banks":   "Regional banks slowly stabilized after the 2023 crisis but significantly underperformed the broader market.",
    "Energy":           "Energy had a mixed run during the AI rally — oil prices were volatile and the sector lagged the tech-driven surge.",
    "Utilities":        "Utilities actually became an unexpected AI story — data centers require enormous amounts of electricity, boosting power company demand.",
    "Long Bonds":       "Long bonds struggled as interest rates stayed higher for longer than expected, remaining under pressure through most of the rally.",
    "Nasdaq 100":       "The Nasdaq 100 was one of the primary beneficiaries of the AI rally, driven by massive gains in Nvidia, Microsoft, and Apple.",
    "Technology":       "Technology surged as AI became the dominant investment theme — companies with AI exposure were rewarded regardless of near-term profits.",
    "Semiconductors":   "Semiconductors were the single biggest winner of the AI rally. Nvidia's stock rose over 700% as demand for AI chips became insatiable.",
    "Innovation Stocks":"Innovation stocks recovered partially during the AI rally but never returned to their 2021 highs — speculative assets remained out of favor.",
    "Bitcoin":          "Bitcoin had an extraordinary run during the AI rally, surging over 300% as the approval of spot Bitcoin ETFs brought institutional money in.",
  },
};

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

let state = {
  episode: "Dot-Com Crash",
  asset: "Gold",
  currentSlide: 1,
};

let crisisData = [];
let episodeMeta = [];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function realValueAt(fromYear, toYear) {
  const from = CPI_DATA.find(d => d.year === fromYear);
  const to   = CPI_DATA.find(d => d.year === toYear);
  if (!from || !to) return null;
  return (100 * (from.cpi / to.cpi)).toFixed(2);
}

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
  updateInflationBlurb();
});

// ─────────────────────────────────────────────
// POPULATE ASSET DROPDOWN
// S&P 500 excluded — used as baseline in charts
// ─────────────────────────────────────────────

function populateAssetDropdown() {
  const excluded = new Set(["S&P 500"]);

  const assets = [...new Set(crisisData.map(d => d.asset_name))]
    .filter(a => !excluded.has(a))
    .sort();

  const dropdown = d3.select("#asset-dropdown");

  dropdown.selectAll("option")
    .data(assets)
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  dropdown.property("value", "Gold");
  state.asset = "Gold";

  dropdown.on("change", function () {
    state.asset = this.value;
  });
}

// ─────────────────────────────────────────────
// EPISODE DROPDOWN
// ─────────────────────────────────────────────

document.getElementById("episode-dropdown").addEventListener("change", function () {
  state.episode = this.value;
  updateInflationBlurb();
  drawInflationChart();
});

// ─────────────────────────────────────────────
// DYNAMIC BLURB
// ─────────────────────────────────────────────

function updateInflationBlurb() {
  const ep = state.episode;
  const years = EPISODE_YEARS[ep];
  if (!years) return;

  const startVal = "100.00";
  const endVal   = realValueAt(years.start, years.end);

  document.getElementById("blurb-episode").textContent     = ep;
  document.getElementById("blurb-year").textContent        = years.start;
  document.getElementById("blurb-end-year").textContent    = years.end;
  document.getElementById("blurb-start-value").textContent = `$${startVal}`;
  document.getElementById("blurb-end-value").textContent   = `$${endVal}`;

  const endPill = document.getElementById("blurb-end-value");
  const drop = 100 - parseFloat(endVal);
  endPill.className = "highlight-pill " + (drop > 3 ? "highlight-red" : "highlight-gold");
}

// ─────────────────────────────────────────────
// INFLATION CHART HIGHLIGHT BAND
// ─────────────────────────────────────────────

function updateInflationChartHighlight() {
  const ep = state.episode;
  const years = EPISODE_YEARS[ep];
  if (!years) return;

  const svg = d3.select("#inflation-chart svg");
  if (svg.empty()) return;

  svg.selectAll(".episode-highlight").remove();

  const margin = { top: 24, right: 24, bottom: 40, left: 52 };
  const viewBox = svg.attr("viewBox").split(" ");
  const W = +viewBox[2];
  const H = 280;
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const startYear = years.start;
  const x = d3.scaleLinear().domain([startYear, 2025]).range([0, w]);
  const g = svg.select("g");

  const x1 = x(years.start);
  const x2 = x(Math.min(years.end + 0.9, 2025));

  g.insert("rect", ":first-child")
    .attr("class", "episode-highlight")
    .attr("x", x1)
    .attr("y", 0)
    .attr("width", x2 - x1)
    .attr("height", h)
    .attr("fill", "#4a90d9")
    .attr("opacity", 0.1)
    .attr("rx", 3);

  g.append("text")
    .attr("class", "episode-highlight")
    .attr("x", x1 + (x2 - x1) / 2)
    .attr("y", 13)
    .attr("text-anchor", "middle")
    .attr("fill", "#4a90d9")
    .attr("font-size", "10px")
    .attr("font-weight", "700")
    .text(ep);
}

// ─────────────────────────────────────────────
// BEGIN BUTTON
// ─────────────────────────────────────────────

document.getElementById("begin-btn").addEventListener("click", () => {
  const meta = episodeMeta.find(d => d.episode === state.episode);
  if (meta) {
    const banner = document.getElementById("episode-banner");
    banner.textContent = `${state.episode}: ${meta.story}`;
    banner.classList.add("visible");
  }

  document.getElementById("slideshow").classList.add("visible");
  goToSlide(1);
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
  n = Math.max(1, Math.min(4, n));
  state.currentSlide = n;

  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
  document.getElementById(`slide-${n}`).classList.add("active");

  if (n === 2) drawMainChart();
  if (n === 3) drawAssetInfoPanel();

  document.getElementById("slideshow").scrollIntoView({ behavior: "smooth" });
}

// ─────────────────────────────────────────────
// INFLATION CHART
// ─────────────────────────────────────────────

function drawInflationChart() {
  const container = document.getElementById("inflation-chart");
  const W = container.clientWidth || 780;
  const H = 280;
  const margin = { top: 24, right: 24, bottom: 40, left: 52 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const years = EPISODE_YEARS[state.episode];
  const startYear = years ? years.start : 2000;
  const startCPI = CPI_DATA.find(d => d.year === startYear).cpi;

  const inflationLine = CPI_DATA
    .filter(d => d.year >= startYear)
    .map(d => ({
      year: d.year,
      value: +(100 * (startCPI / d.cpi)).toFixed(2),
    }));

  d3.select("#inflation-chart").selectAll("*").remove();

  const svg = d3.select("#inflation-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${W} ${H}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([startYear, 2025]).range([0, w]);
  const y = d3.scaleLinear().domain([45, 105]).range([h, 0]);

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
    .text(`$100 in ${startYear}`);

  EPISODE_ANNOTATIONS
    .filter(ep => ep.year >= startYear)
    .forEach(ep => {
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

  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
    .call(g => g.select(".domain").remove());

  g.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`))
    .call(g => g.select(".domain").remove());

  g.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .text("Purchasing power of original $100");

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
      hoverDot.attr("cx", x(d.year)).attr("cy", y(d.value)).style("opacity", 1);
      tooltip
        .style("opacity", 1)
        .style("left", (event.pageX + 14) + "px")
        .style("top", (event.pageY - 36) + "px")
        .html(`<strong>${d.year}</strong><br/>Your $100 from ${startYear}<br/>is worth <strong>$${d.value}</strong> today`);
    })
    .on("mouseleave", () => {
      hoverDot.style("opacity", 0);
      tooltip.style("opacity", 0);
    });

  updateInflationChartHighlight();
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

  const y = d3.scaleLinear().domain([yMin, yMax]).nice().range([h, 0]);

  g.append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "5,4")
    .attr("stroke-width", 1.5);

  g.append("text")
    .attr("x", w + 4).attr("y", y(100) + 4)
    .attr("fill", "#bbb").attr("font-size", "11px")
    .text("$100");

  const info = ASSET_INFO[state.asset];
  const group = info ? info.group : filtered[0].group;
  const lineColor = group === "New money" ? "#4a90d9"
                  : group === "Old money"  ? "#e6a817"
                  : "#888";

  const lineGen = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.indexed_100))
    .curve(d3.curveMonotoneX);

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
    .transition().duration(1200).ease(d3.easeQuadInOut)
    .attr("stroke-dashoffset", 0);

  const lastPoint = filtered[filtered.length - 1];
  const finalVal = lastPoint.indexed_100.toFixed(0);
  const isPositive = lastPoint.indexed_100 >= 100;

  g.append("text")
    .attr("x", x(lastPoint.date) + 8)
    .attr("y", y(lastPoint.indexed_100) + 4)
    .attr("fill", isPositive ? "#2a9d5c" : "#d9534f")
    .attr("font-size", "14px").attr("font-weight", "700")
    .text(`$${finalVal}`);

  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(6))
    .call(g => g.select(".domain").attr("stroke", "#eee"));

  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}`))
    .call(g => g.select(".domain").attr("stroke", "#eee"));

  g.append("text").attr("class", "axis-label")
    .attr("x", w / 2).attr("y", h + 38).attr("text-anchor", "middle").text("Date");

  g.append("text").attr("class", "axis-label")
    .attr("transform", "rotate(-90)").attr("x", -h / 2).attr("y", -44)
    .attr("text-anchor", "middle").text("Value of $100 invested");

  const tooltip = d3.select("body").selectAll(".tooltip").data([null])
    .join("div").attr("class", "tooltip");

  const hoverDot = g.append("circle")
    .attr("r", 5).attr("fill", lineColor)
    .attr("stroke", "white").attr("stroke-width", 2).style("opacity", 0);

  const bisectDate = d3.bisector(d => d.date).left;

  g.append("rect")
    .attr("width", w).attr("height", h)
    .attr("fill", "none").attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const i = bisectDate(filtered, date, 1);
      const d = filtered[Math.min(i, filtered.length - 1)];
      hoverDot.attr("cx", x(d.date)).attr("cy", y(d.indexed_100)).style("opacity", 1);
      tooltip
        .style("opacity", 1)
        .style("left", (event.pageX + 14) + "px")
        .style("top", (event.pageY - 36) + "px")
        .html(`<strong>${d.asset_name}</strong><br/>${d.date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}<br/>$100 → <strong>$${(+d.indexed_100).toFixed(2)}</strong>`);
    })
    .on("mouseleave", () => {
      hoverDot.style("opacity", 0);
      tooltip.style("opacity", 0);
    });
}

// ─────────────────────────────────────────────
// ASSET INFO PANEL — Slide 3
// Dynamically builds educational content based
// on the selected asset and episode
// ─────────────────────────────────────────────

function drawAssetInfoPanel() {
  const panel = document.getElementById("asset-info-panel");
  panel.innerHTML = "";

  const asset = state.asset;
  const episode = state.episode;
  const info = ASSET_INFO[asset];
  const takeaway = EPISODE_TAKEAWAYS[episode]?.[asset];

  if (!info) return;

  const isNewMoney = info.group === "New money";
  const tagClass   = isNewMoney ? "tag-new-money" : "tag-old-money";
  const groupLabel = isNewMoney ? "New Money" : "Old Money";
  const groupExplainer = isNewMoney
    ? "New money assets are modern, high-growth investments — things like tech stocks, semiconductors, and crypto. They tend to boom when optimism and cheap credit are abundant, and crash hard when conditions tighten."
    : "Old money assets are traditional, time-tested investments — things like gold, banks, bonds, and utilities. They're often considered safer, but as you'll see, that depends entirely on what kind of crisis you're in.";

  panel.innerHTML = `
    <div class="info-card">
      <div class="asset-name-large">${asset}</div>
      <span class="info-tag ${tagClass}">${groupLabel}</span>
      <p>${info.description}</p>
      <p class="takeaway">💡 ${groupExplainer}</p>
    </div>

    <div class="info-card">
      <h3>The ${episode}</h3>
      <p>${episodeMeta.find(d => d.episode === episode)?.story ?? ""}</p>
      ${takeaway ? `<p class="takeaway">📌 ${takeaway}</p>` : ""}
    </div>
  `;
}