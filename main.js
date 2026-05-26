const CPI_DATA = [
  { year: 2000, cpi: 172.2 }, { year: 2001, cpi: 177.1 },
  { year: 2002, cpi: 179.9 }, { year: 2003, cpi: 184.0 },
  { year: 2004, cpi: 188.9 }, { year: 2005, cpi: 195.3 },
  { year: 2006, cpi: 201.6 }, { year: 2007, cpi: 207.3 },
  { year: 2008, cpi: 215.3 }, { year: 2009, cpi: 214.5 },
  { year: 2010, cpi: 218.1 }, { year: 2011, cpi: 224.9 },
  { year: 2012, cpi: 229.6 }, { year: 2013, cpi: 233.0 },
  { year: 2014, cpi: 236.7 }, { year: 2015, cpi: 237.0 },
  { year: 2016, cpi: 240.0 }, { year: 2017, cpi: 245.1 },
  { year: 2018, cpi: 251.1 }, { year: 2019, cpi: 255.7 },
  { year: 2020, cpi: 258.8 }, { year: 2021, cpi: 271.0 },
  { year: 2022, cpi: 292.7 }, { year: 2023, cpi: 304.7 },
  { year: 2024, cpi: 313.7 }, { year: 2025, cpi: 321.9 },
];

const EPISODE_ANNOTATIONS = [
  { year: 2000, label: "Dot-Com" },
  { year: 2008, label: "2008 Crisis" },
  { year: 2020, label: "COVID" },
  { year: 2022, label: "Inflation" },
  { year: 2023, label: "AI Rally" },
];

// blurbEnd: use a future year for single-year episodes so inflation is visible
const EPISODE_YEARS = {
  "Dot-Com Crash":           { start: 2000, end: 2002, blurbEnd: 2005 },
  "Global Financial Crisis": { start: 2007, end: 2009, blurbEnd: 2012 },
  "COVID Crash":             { start: 2020, end: 2020, blurbEnd: 2025 },
  "2022 Inflation Shock":    { start: 2022, end: 2022, blurbEnd: 2025 },
  "Regional Banking Crisis": { start: 2023, end: 2023, blurbEnd: 2025 },
  "AI Rally":                { start: 2023, end: 2024, blurbEnd: 2025 },
};

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
    "Semiconductors":   "Semiconductors had a wild ride — initial crash followed by a massive surge as demand for chips exploded.",
    "Innovation Stocks":"Innovation stocks were among the biggest winners of COVID — low rates and stimulus checks sent them soaring.",
    "Bitcoin":          "Bitcoin crashed 50% in March 2020 alongside everything else, then recovered completely and surged through the rest of the year.",
  },
  "2022 Inflation Shock": {
    "Gold":             "Gold was supposed to be an inflation hedge but largely disappointed in 2022 — it dropped as rising rates made holding non-yielding assets less attractive.",
    "Financials":       "Financials had a mixed year — higher rates helped bank lending margins, but fears of recession hurt the sector overall.",
    "Regional Banks":   "Regional banks struggled as the economic outlook darkened and concerns about loan quality grew.",
    "Energy":           "Energy was the big winner of 2022 — soaring oil and gas prices following Russia's invasion of Ukraine drove massive returns.",
    "Utilities":        "Utilities fell despite being considered defensive — rising interest rates made their bonds less attractive relative to alternatives.",
    "Long Bonds":       "Long bonds had their worst year in modern history. Rising rates crushed bond prices — the asset most people use for safety lost over 30%.",
    "Nasdaq 100":       "The Nasdaq dropped over 30% in 2022 as rising rates punished high-growth, high-valuation tech companies.",
    "Technology":       "Technology stocks were decimated as the era of cheap money ended and investors demanded real profits over future growth.",
    "Semiconductors":   "Semiconductors fell sharply as the chip demand boom cooled and recession fears grew.",
    "Innovation Stocks":"Innovation stocks collapsed in 2022 — ARKK lost over 60% as the speculative bubble from 2020-2021 fully deflated.",
    "Bitcoin":          "Bitcoin fell over 65% in 2022 as rising rates and the collapse of FTX triggered a full crypto winter.",
  },
  "Regional Banking Crisis": {
    "Gold":             "Gold rose during the banking crisis as investors sought safety when Silicon Valley Bank collapsed.",
    "Financials":       "Large financials were rattled but held up — the crisis was contained to smaller regional banks.",
    "Regional Banks":   "Regional banks were the story — SVB, Signature, and First Republic all failed within weeks.",
    "Energy":           "Energy was largely unaffected by the banking crisis, moving on its own supply-and-demand dynamics.",
    "Utilities":        "Utilities held relatively steady — the banking crisis didn't change the business of providing power and water.",
    "Long Bonds":       "Long bonds rallied as the crisis triggered expectations of Fed rate cuts.",
    "Nasdaq 100":       "Big tech barely noticed the regional banking crisis — the Nasdaq continued its 2023 recovery.",
    "Technology":       "Technology held up well, continuing its rebound from the 2022 selloff.",
    "Semiconductors":   "Semiconductors were unaffected by the banking crisis and continued their AI-driven rally.",
    "Innovation Stocks":"Innovation stocks had a mixed period — they benefited from falling rate expectations but were still recovering from 2022.",
    "Bitcoin":          "Bitcoin surged during the banking crisis as some investors saw it as an alternative to a fragile banking system.",
  },
  "AI Rally": {
    "Gold":             "Gold had modest gains during the AI rally — steady background asset, not the star of the show.",
    "Financials":       "Financials recovered from 2023's banking crisis fears and delivered solid returns.",
    "Regional Banks":   "Regional banks slowly stabilized after the 2023 crisis but significantly underperformed the broader market.",
    "Energy":           "Energy had a mixed run during the AI rally — oil prices were volatile and the sector lagged.",
    "Utilities":        "Utilities became an unexpected AI story — data centers require enormous electricity, boosting power company demand.",
    "Long Bonds":       "Long bonds struggled as interest rates stayed higher for longer than expected.",
    "Nasdaq 100":       "The Nasdaq 100 was one of the primary beneficiaries of the AI rally, driven by Nvidia, Microsoft, and Apple.",
    "Technology":       "Technology surged as AI became the dominant investment theme.",
    "Semiconductors":   "Semiconductors were the single biggest winner. Nvidia's stock rose over 700% as AI chip demand became insatiable.",
    "Innovation Stocks":"Innovation stocks recovered partially but never returned to their 2021 highs.",
    "Bitcoin":          "Bitcoin surged over 300% as the approval of spot Bitcoin ETFs brought institutional money in.",
  },
};

// ── STATE ──────────────────────────────────────
let state = { episode: "Dot-Com Crash", asset: "Gold", currentSlide: 1, selectedQuiz: null };
let crisisData = [], summaryData = [], episodeMeta = [];

// ── HELPERS ────────────────────────────────────
function realValueAt(fromYear, toYear) {
  const from = CPI_DATA.find(d => d.year === fromYear);
  const to   = CPI_DATA.find(d => d.year === toYear);
  if (!from || !to) return null;
  return (100 * (from.cpi / to.cpi)).toFixed(2);
}
function fmtPct(v)   { return (v >= 0 ? "+" : "") + v.toFixed(1) + "%"; }
function fmtMoney(v) { return "$" + v.toFixed(2); }

function rankInEpisode(episode, assetName) {
  const rows = summaryData.filter(d => d.episode === episode)
    .sort((a, b) => b.total_return_pct - a.total_return_pct);
  const idx = rows.findIndex(d => d.asset_name === assetName);
  return idx === -1 ? null : idx + 1;
}

function consistencyRanking() {
  const byAsset = d3.group(summaryData, d => d.asset_name);
  return Array.from(byAsset, ([assetName, vals]) => {
    const positive = vals.filter(v => v.total_return_pct > 0).length;
    const ranks    = vals.map(v => rankInEpisode(v.episode, assetName)).filter(r => r !== null);
    return {
      assetName, group: vals[0].group,
      count: vals.length, positive,
      positiveShare: positive / vals.length,
      avgReturn: d3.mean(vals, d => d.total_return_pct),
      avgRank: d3.mean(ranks),
    };
  }).sort((a, b) =>
    d3.ascending(a.avgRank, b.avgRank) || d3.descending(a.positiveShare, b.positiveShare)
  );
}

// ── LOAD DATA ──────────────────────────────────
Promise.all([
  d3.csv("data/market_crisis_data.csv"),
  d3.csv("data/crisis_asset_summary.csv"),
  d3.json("data/crisis_periods.json"),
]).then(([csvData, csvSummary, jsonMeta]) => {
  crisisData = csvData.map(d => ({
    ...d, date: new Date(d.date),
    indexed_100: +d.indexed_100, episode_day: +d.episode_day, drawdown: +d.drawdown,
  }));
  summaryData = csvSummary.map(d => ({
    ...d, total_return_pct: +d.total_return_pct,
    end_value: +d.end_value, max_drawdown: +d.max_drawdown, volatility_pct: +d.volatility_pct,
  }));
  episodeMeta = jsonMeta;
  populateAssetDropdown();
  drawInflationChart();
  updateInflationBlurb();
  drawGlossaryCards();
  buildQuizOptions();
});

// ── DROPDOWNS ──────────────────────────────────
function populateAssetDropdown() {
  const excluded = new Set(["S&P 500"]);
  const assets = [...new Set(crisisData.map(d => d.asset_name))]
    .filter(a => !excluded.has(a)).sort();
  const dropdown = d3.select("#asset-dropdown");
  dropdown.selectAll("option").data(assets).join("option").attr("value", d => d).text(d => d);
  dropdown.property("value", "Gold");
  state.asset = "Gold";
  dropdown.on("change", function () { state.asset = this.value; });
}

document.getElementById("episode-dropdown").addEventListener("change", function () {
  state.episode = this.value;
  updateInflationBlurb();
  drawInflationChart();
});

// ── INFLATION BLURB ────────────────────────────
function updateInflationBlurb() {
  const ep = state.episode, years = EPISODE_YEARS[ep];
  if (!years) return;
  const endVal = realValueAt(years.start, years.blurbEnd);
  document.getElementById("blurb-episode").textContent     = ep;
  document.getElementById("blurb-year").textContent        = years.start;
  document.getElementById("blurb-end-year").textContent    = years.blurbEnd;
  document.getElementById("blurb-start-value").textContent = "$100.00";
  document.getElementById("blurb-end-value").textContent   = `$${endVal}`;
  const drop = 100 - parseFloat(endVal);
  document.getElementById("blurb-end-value").className =
    "highlight-pill " + (drop > 3 ? "highlight-red" : "highlight-gold");
}

// ── INFLATION CHART HIGHLIGHT ──────────────────
function updateInflationChartHighlight() {
  const ep = state.episode, years = EPISODE_YEARS[ep];
  if (!years) return;
  const svg = d3.select("#inflation-chart svg");
  if (svg.empty()) return;
  svg.selectAll(".episode-highlight").remove();
  const margin = { top: 24, right: 24, bottom: 40, left: 52 };
  const W = +svg.attr("viewBox").split(" ")[2];
  const w = W - margin.left - margin.right;
  const h = 280 - margin.top - margin.bottom;
  const x = d3.scaleLinear().domain([years.start, 2025]).range([0, w]);
  const g = svg.select("g");
  const x1 = x(years.start), x2 = x(Math.min(years.end + 0.9, 2025));
  g.insert("rect", ":first-child").attr("class", "episode-highlight")
    .attr("x", x1).attr("y", 0).attr("width", x2 - x1).attr("height", h)
    .attr("fill", "#4a90d9").attr("opacity", 0.08).attr("rx", 3);
  g.append("text").attr("class", "episode-highlight")
    .attr("x", x1 + (x2 - x1) / 2).attr("y", 13)
    .attr("text-anchor", "middle").attr("fill", "#4a90d9")
    .attr("font-size", "10px").attr("font-weight", "700").text(ep);
}

// ── INFLATION CHART ────────────────────────────
function drawInflationChart() {
  const container = document.getElementById("inflation-chart");
  const W = container.clientWidth || 780, H = 280;
  const margin = { top: 24, right: 24, bottom: 40, left: 52 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;
  const years = EPISODE_YEARS[state.episode];
  const startYear = years ? years.start : 2000;
  const startCPI = CPI_DATA.find(d => d.year === startYear).cpi;
  const inflationLine = CPI_DATA.filter(d => d.year >= startYear)
    .map(d => ({ year: d.year, value: +(100 * (startCPI / d.cpi)).toFixed(2) }));

  d3.select("#inflation-chart").selectAll("*").remove();
  const svg = d3.select("#inflation-chart").append("svg")
    .attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const x = d3.scaleLinear().domain([startYear, 2025]).range([0, w]);
  const y = d3.scaleLinear().domain([45, 105]).range([h, 0]);

  g.append("path").datum(inflationLine).attr("fill", "#fff3cd").attr("opacity", 0.5)
    .attr("d", d3.area().x(d => x(d.year)).y0(h).y1(d => y(d.value)).curve(d3.curveMonotoneX));
  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);
  g.append("text").attr("x", 4).attr("y", y(100) - 7).attr("fill", "#bbb").attr("font-size", "11px")
    .text(`$100 in ${startYear}`);

  EPISODE_ANNOTATIONS.filter(ep => ep.year >= startYear).forEach(ep => {
    g.append("line").attr("x1", x(ep.year)).attr("x2", x(ep.year))
      .attr("y1", 0).attr("y2", h).attr("stroke", "#ebebeb").attr("stroke-width", 1);
    g.append("text").attr("x", x(ep.year) + 4).attr("y", h - 6)
      .attr("fill", "#ccc").attr("font-size", "10px").text(ep.label);
  });

  g.append("path").datum(inflationLine).attr("fill", "none")
    .attr("stroke", "#e6a817").attr("stroke-width", 2.5)
    .attr("d", d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX));
  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
    .call(gx => gx.select(".domain").remove());
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`))
    .call(gx => gx.select(".domain").remove());
  g.append("text").attr("class", "axis-label").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -40).attr("text-anchor", "middle")
    .text("Purchasing power of original $100");

  const tooltip = d3.select("body").selectAll(".tooltip").data([null]).join("div").attr("class", "tooltip");
  const hoverDot = g.append("circle").attr("r", 5).attr("fill", "#e6a817")
    .attr("stroke", "white").attr("stroke-width", 2).style("opacity", 0);
  const bisect = d3.bisector(d => d.year).left;
  g.append("rect").attr("width", w).attr("height", h).attr("fill", "none").attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const yr = Math.round(x.invert(mx));
      const d = inflationLine[Math.min(bisect(inflationLine, yr), inflationLine.length - 1)];
      hoverDot.attr("cx", x(d.year)).attr("cy", y(d.value)).style("opacity", 1);
      tooltip.style("opacity", 1)
        .style("left", (event.pageX + 14) + "px").style("top", (event.pageY - 36) + "px")
        .html(`<strong>${d.year}</strong><br/>Your $100 from ${startYear}<br/>is worth <strong>$${d.value}</strong> today`);
    })
    .on("mouseleave", () => { hoverDot.style("opacity", 0); tooltip.style("opacity", 0); });
  updateInflationChartHighlight();
}

// ── BEGIN BUTTON ───────────────────────────────
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

// ── SLIDE NAVIGATION ───────────────────────────
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.direction;
    if (dir === "next") goToSlide(state.currentSlide + 1);
    if (dir === "back") goToSlide(state.currentSlide - 1);
  });
});

function goToSlide(n) {
  n = Math.max(1, Math.min(4, n));
  state.currentSlide = n;
  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
  document.getElementById(`slide-${n}`).classList.add("active");
  if (n === 2) { drawMainChart(); drawBarChart(); }
  if (n === 3) { drawAssetInfoPanel(); drawOldVsNewChart(); }
  if (n === 4) { drawGroupSummary(); }
  document.getElementById("slideshow").scrollIntoView({ behavior: "smooth" });
}

// ── MAIN $100 LINE CHART ───────────────────────
function drawMainChart() {
  d3.select("#main-chart").selectAll("*").remove();
  const filtered = crisisData.filter(d => d.episode === state.episode && d.asset_name === state.asset);
  const meta = episodeMeta.find(d => d.episode === state.episode);
  document.getElementById("slide-2-title").textContent = `$100 in ${state.asset} during the ${state.episode}`;
  document.getElementById("slide-2-desc").textContent = meta ? meta.story : "";

  if (!filtered.length) {
    d3.select("#main-chart").append("p")
      .style("color", "#aaa").style("padding", "60px 0").style("text-align", "center")
      .text(`${state.asset} data isn't available for the ${state.episode} period.`);
    return;
  }

  const container = document.getElementById("main-chart");
  const W = container.clientWidth || 780, H = 340;
  const margin = { top: 24, right: 80, bottom: 44, left: 56 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const svg = d3.select("#main-chart").append("svg")
    .attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime().domain(d3.extent(filtered, d => d.date)).range([0, w]);
  const vals = filtered.map(d => d.indexed_100);
  const y = d3.scaleLinear()
    .domain([Math.min(d3.min(vals) * 0.95, 85), Math.max(d3.max(vals) * 1.05, 115)]).nice()
    .range([h, 0]);

  g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#f4f4f4"); });
  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#e0e0e0").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);
  g.append("text").attr("x", w + 4).attr("y", y(100) + 4)
    .attr("fill", "#ccc").attr("font-size", "11px").text("$100");

  const info = ASSET_INFO[state.asset];
  const group = info ? info.group : (filtered[0].group || "Old money");
  const lineColor = group === "New money" ? "#4a90d9" : group === "Old money" ? "#e6a817" : "#888";

  const lineGen = d3.line().x(d => x(d.date)).y(d => y(d.indexed_100)).curve(d3.curveMonotoneX);
  const path = g.append("path").datum(filtered)
    .attr("fill", "none").attr("stroke", lineColor).attr("stroke-width", 2.5).attr("d", lineGen);
  const len = path.node().getTotalLength();
  path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
    .transition().duration(1200).ease(d3.easeQuadInOut).attr("stroke-dashoffset", 0);

  const last = filtered[filtered.length - 1];
  g.append("text").attr("x", x(last.date) + 8).attr("y", y(last.indexed_100) + 4)
    .attr("fill", last.indexed_100 >= 100 ? "#2a9d5c" : "#d9534f")
    .attr("font-size", "14px").attr("font-weight", "700")
    .text(`$${last.indexed_100.toFixed(0)}`);

  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(6)).call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}`))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("text").attr("class", "axis-label").attr("x", w / 2).attr("y", h + 38)
    .attr("text-anchor", "middle").text("Date");
  g.append("text").attr("class", "axis-label").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -44).attr("text-anchor", "middle").text("Value of $100 invested");

  const tooltip = d3.select("body").selectAll(".tooltip").data([null]).join("div").attr("class", "tooltip");
  const hoverDot = g.append("circle").attr("r", 5).attr("fill", lineColor)
    .attr("stroke", "white").attr("stroke-width", 2).style("opacity", 0);
  const bisectDate = d3.bisector(d => d.date).left;
  g.append("rect").attr("width", w).attr("height", h).attr("fill", "none").attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const i = bisectDate(filtered, x.invert(mx), 1);
      const d = filtered[Math.min(i, filtered.length - 1)];
      hoverDot.attr("cx", x(d.date)).attr("cy", y(d.indexed_100)).style("opacity", 1);
      tooltip.style("opacity", 1)
        .style("left", (event.pageX + 14) + "px").style("top", (event.pageY - 36) + "px")
        .html(`<strong>${d.asset_name}</strong><br/>
               ${d.date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}<br/>
               $100 → <strong>$${(+d.indexed_100).toFixed(2)}</strong>`);
    })
    .on("mouseleave", () => { hoverDot.style("opacity", 0); tooltip.style("opacity", 0); });
}

// ── BAR CHART ──────────────────────────────────
function drawBarChart() {
  d3.select("#bar-chart").selectAll("*").remove();
  const data = summaryData.filter(d => d.episode === state.episode)
    .sort((a, b) => a.total_return_pct - b.total_return_pct);
  if (!data.length) return;

  const container = document.getElementById("bar-chart");
  const W = container.clientWidth || 780, H = 340;
  const margin = { top: 10, right: 60, bottom: 34, left: 148 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart").append("svg")
    .attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain(d3.extent(data, d => d.total_return_pct)).nice().range([0, w]);
  const y = d3.scaleBand().domain(data.map(d => d.asset_name)).range([0, h]).padding(0.22);

  g.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", h)
    .attr("stroke", "#ddd").attr("stroke-width", 1);
  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%"))
    .call(gx => gx.select(".domain").remove());

  const tooltip = d3.select("body").selectAll(".tooltip").data([null]).join("div").attr("class", "tooltip");

  g.selectAll(".bar").data(data).join("rect").attr("class", "bar")
    .attr("x", d => Math.min(x(0), x(d.total_return_pct)))
    .attr("y", d => y(d.asset_name))
    .attr("width", d => Math.abs(x(d.total_return_pct) - x(0)))
    .attr("height", y.bandwidth())
    .attr("fill", d => d.total_return_pct >= 0 ? "#2a9d5c" : "#d9534f")
    .attr("opacity", d => d.asset_name === state.asset ? 1 : 0.62)
    .attr("rx", 2)
    .on("mousemove", (event, d) => {
      tooltip.style("opacity", 1)
        .style("left", (event.pageX + 14) + "px").style("top", (event.pageY - 36) + "px")
        .html(`<strong>${d.asset_name}</strong><br/>Return: <strong>${fmtPct(d.total_return_pct)}</strong><br/>$100 → <strong>${fmtMoney(d.end_value)}</strong><br/>Worst drop: ${fmtPct(d.max_drawdown)}`);
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));

  g.selectAll(".bar-label").data(data).join("text").attr("class", "bar-label")
    .attr("x", -6).attr("y", d => y(d.asset_name) + y.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .attr("fill", d => d.asset_name === state.asset ? "#1a1a1a" : "#999")
    .attr("font-weight", d => d.asset_name === state.asset ? "700" : "400")
    .text(d => d.asset_name);

  g.selectAll(".bar-value").data(data).join("text").attr("class", "bar-value")
    .attr("x", d => d.total_return_pct >= 0 ? x(d.total_return_pct) + 4 : x(d.total_return_pct) - 4)
    .attr("y", d => y(d.asset_name) + y.bandwidth() / 2 + 4)
    .attr("text-anchor", d => d.total_return_pct >= 0 ? "start" : "end")
    .attr("fill", d => d.total_return_pct >= 0 ? "#2a9d5c" : "#d9534f")
    .attr("font-size", "11px").attr("font-weight", "600")
    .text(d => fmtPct(d.total_return_pct));
}

// ── ASSET INFO PANEL ───────────────────────────
function drawAssetInfoPanel() {
  const panel = document.getElementById("asset-info-panel");
  panel.innerHTML = "";
  const asset = state.asset, episode = state.episode;
  const info = ASSET_INFO[asset], takeaway = EPISODE_TAKEAWAYS[episode]?.[asset];
  if (!info) return;

  const isNew = info.group === "New money";
  const tagClass = isNew ? "tag-new-money" : "tag-old-money";
  const groupLabel = isNew ? "New Money" : "Old Money";
  const groupExplain = isNew
    ? "New money assets are modern, high-growth investments — tech stocks, semiconductors, crypto. They boom when optimism runs high and crash hard when conditions tighten."
    : "Old money assets are traditional, time-tested investments — gold, banks, bonds, utilities. Often considered safer, but that depends entirely on the type of crisis.";

  const row = summaryData.find(d => d.episode === episode && d.asset_name === asset);
  const statsHTML = row ? `
    <div class="asset-stats-row">
      <div class="asset-stat">
        <div class="asset-stat-label">$100 became</div>
        <div class="asset-stat-val ${row.end_value >= 100 ? "pos" : "neg"}">${fmtMoney(row.end_value)}</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Total return</div>
        <div class="asset-stat-val ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Worst drop</div>
        <div class="asset-stat-val neg">${fmtPct(row.max_drawdown)}</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Daily vol.</div>
        <div class="asset-stat-val">${fmtPct(row.volatility_pct)}</div>
      </div>
    </div>` : "";

  panel.innerHTML = `
    <div class="info-card">
      <div class="asset-name-large">${asset}</div>
      <span class="info-tag ${tagClass}">${groupLabel}</span>
      <p>${info.description}</p>
      <p class="takeaway">💡 ${groupExplain}</p>
      ${statsHTML}
    </div>
    <div class="info-card">
      <h3>The ${episode}</h3>
      <p>${episodeMeta.find(d => d.episode === episode)?.story ?? ""}</p>
      ${takeaway ? `<p class="takeaway">📌 ${takeaway}</p>` : ""}
    </div>`;
}

// ── OLD VS NEW CHART ───────────────────────────
function drawOldVsNewChart() {
  d3.select("#old-vs-new-chart").selectAll("*").remove();
  const ep = state.episode;
  const rows = crisisData.filter(d => d.episode === ep && (d.group === "Old money" || d.group === "New money"));
  if (!rows.length) return;

  const days = [...new Set(rows.map(d => d.episode_day))].sort((a, b) => a - b);
  const oldMap = new Map(), newMap = new Map();
  days.forEach(day => {
    const dr = rows.filter(d => d.episode_day === day);
    const or = dr.filter(d => d.group === "Old money");
    const nr = dr.filter(d => d.group === "New money");
    if (or.length) oldMap.set(day, d3.mean(or, d => d.indexed_100));
    if (nr.length) newMap.set(day, d3.mean(nr, d => d.indexed_100));
  });

  const oldSeries = days.map(d => ({ day: d, val: oldMap.get(d) ?? null })).filter(d => d.val != null);
  const newSeries = days.map(d => ({ day: d, val: newMap.get(d) ?? null })).filter(d => d.val != null);
  const allVals = [...oldSeries, ...newSeries].map(d => d.val);
  if (!allVals.length) return;

  const container = document.getElementById("old-vs-new-chart");
  const totalW = container.clientWidth || 780, H = 260;
  const margin = { top: 14, right: 56, bottom: 38, left: 52 };
  const W = totalW - margin.left - margin.right;
  const [yMin, yMax] = d3.extent(allVals);
  const yPad = (yMax - yMin) * 0.1;
  const xScale = d3.scaleLinear().domain([0, d3.max(days)]).range([0, W]);
  const yScale = d3.scaleLinear().domain([Math.min(yMin - yPad, 96), yMax + yPad]).nice().range([H, 0]);

  const svg = d3.select("#old-vs-new-chart").append("svg")
    .attr("width", totalW).attr("height", H + margin.top + margin.bottom)
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("g").call(d3.axisLeft(yScale).ticks(5).tickSize(-W).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#f4f4f4"); });
  svg.append("line").attr("x1", 0).attr("x2", W).attr("y1", yScale(100)).attr("y2", yScale(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "3 3");
  svg.append("g").attr("transform", `translate(0,${H})`)
    .call(d3.axisBottom(xScale).ticks(6).tickFormat(d => d === 0 ? "Day 0" : `Day ${d}`))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  svg.append("g").call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d3.format(".0f")(d)}`))
    .call(gx => gx.select(".domain").remove());

  const makeLine = d3.line().x(d => xScale(d.day)).y(d => yScale(d.val))
    .curve(d3.curveCatmullRom.alpha(0.5)).defined(d => d.val != null);

  svg.append("path").datum(oldSeries).attr("fill", "none")
    .attr("stroke", "#e6a817").attr("stroke-width", 2.2).attr("d", makeLine(oldSeries));
  svg.append("path").datum(newSeries).attr("fill", "none")
    .attr("stroke", "#4a90d9").attr("stroke-width", 2.2).attr("stroke-dasharray", "7 4")
    .attr("d", makeLine(newSeries));

  [{ s: oldSeries, c: "#e6a817" }, { s: newSeries, c: "#4a90d9" }].forEach(({ s, c }) => {
    if (!s.length) return;
    const last = s[s.length - 1];
    svg.append("text").attr("x", xScale(last.day) + 5).attr("y", yScale(last.val) + 4)
      .attr("fill", c).attr("font-size", "11px").attr("font-weight", "700")
      .text(`$${last.val.toFixed(0)}`);
  });

  const tooltip = d3.select("body").selectAll(".tooltip").data([null]).join("div").attr("class", "tooltip");
  const crosshair = svg.append("line").attr("y1", 0).attr("y2", H)
    .attr("stroke", "#ccc").attr("stroke-dasharray", "3 3").attr("opacity", 0);
  const bisect = d3.bisector(d => d.day).left;

  svg.append("rect").attr("width", W).attr("height", H).attr("fill", "transparent")
    .on("mousemove", function (event) {
      const [mx] = d3.pointer(event);
      const day = Math.round(xScale.invert(mx));
      const oi = Math.min(bisect(oldSeries, day), oldSeries.length - 1);
      const ni = Math.min(bisect(newSeries, day), newSeries.length - 1);
      crosshair.attr("x1", mx).attr("x2", mx).attr("opacity", 1);
      tooltip.style("opacity", 1)
        .style("left", (event.pageX + 14) + "px").style("top", (event.pageY - 36) + "px")
        .html(`<strong>Day ${day}</strong><br/><span style="color:#e6a817">● Old money</span> ${oldSeries[oi] ? "$" + oldSeries[oi].val.toFixed(1) : "—"}<br/><span style="color:#4a90d9">● New money</span> ${newSeries[ni] ? "$" + newSeries[ni].val.toFixed(1) : "—"}`);
    })
    .on("mouseleave", () => { crosshair.attr("opacity", 0); tooltip.style("opacity", 0); });
}

// ── GROUP SUMMARY ──────────────────────────────
function drawGroupSummary() {
  const container = document.getElementById("group-summary");
  container.innerHTML = "";
  document.getElementById("slide-4-title").textContent = `Old money vs new money: ${state.episode}`;
  document.getElementById("slide-4-desc").textContent = "Every asset, grouped by type. See which camp held up and which didn't.";

  const episodeRows = summaryData.filter(d => d.episode === state.episode);
  if (!episodeRows.length) {
    container.innerHTML = `<p style="color:#aaa">No summary data available.</p>`; return;
  }

  for (const groupName of ["Old money", "New money"]) {
    const rows = episodeRows.filter(d => d.group === groupName);
    if (!rows.length) continue;
    const isNew = groupName === "New money";
    const sorted = [...rows].sort((a, b) => b.total_return_pct - a.total_return_pct);
    const avgReturn = d3.mean(rows, d => d.total_return_pct);
    const card = document.createElement("div");
    card.className = `group-card ${isNew ? "new-money-card" : "old-money-card"}`;
    card.innerHTML = `
      <div class="group-card-label">${groupName}</div>
      <div class="group-card-title">Avg: ${fmtPct(avgReturn)}</div>
      <ul class="group-asset-list">
        ${sorted.map(d => `
          <li class="group-asset-item">
            <span>${d.asset_name}</span>
            <span class="asset-ret ${d.total_return_pct >= 0 ? "ret-pos" : "ret-neg"}">${fmtPct(d.total_return_pct)}</span>
          </li>`).join("")}
      </ul>`;
    container.appendChild(card);
  }
}

// ── GLOSSARY CARDS ─────────────────────────────
function drawGlossaryCards() {
  const container = document.getElementById("glossary-cards");
  container.innerHTML = "";
  Object.entries(ASSET_INFO).forEach(([name, info]) => {
    const isNew = info.group === "New money";
    const card = document.createElement("div");
    card.className = `glossary-card ${isNew ? "new-money" : "old-money"}`;
    card.dataset.group = isNew ? "new" : "old";
    card.innerHTML = `
      <span class="card-tag ${isNew ? "new-money" : "old-money"}">${info.group}</span>
      <h3>${name}</h3>
      <p class="card-preview">${info.description}</p>
      <p class="card-cta">Learn more →</p>`;
    card.addEventListener("click", () => openGlossaryModal(name));
    container.appendChild(card);
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const filter = this.dataset.filter;
      document.querySelectorAll(".glossary-card").forEach(card => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.group !== filter);
      });
    });
  });
}

// ── GLOSSARY MODAL ─────────────────────────────
function openGlossaryModal(assetName) {
  const info = ASSET_INFO[assetName];
  const isNew = info.group === "New money";
  const explainer = isNew
    ? "New money assets are modern, high-growth investments — tech stocks, semiconductors, crypto. They boom in good times and crash hard when conditions tighten."
    : "Old money assets are traditional, time-tested investments — gold, banks, bonds, utilities. Often considered safer, but that depends on the type of crisis.";

  const episodeListHTML = Object.keys(EPISODE_TAKEAWAYS).map(ep => {
    const takeaway = EPISODE_TAKEAWAYS[ep]?.[assetName];
    if (!takeaway) return "";
    const row = summaryData.find(d => d.episode === ep && d.asset_name === assetName);
    const retBadge = row
      ? `<span class="modal-ret-badge ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}</span>`
      : "";
    return `
      <li class="modal-episode-item">
        <div class="modal-episode-name">${ep} ${retBadge}</div>
        <div class="modal-episode-takeaway">${takeaway}</div>
      </li>`;
  }).filter(Boolean).join("");

  document.getElementById("modal-content").innerHTML = `
    <div class="modal-asset-name">${assetName}</div>
    <span class="modal-group-badge ${isNew ? "new-money" : "old-money"}">${info.group}</span>
    <p class="modal-description">${info.description}</p>
    <div class="modal-group-explainer">💡 ${explainer}</div>
    <div class="modal-episodes-label">How it performed — episode by episode</div>
    <ul class="modal-episode-list">${episodeListHTML}</ul>`;

  const overlay = document.getElementById("glossary-modal");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGlossaryModal() {
  document.getElementById("glossary-modal").classList.remove("open");
  document.getElementById("glossary-modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("modal-close").addEventListener("click", closeGlossaryModal);
document.getElementById("glossary-modal").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeGlossaryModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeGlossaryModal(); });

// ── QUIZ ───────────────────────────────────────
function buildQuizOptions() {
  const assets = [...new Set(summaryData.map(d => d.asset_name))].sort();
  const container = document.getElementById("quiz-options");
  container.innerHTML = "";
  assets.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.addEventListener("click", function () {
      state.selectedQuiz = name;
      container.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
    });
    container.appendChild(btn);
  });
}

document.getElementById("reveal-btn").addEventListener("click", () => {
  const ranked = consistencyRanking();
  const winner = ranked[0];
  const picked = state.selectedQuiz ? ranked.find(d => d.assetName === state.selectedQuiz) : null;
  const pickedRank = picked ? ranked.indexOf(picked) + 1 : null;
  const result = document.getElementById("quiz-result");
  result.classList.add("visible");

  let pickedMsg = "";
  if (picked) {
    pickedMsg = picked.assetName === winner.assetName
      ? "✅ Correct! "
      : `You picked <strong>${picked.assetName}</strong> (ranked #${pickedRank}). `;
  }

  result.innerHTML = `
    <h3>🏅 ${winner.assetName} held up most consistently across all six crises.</h3>
    <p>${pickedMsg}${winner.assetName} finished positive in <strong>${winner.positive} out of ${winner.count}</strong> episodes with data,
    and had the best average ranking across every crash and rally.
    Bitcoin had explosive average returns but enormous swings — consistency is a different game.</p>`;

  drawQuizRanking(ranked);
});

function drawQuizRanking(data) {
  const container = document.getElementById("quiz-ranking");
  container.innerHTML = "";
  const top = data.slice(0, 10);
  const W = container.clientWidth || 760, H = 300;
  const margin = { top: 12, right: 150, bottom: 30, left: 148 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const svg = d3.select("#quiz-ranking").append("svg")
    .attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 1]).range([0, w]);
  const y = d3.scaleBand().domain(top.map(d => d.assetName)).range([0, h]).padding(0.25);

  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(4).tickFormat(d => `${Math.round(d * 100)}%`))
    .call(gx => gx.select(".domain").remove());

  g.selectAll("rect").data(top).join("rect")
    .attr("x", 0).attr("y", d => y(d.assetName))
    .attr("height", y.bandwidth()).attr("width", d => x(d.positiveShare))
    .attr("fill", d => d.group === "New money" ? "#4a90d9" : "#e6a817")
    .attr("opacity", d => d.assetName === state.selectedQuiz ? 1 : 0.68)
    .attr("rx", 2);

  g.selectAll(".bar-label").data(top).join("text").attr("class", "bar-label")
    .attr("x", -6).attr("y", d => y(d.assetName) + y.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .attr("font-weight", d => d.assetName === state.selectedQuiz ? "700" : "400")
    .text(d => d.assetName);

  g.selectAll(".bar-value").data(top).join("text").attr("class", "bar-value")
    .attr("x", d => x(d.positiveShare) + 6)
    .attr("y", d => y(d.assetName) + y.bandwidth() / 2 + 4)
    .text(d => `${d.positive}/${d.count} positive · avg rank ${d.avgRank?.toFixed(1) ?? "—"}`);
}