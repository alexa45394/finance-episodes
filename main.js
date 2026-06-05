// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const CPI_DATA = [
  { year: 2000, cpi: 172.2 }, { year: 2001, cpi: 177.1 }, { year: 2002, cpi: 179.9 },
  { year: 2003, cpi: 184.0 }, { year: 2004, cpi: 188.9 }, { year: 2005, cpi: 195.3 },
  { year: 2006, cpi: 201.6 }, { year: 2007, cpi: 207.3 }, { year: 2008, cpi: 215.3 },
  { year: 2009, cpi: 214.5 }, { year: 2010, cpi: 218.1 }, { year: 2011, cpi: 224.9 },
  { year: 2012, cpi: 229.6 }, { year: 2013, cpi: 233.0 }, { year: 2014, cpi: 236.7 },
  { year: 2015, cpi: 237.0 }, { year: 2016, cpi: 240.0 }, { year: 2017, cpi: 245.1 },
  { year: 2018, cpi: 251.1 }, { year: 2019, cpi: 255.7 }, { year: 2020, cpi: 258.8 },
  { year: 2021, cpi: 271.0 }, { year: 2022, cpi: 292.7 }, { year: 2023, cpi: 304.7 },
  { year: 2024, cpi: 313.7 }, { year: 2025, cpi: 321.9 },
];

const EPISODE_YEARS = {
  "Dot-Com Crash":           { start: 2000, end: 2002, blurbEnd: 2005 },
  "Global Financial Crisis": { start: 2007, end: 2009, blurbEnd: 2012 },
  "COVID Crash":             { start: 2020, end: 2020, blurbEnd: 2025 },
  "2022 Inflation Shock":    { start: 2022, end: 2022, blurbEnd: 2025 },
  "Regional Banking Crisis": { start: 2023, end: 2023, blurbEnd: 2025 },
  "AI Rally":                { start: 2023, end: 2024, blurbEnd: 2025 },
};

const ASSET_INFO = {
  "S&P 500": {
    ticker: "SPY", group: "Baseline",
    description: "The S&P 500 tracks the 500 largest publicly traded U.S. companies — from Apple and Microsoft to JPMorgan and Exxon. It's considered the best single measure of the U.S. stock market. When people say 'the market was up 10% this year,' they're usually talking about the S&P 500. It's used here as the baseline benchmark everything else is compared against.",
    example: "If the S&P 500 falls 40% in a crisis but your asset only falls 10%, your asset 'beat the market' — even if you still lost money.",
  },
  "Gold": {
    ticker: "GLD", group: "Old money",
    description: "Gold is one of the oldest stores of value in human history. Investors flock to it during times of fear and uncertainty because it holds its value when paper money doesn't. It doesn't pay dividends or interest — it just sits there, and people trust it.",
    example: "In a panic, gold can act like a store of value while riskier assets are being sold off.",
  },
  "Financials": {
    ticker: "XLF", group: "Old money",
    description: "This tracks large financial companies like JPMorgan Chase, Bank of America, and Goldman Sachs. When the economy is doing well, banks make money lending it out. When credit dries up or loans go bad, they're often the first to fall — and the hardest.",
    example: "JPMorgan, Bank of America, Goldman Sachs, and large insurers are typical financial-sector names.",
  },
  "Regional Banks": {
    ticker: "KRE", group: "Old money",
    description: "Smaller, community-focused banks that serve local businesses and consumers. They're more exposed to local economic conditions and specific risks — like commercial real estate — than the big national banks. The 2023 banking crisis put this sector directly in the spotlight.",
    example: "Silicon Valley Bank and First Republic are examples of why smaller banks became the center of attention in 2023.",
  },
  "Energy": {
    ticker: "XLE", group: "Old money",
    description: "Oil and gas companies like ExxonMobil and Chevron. Energy prices are tied to global supply and demand, making this sector highly sensitive to geopolitical events, recessions, and shifts in consumer behavior. Energy can be a big winner when inflation spikes, and a big loser when economies slow.",
    example: "ExxonMobil and Chevron are classic energy-sector companies.",
  },
  "Utilities": {
    ticker: "XLU", group: "Old money",
    description: "Electric, water, and gas companies that people rely on no matter what the economy is doing. Because demand is steady, utilities are considered boring but stable — except when rising interest rates make their heavy debt loads more expensive.",
    example: "A power company is usually less exciting than tech, but demand for electricity does not disappear in a recession.",
  },
  "Long Bonds": {
    ticker: "TLT", group: "Old money",
    description: "U.S. government bonds that mature in 20 or more years. Traditionally the safest asset class — backed by the full faith of the U.S. government. But they're extremely sensitive to interest rates: when rates rise sharply, long bond prices fall hard. The 2022 inflation shock proved that 'safe' doesn't always mean painless.",
    example: "In 2022, long bonds showed that 'safe' does not always mean painless.",
  },
  "Nasdaq 100": {
    ticker: "QQQ", group: "New money",
    description: "The 100 largest non-financial companies listed on the Nasdaq exchange, heavily weighted toward tech giants like Apple, Microsoft, and Alphabet. It moves fast in both directions — huge gains in tech booms, sharp drops when valuations get questioned or rates rise.",
    example: "Apple, Microsoft, Nvidia, Amazon, and other large growth companies drive much of this index.",
  },
  "Technology": {
    ticker: "XLK", group: "New money",
    description: "A broad basket of technology companies including hardware, software, and services. This sector has driven much of the stock market's growth over the past two decades but is vulnerable to rising interest rates and slowing growth expectations.",
    example: "This is broader than one company, but it is still strongly tied to the tech cycle.",
  },
  "Semiconductors": {
    ticker: "SMH", group: "New money",
    description: "Companies that design and manufacture computer chips — the physical foundation of the modern digital economy. Demand exploded with AI. Nvidia alone became one of the most valuable companies in the world during the AI rally, and the sector as a whole became the clearest story of new-money dominance.",
    example: "Nvidia is the obvious example, but the sector also includes chip designers, manufacturers, and equipment companies.",
  },
  "Innovation Stocks": {
    ticker: "ARKK", group: "New money",
    description: "High-risk bets on early-stage companies trying to disrupt industries — think electric vehicles, gene editing, and fintech. These stocks soared during COVID when money was cheap and optimism was unlimited, then crashed hard when interest rates rose in 2022.",
    example: "This includes themes like electric vehicles, fintech, genomics, and speculative software.",
  },
  "Bitcoin": {
    ticker: "BTC-USD", group: "New money",
    description: "The world's largest cryptocurrency. Bitcoin is decentralized — no government controls it. It's become a speculative asset that moves dramatically in both directions. Some see it as digital gold; others see it as a pure gamble. In the data, it can win huge, but it is not stable.",
    example: "Bitcoin can rally during distrust in banks, but it can also fall more than stocks during risk-off periods.",
  },
};

const GROUP_EXPLAINER = {
  "Old money": "Old money assets are traditional, time-tested investments — gold, banks, bonds, utilities. Often considered safer, but that depends entirely on the type of crisis.",
  "New money": "New money assets are modern, high-growth investments — tech stocks, semiconductors, crypto. They boom when optimism runs high and crash hard when conditions tighten.",
};

const EPISODE_CONTEXT = {
  "Dot-Com Crash":           { dates: "2000–2002", summary: "The internet bubble burst after investors paid extreme prices for early web companies. Tech fell much harder than the overall market, while some traditional assets held up better.", keyFact: "A clean example where the new-money story failed first." },
  "Global Financial Crisis": { dates: "2007–2009", summary: "The housing and credit system broke. Banks, mortgages, and credit markets became the center of the crisis, so financial assets were hit directly.", keyFact: "A crisis where old-money finance was the fragile area." },
  "COVID Crash":             { dates: "2020",      summary: "The pandemic caused a sudden shutdown and the market fell quickly. Then stimulus and low rates helped many assets recover fast, especially tech.", keyFact: "A crash can be short but still violent." },
  "2022 Inflation Shock":    { dates: "2022",      summary: "Inflation and rising interest rates changed the rules. Growth stocks fell, long bonds fell, and energy became one of the few major winners.", keyFact: "This period shows why bonds are not automatically safe when rates rise." },
  "Regional Banking Crisis": { dates: "2023",      summary: "Several regional banks failed or came under stress. Large tech and Bitcoin held up better than the banks directly tied to the panic.", keyFact: "This crisis was narrow, but very painful for regional banks." },
  "AI Rally":                { dates: "2023–2024", summary: "AI optimism pushed semiconductors and large tech much higher. The market looked strong, but the gains were concentrated in a few modern-growth assets.", keyFact: "Not a crash — an episode where new money clearly dominated." },
};

const EPISODE_TAKEAWAYS = {
  "Dot-Com Crash": {
    "S&P 500":         "The S&P 500 fell nearly 50% during the dot-com crash as tech stocks, which had grown to dominate the index, imploded. It took over four years to recover.",
    "Gold":            "Gold was a quiet winner during the dot-com crash — while tech imploded, investors rotated into safe havens and gold gained over 10%.",
    "Financials":      "Financials took a moderate hit but held up better than tech, since the crash was driven by internet speculation rather than broad credit problems.",
    "Regional Banks":  "Regional banks were relatively insulated from the dot-com bust since their exposure to tech startups was limited.",
    "Energy":          "Energy held relatively steady — the dot-com crash was a tech story, and oil demand kept chugging along.",
    "Utilities":       "Utilities were one of the better places to hide during the dot-com crash, offering steady returns when growth stocks were collapsing.",
    "Long Bonds":      "Long bonds rallied strongly as investors fled stocks and the Fed cut rates — exactly what bonds are supposed to do in a crisis.",
    "Nasdaq 100":      "The Nasdaq 100 was ground zero for the dot-com crash, losing nearly 80% of its value as internet bubble valuations collapsed.",
    "Technology":      "Technology stocks were devastated — many companies that had never turned a profit simply ceased to exist.",
    "Semiconductors":  "Semiconductors crashed hard as demand for tech hardware evaporated along with the companies buying it.",
    "Innovation Stocks":"Innovation-style stocks didn't exist as a formal category yet, but the speculative tech companies of the era were wiped out.",
    "Bitcoin":         "Bitcoin didn't exist during the dot-com crash — it was created in 2009.",
  },
  "Global Financial Crisis": {
    "S&P 500":         "The S&P 500 fell over 55% peak to trough during the financial crisis — one of the worst collapses in modern history. Banks, automakers, and a wide swath of corporate America were in freefall.",
    "Gold":            "Gold surged during the financial crisis as trust in banks collapsed — one of its best-known safe-haven performances.",
    "Financials":      "Financials were the epicenter of the 2008 crisis. Banks had loaded up on toxic mortgage debt and the whole sector nearly collapsed.",
    "Regional Banks":  "Regional banks were hit hard — many failed outright. The FDIC had to take over hundreds of smaller institutions.",
    "Energy":          "Energy crashed as the global recession crushed demand for oil, with crude prices falling from $145 to under $35 per barrel.",
    "Utilities":       "Utilities fell less than most but still dropped significantly as the credit crunch made their heavy debt loads more expensive.",
    "Long Bonds":      "Long bonds were a strong safe haven in 2008 — the Fed slashed rates to zero and investors piled into U.S. Treasuries.",
    "Nasdaq 100":      "The Nasdaq dropped over 50% during the financial crisis as the broad economic collapse hit even tech companies.",
    "Technology":      "Technology fell sharply as corporate spending froze and consumer demand collapsed.",
    "Semiconductors":  "Semiconductors were crushed as global demand for electronics dropped with the economy.",
    "Innovation Stocks":"Highly speculative investments were abandoned as investors sought safety — anything risky got sold.",
    "Bitcoin":         "Bitcoin was created in January 2009, right at the tail end of the crisis. It had essentially no market value at the time.",
  },
  "COVID Crash": {
    "S&P 500":         "The S&P 500 fell 34% in just 33 days — the fastest bear market in history. Then it recovered just as fast as stimulus and Fed action flooded the system with money.",
    "Gold":            "Gold held up well during COVID and finished the period higher, as it often does when fear spikes.",
    "Financials":      "Financials dropped sharply as loan defaults were feared — banks faced enormous uncertainty about who would be able to repay.",
    "Regional Banks":  "Regional banks were hit hard by fears of small business failures and loan losses in their local communities.",
    "Energy":          "Energy was devastated — oil briefly traded at negative prices as demand collapsed and storage ran out.",
    "Utilities":       "Utilities fell moderately but recovered — people still needed electricity and water even during lockdowns.",
    "Long Bonds":      "Long bonds rallied initially as the Fed cut rates to zero and investors panicked, but then stabilized.",
    "Nasdaq 100":      "The Nasdaq crashed hard in March 2020 but then roared back — tech companies actually benefited from a remote-everything world.",
    "Technology":      "Technology rebounded faster than almost any other sector as Zoom, cloud computing, and e-commerce demand exploded.",
    "Semiconductors":  "Semiconductors had a wild ride — initial crash followed by a massive surge as demand for chips exploded.",
    "Innovation Stocks":"Innovation stocks were among the biggest winners of COVID — low rates and stimulus checks sent them soaring.",
    "Bitcoin":         "Bitcoin crashed 50% in March 2020 alongside everything else, then recovered completely and surged through the rest of the year.",
  },
  "2022 Inflation Shock": {
    "S&P 500":         "The S&P 500 fell over 25% in 2022 as rising rates repriced every asset. It was one of the worst years for the index since 2008.",
    "Gold":            "Gold was supposed to be an inflation hedge but largely disappointed in 2022 — it dropped as rising rates made holding non-yielding assets less attractive.",
    "Financials":      "Financials had a mixed year — higher rates helped bank lending margins, but fears of recession hurt the sector overall.",
    "Regional Banks":  "Regional banks struggled as the economic outlook darkened and concerns about loan quality grew.",
    "Energy":          "Energy was the big winner of 2022 — soaring oil and gas prices following Russia's invasion of Ukraine drove massive returns.",
    "Utilities":       "Utilities fell despite being considered defensive — rising interest rates made their bonds less attractive relative to alternatives.",
    "Long Bonds":      "Long bonds had their worst year in modern history. Rising rates crushed bond prices — the asset most people use for safety lost over 30%.",
    "Nasdaq 100":      "The Nasdaq dropped over 30% in 2022 as rising rates punished high-growth, high-valuation tech companies.",
    "Technology":      "Technology stocks were decimated as the era of cheap money ended and investors demanded real profits over future growth.",
    "Semiconductors":  "Semiconductors fell sharply as the chip demand boom cooled and recession fears grew.",
    "Innovation Stocks":"Innovation stocks collapsed in 2022 — ARKK lost over 60% as the speculative bubble from 2020-2021 fully deflated.",
    "Bitcoin":         "Bitcoin fell over 65% in 2022 as rising rates and the collapse of FTX triggered a full crypto winter.",
  },
  "Regional Banking Crisis": {
    "S&P 500":         "The S&P 500 was relatively resilient during this crisis — the damage was contained to regional banks, and large tech stocks continued their recovery.",
    "Gold":            "Gold rose during the banking crisis as investors sought safety when Silicon Valley Bank collapsed.",
    "Financials":      "Large financials were rattled but held up — the crisis was contained to smaller regional banks.",
    "Regional Banks":  "Regional banks were the story — SVB, Signature, and First Republic all failed within weeks.",
    "Energy":          "Energy was largely unaffected by the banking crisis, moving on its own supply-and-demand dynamics.",
    "Utilities":       "Utilities held relatively steady — the banking crisis didn't change the business of providing power and water.",
    "Long Bonds":      "Long bonds rallied as the crisis triggered expectations of Fed rate cuts.",
    "Nasdaq 100":      "Big tech barely noticed the regional banking crisis — the Nasdaq continued its 2023 recovery.",
    "Technology":      "Technology held up well, continuing its rebound from the 2022 selloff.",
    "Semiconductors":  "Semiconductors were unaffected by the banking crisis and continued their AI-driven rally.",
    "Innovation Stocks":"Innovation stocks had a mixed period — they benefited from falling rate expectations but were still recovering from 2022.",
    "Bitcoin":         "Bitcoin surged during the banking crisis as some investors saw it as an alternative to a fragile banking system.",
  },
  "AI Rally": {
    "S&P 500":         "The S&P 500 surged over 50% during the AI rally period, driven almost entirely by a handful of mega-cap tech stocks. The gains were real but highly concentrated.",
    "Gold":            "Gold had modest gains during the AI rally — steady background asset, not the star of the show.",
    "Financials":      "Financials recovered from 2023's banking crisis fears and delivered solid returns.",
    "Regional Banks":  "Regional banks slowly stabilized after the 2023 crisis but significantly underperformed the broader market.",
    "Energy":          "Energy had a mixed run during the AI rally — oil prices were volatile and the sector lagged.",
    "Utilities":       "Utilities became an unexpected AI story — data centers require enormous electricity, boosting power company demand.",
    "Long Bonds":      "Long bonds struggled as interest rates stayed higher for longer than expected.",
    "Nasdaq 100":      "The Nasdaq 100 was one of the primary beneficiaries of the AI rally, driven by Nvidia, Microsoft, and Apple.",
    "Technology":      "Technology surged as AI became the dominant investment theme.",
    "Semiconductors":  "Semiconductors were the single biggest winner. Nvidia's stock rose over 700% as AI chip demand became insatiable.",
    "Innovation Stocks":"Innovation stocks recovered partially but never returned to their 2021 highs.",
    "Bitcoin":         "Bitcoin surged over 300% as the approval of spot Bitcoin ETFs brought institutional money in.",
  },
};

// ── STATE ─────────────────────────────────────────────────────────────────────
let crisisData  = [];
let summaryData = [];
let episodeMeta = [];
let wideData    = [];
let checkedAssets = new Set(["S&P 500"]);
let useLogScale   = false;
let state = { episode: "Dot-Com Crash", asset: "Gold", currentSlide: 1, selectedQuiz: null };

// ── HELPERS ───────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const fmtPct = v => (v >= 0 ? "+" : "") + v.toFixed(1) + "%";
const fmtMoney = v => "$" + v.toFixed(2);
const fmtDollar = v => "$" + Math.round(v).toLocaleString();

function getTicker(asset)  { return ASSET_INFO[asset]?.ticker || ""; }
function getGroup(asset)   { return ASSET_INFO[asset]?.group || ""; }
function realValueAt(fromYear, toYear) {
  const from = CPI_DATA.find(d => d.year === fromYear);
  const to   = CPI_DATA.find(d => d.year === toYear);
  return from && to ? (100 * from.cpi / to.cpi).toFixed(2) : null;
}
function animatePath(path, duration = 1400) {
  const len = path.node().getTotalLength();
  path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
    .transition().duration(duration).ease(d3.easeQuadInOut).attr("stroke-dashoffset", 0);
}

// ── DATA LOAD ─────────────────────────────────────────────────────────────────
Promise.all([
  d3.csv("data/market_crisis_data.csv"),
  d3.csv("data/crisis_asset_summary.csv"),
  d3.json("data/crisis_periods.json"),
  d3.csv("data/asset_prices_wide.csv", d => {
    const row = { date: new Date(d.Date) };
    Object.keys(d).forEach(k => { if (k !== "Date") row[k] = d[k] === "" ? NaN : +d[k]; });
    return row;
  }),
]).then(([csvData, csvSummary, jsonMeta, csvWide]) => {
  crisisData = csvData.map(d => ({
    ...d,
    date: new Date(d.date),
    indexed_100: +d.indexed_100,
    episode_day: +d.episode_day,
    drawdown: +d.drawdown,
  }));
  summaryData = csvSummary.map(d => ({
    ...d,
    total_return_pct: +d.total_return_pct,
    end_value: +d.end_value,
    max_drawdown: +d.max_drawdown,
    volatility_pct: +d.volatility_pct,
  }));
  episodeMeta = jsonMeta;
  wideData    = csvWide.filter(d => d.date && !isNaN(d.date));
  state.episode = episodeMeta[0]?.episode || state.episode;
  initDropdowns();
  updateInflationBlurb();
  drawInflationChart();
  buildGlossaryCards();
  buildQuizOptions();
  buildPortfolioBuilder();
  renderLongViewSection();
  renderTable();
}).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML("afterbegin",
    `<div style="padding:16px;background:#fff3f3;border:2px solid #c00;color:#c00;font-family:monospace">
      Data failed to load. Run with Live Server, not by double-clicking index.html.<br>${err}</div>`);
});

// ── DROPDOWNS ─────────────────────────────────────────────────────────────────
function initDropdowns() {
  // Episode dropdown
  const epDd = d3.select("#episode-dropdown");
  epDd.selectAll("option").data(episodeMeta).join("option")
    .attr("value", d => d.episode)
    .text(d => {
      if (d.episode === "Global Financial Crisis") return "2008 Crisis (2007–2009)";
      if (d.episode === "Regional Banking Crisis")  return "Banking Crisis (2023)";
      return d.episode;
    });
  epDd.property("value", state.episode);
  epDd.on("change", function() {
    state.episode = this.value;
    ensureAssetAvailable();
    updateInflationBlurb();
    drawInflationChart();
    if ($("slideshow").classList.contains("visible")) goToSlide(state.currentSlide, false);
    renderLongViewSection();
    renderTable();
  });

  // Asset dropdown
  const allAssets = [...new Set(crisisData.map(d => d.asset_name))].filter(a => a !== "S&P 500").sort();
  state.asset = allAssets.includes("Gold") ? "Gold" : allAssets[0];
  const assetDd = d3.select("#asset-dropdown");
  assetDd.selectAll("option").data(allAssets).join("option")
    .attr("value", d => d).text(d => `${getTicker(d)} ${d}`);
  assetDd.property("value", state.asset);
  assetDd.on("change", function() {
    state.asset = this.value;
    if ($("slideshow").classList.contains("visible")) goToSlide(state.currentSlide, false);
  });

  // Shuffle
  $("shuffle-assets-btn")?.addEventListener("click", () => {
    const opts = [...assetDd.node().options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      assetDd.node().appendChild(opts[j]);
    }
  });

  // Begin button
  $("begin-btn").addEventListener("click", () => {
    $("slideshow").classList.add("visible");
    goToSlide(1);
    $("slideshow").scrollIntoView({ behavior: "smooth" });
  });

  // Long view nav
  $("explore-long-view-btn")?.addEventListener("click", () => {
    renderLongViewSection();
    $("long-view-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("back-to-selected-trade")?.addEventListener("click", () => {
    $("slideshow").classList.add("visible");
    goToSlide(state.currentSlide, false);
    $("slideshow").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("go-market-sheet")?.addEventListener("click", () => {
    $("glossary")?.scrollIntoView({ behavior: "smooth" });
  });
  $("continue-next-crisis")?.addEventListener("click", continueToNextCrisis);
  $("log-scale-toggle")?.addEventListener("change", e => {
    useLogScale = e.target.checked;
    drawLongChart();
  });

window.addEventListener("resize", () => {
    if (wideData.length) drawLongChart();
  });
}

function ensureAssetAvailable() {
  const available = new Set(crisisData.filter(d => d.episode === state.episode).map(d => d.asset_name));
  if (!available.has(state.asset)) state.asset = [...available].find(a => a !== "S&P 500") || "Gold";
}

// ── SLIDE NAVIGATION ──────────────────────────────────────────────────────────
document.querySelectorAll(".nav-btn[data-direction]").forEach(btn => {
  btn.addEventListener("click", () => {
    const d = btn.dataset.direction;
    goToSlide(d === "next" ? state.currentSlide + 1 : state.currentSlide - 1);
  });
});

function goToSlide(n, shouldScroll = true) {
  n = Math.max(1, Math.min(5, n));
  const prev = state.currentSlide;
  state.currentSlide = n;

  const dir = n > prev ? "next" : "back";
  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active", "slide-enter-next", "slide-enter-back"));
  const slide = $(`slide-${n}`);
  slide.classList.add("active", dir === "back" ? "slide-enter-back" : "slide-enter-next");

  // Dots — each slide-dots group just shows the position within the 5-slide set
  document.querySelectorAll(".slide-dots").forEach(group => {
    group.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === n - 1);
      dot.style.cursor = "pointer";
      dot.onclick = () => goToSlide(i + 1);
    });
  });

  if (n === 1) drawInflationChart();
  if (n === 2) { drawMainChart(); drawBarChart(); }
  if (n === 3) { drawAssetInfoPanel(); drawOldVsNewChart(); }
  if (n === 4) drawGroupSummary();
  if (n === 5) buildQuizOptions();

  if (shouldScroll) $("slideshow").scrollIntoView({ behavior: "smooth" });
}

// ── INFLATION BLURB ───────────────────────────────────────────────────────────
function updateInflationBlurb() {
  const years = EPISODE_YEARS[state.episode];
  if (!years) return;
  const endVal = realValueAt(years.start, years.blurbEnd);
  const loss = (100 - parseFloat(endVal)).toFixed(2);
  const el = $("inflation-blurb");
  if (!el) return;
  el.innerHTML = `At the start of the
    <span class="highlight-pill">${state.episode}</span> in
    <span class="highlight-pill">${years.start}</span>,
    $100 had a real purchasing power of
    <span class="highlight-pill highlight-gold">$100.00</span>.
    By <span class="highlight-pill">${years.blurbEnd}</span>,
    inflation had taken it down to
    <span class="highlight-pill highlight-red">$${endVal}</span>.
    Cash quietly lost <b>$${loss}</b> of buying power — any investment had to beat that just to break even.`;
}

// ── SLIDE 1: INFLATION CHART ──────────────────────────────────────────────────
// Two phases: episode window first, then click to expand to today
let inflationExpanded = false;

function drawInflationChart() {
  inflationExpanded = false;
  const years = EPISODE_YEARS[state.episode];
  const startYear = years ? years.start : 2000;
  const startCPI = CPI_DATA.find(d => d.year === startYear).cpi;
  const fullLine = CPI_DATA.filter(d => d.year >= startYear)
    .map(d => ({ year: d.year, value: +(100 * startCPI / d.cpi).toFixed(2) }));

  // Phase 1: show only up to blurbEnd
  const initialLine = fullLine.filter(d => d.year <= years.blurbEnd);
  _renderInflationChart(initialLine, startYear, years, fullLine, false);

  // Click-to-expand hint
  const hint = $("inflation-hint");
  if (hint) { hint.style.display = "block"; hint.textContent = "Click the chart to see the full journey to today →"; }
}

function _renderInflationChart(lineData, startYear, years, fullLine, expanded) {
  const el = $("inflation-chart");
  const W = el.clientWidth || 780, H = 300;
  const margin = { top: 24, right: 52, bottom: 44, left: 58 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const fullMaxYear = fullLine[fullLine.length - 1].year;
  const initMaxYear = lineData[lineData.length - 1].year;
  const fullMinVal  = d3.min(fullLine, d => d.value);

  // Two x scales: one for just the episode window, one for full timeline
  const xInit = d3.scaleLinear().domain([startYear, initMaxYear]).range([0, w]);
  const xFull = d3.scaleLinear().domain([startYear, fullMaxYear]).range([0, w]);
  const y     = d3.scaleLinear().domain([Math.min(45, fullMinVal - 3), 105]).range([h, 0]);

  const areaGen = scale => d3.area().x(d => scale(d.year)).y0(h).y1(d => y(d.value)).curve(d3.curveMonotoneX);
  const lineGen = scale => d3.line().x(d => scale(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX);

  d3.select(el).selectAll("*").remove();

  const svg = d3.select(el).append("svg").attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g   = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // Clip so the extension line can't peek out before the animation
  svg.append("defs").append("clipPath").attr("id", "inflation-clip")
    .append("rect").attr("id", "inflation-clip-rect")
    .attr("x", 0).attr("y", -10).attr("width", expanded ? w : 0).attr("height", h + 20);

  // Episode highlight band (uses current active scale)
  const activeX = expanded ? xFull : xInit;
  const epEnd   = Math.min(years.end + 0.9, initMaxYear);
  g.append("rect")
    .attr("class", "ep-band")
    .attr("x", activeX(years.start)).attr("y", 0)
    .attr("width", Math.max(4, activeX(epEnd) - activeX(years.start))).attr("height", h)
    .attr("fill", "#0b6f45").attr("opacity", 0.07);
  g.append("text").attr("class", "ep-label")
    .attr("x", activeX(years.start) + 5).attr("y", 14)
    .attr("fill", "#0b6f45").attr("font-size", 10).attr("font-weight", 700).text(state.episode);

  // $100 baseline
  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);
  g.append("text").attr("x", 4).attr("y", y(100) - 7)
    .attr("fill", "#bbb").attr("font-size", 11).text(`$100 in ${startYear}`);

  // ── EPISODE portion (area + line) ──
  const epArea = g.append("path").attr("class", "ep-area")
    .datum(lineData).attr("fill", "#fff3cd").attr("opacity", 0.5)
    .attr("d", areaGen(activeX));
  const epLine = g.append("path").attr("class", "ep-line")
    .datum(lineData).attr("fill", "none")
    .attr("stroke", "#e6a817").attr("stroke-width", 2.5)
    .attr("d", lineGen(activeX));

  // Animate the initial draw
  if (!expanded) {
    const len = epLine.node().getTotalLength();
    epLine.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(1400).ease(d3.easeQuadInOut).attr("stroke-dashoffset", 0);
  }

  // ── EXTENSION portion (area + line beyond episode) — clipped, hidden until click ──
  const extData = fullLine.filter(d => d.year >= initMaxYear);
  const extArea = g.append("path").attr("class", "ext-area")
    .datum(extData).attr("fill", "#fff3cd").attr("opacity", 0.5)
    .attr("clip-path", "url(#inflation-clip)")
    .attr("d", areaGen(expanded ? xFull : xInit));
  const extLine = g.append("path").attr("class", "ext-line")
    .datum(extData).attr("fill", "none")
    .attr("stroke", "#e6a817").attr("stroke-width", 2.5)
    .attr("clip-path", "url(#inflation-clip)")
    .attr("d", lineGen(expanded ? xFull : xInit));

  // End dot + label
  const currentLast = expanded ? fullLine[fullLine.length - 1] : lineData[lineData.length - 1];
  const endDot = g.append("circle").attr("r", 4).attr("fill", "#c0392b")
    .attr("cx", activeX(currentLast.year)).attr("cy", y(currentLast.value));
  const endLabel = g.append("text")
    .attr("x", activeX(currentLast.year) + 7).attr("y", y(currentLast.value) + 4)
    .attr("fill", "#c0392b").attr("font-size", 13).attr("font-weight", 700)
    .text(`$${currentLast.value}`);

  // Axes
  const xAxisG = g.append("g").attr("transform", `translate(0,${h})`);
  xAxisG.call(d3.axisBottom(activeX).tickFormat(d3.format("d")).ticks(6));
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`));
  g.append("text").attr("class", "axis-label").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -44).attr("text-anchor", "middle")
    .text("Purchasing power of original $100");

  // Hover tooltip
  const tooltip  = d3.select("#tooltip");
  const hoverDot = g.append("circle").attr("r", 5).attr("fill", "#e6a817")
    .attr("stroke", "white").attr("stroke-width", 2).style("opacity", 0);
  const bisect   = d3.bisector(d => d.year).left;

  g.append("rect").attr("width", w).attr("height", h)
    .attr("fill", "none").attr("pointer-events", "all")
    .on("mousemove", function(event) {
      const scale = inflationExpanded ? xFull : xInit;
      const data  = inflationExpanded ? fullLine : lineData;
      const [mx]  = d3.pointer(event);
      const yr    = scale.invert(mx);
      const i     = Math.min(bisect(data, yr), data.length - 1);
      const d     = data[i];
      hoverDot.attr("cx", scale(d.year)).attr("cy", y(d.value)).style("opacity", 1);
      tooltip.style("opacity", 1)
        .style("left", (event.clientX + 14) + "px").style("top", (event.clientY - 48) + "px")
        .html(`<b>${d.year}</b><br/>$100 from ${startYear}<br/>is worth <b>$${d.value}</b>`);
    })
    .on("mouseleave", () => { hoverDot.style("opacity", 0); tooltip.style("opacity", 0); });

  // ── CLICK: entire container, rescale x and reveal extension ──
  if (!expanded) {
    const container = el.closest(".chart-container") || el;
    container.style.cursor = "pointer";

    const handleClick = () => {
      inflationExpanded = true;
      container.style.cursor = "default";
      container.removeEventListener("click", handleClick);

      const hint = $("inflation-hint");
      if (hint) hint.style.display = "none";

      const DURATION = 4500;
      const ease     = d3.easeLinear;
      const lastFull = fullLine[fullLine.length - 1];

      // 1. Rescale episode portion to compressed xFull positions
      epArea.transition().duration(DURATION).ease(ease).attr("d", areaGen(xFull));
      epLine.transition().duration(DURATION).ease(ease).attr("d", lineGen(xFull));

      // 2. Rescale extension paths to xFull too
      extArea.transition().duration(DURATION).ease(ease).attr("d", areaGen(xFull));
      extLine.transition().duration(DURATION).ease(ease).attr("d", lineGen(xFull));

      // 3. Expand clip to reveal the extension as xFull takes hold
      d3.select("#inflation-clip-rect")
        .transition().duration(DURATION).ease(ease).attr("width", w);

      // 4. Rescale x axis
      xAxisG.transition().duration(DURATION).ease(ease)
        .call(d3.axisBottom(xFull).tickFormat(d3.format("d")).ticks(8));

      // 5. Move episode band + label to compressed position
      g.select(".ep-band")
        .transition().duration(DURATION).ease(ease)
        .attr("x", xFull(years.start))
        .attr("width", Math.max(4, xFull(epEnd) - xFull(years.start)));
      g.select(".ep-label")
        .transition().duration(DURATION).ease(ease)
        .attr("x", xFull(years.start) + 5);

      // 6. Dot sits exactly at the clip boundary pixel, y read from the actual line path
      const bisectYr   = d3.bisector(d => d.year).left;
      const initClipPx = xFull(initMaxYear);
      const lineNode   = extLine.node();
      const epLineNode = epLine.node();
      d3.timer(elapsed => {
        const t      = Math.min(elapsed / DURATION, 1);
        const clipPx = initClipPx + t * (w - initClipPx);
        // Sample y directly from the SVG path at this x pixel
        let cy;
        try {
          // Walk the path to find the y at clipPx
          const totalLen = lineNode.getTotalLength();
          let lo = 0, hi = totalLen, pt;
          for (let iter = 0; iter < 24; iter++) {
            const mid = (lo + hi) / 2;
            pt = lineNode.getPointAtLength(mid);
            if (pt.x < clipPx) lo = mid; else hi = mid;
          }
          cy = lineNode.getPointAtLength((lo + hi) / 2).y;
        } catch(e) {
          // fallback: use xFull invert + y scale
          const visYear = xFull.invert(clipPx);
          const i = Math.min(bisectYr(fullLine, visYear), fullLine.length - 1);
          cy = y(fullLine[i].value);
        }
        // label: invert y to get value
        const visYear = xFull.invert(clipPx);
        const i = Math.min(bisectYr(fullLine, visYear), fullLine.length - 1);
        const val = fullLine[i].value;
        endDot.attr("cx", clipPx).attr("cy", cy).style("opacity", 1);
        endLabel.attr("x", clipPx + 7).attr("y", cy + 4)
          .text(`$${val}`).style("opacity", 1);
        if (t >= 1) return true;
      });

      updateInflationBlurbToday(startYear);
    };
    container.addEventListener("click", handleClick);
  }
}

function updateInflationBlurbToday(startYear) {
  const endVal = realValueAt(startYear, 2025);
  const loss = (100 - parseFloat(endVal)).toFixed(2);
  const el = $("inflation-blurb");
  if (!el) return;
  el.innerHTML = `Starting in <span class="highlight-pill">${startYear}</span>,
    that $100 is worth only <span class="highlight-pill highlight-red">$${endVal}</span> in 2025
    — a loss of <b>$${loss}</b> in real purchasing power. Every year, inflation silently erodes what cash is worth.`;
}

// ── SLIDE 2: MAIN $100 CHART ──────────────────────────────────────────────────
function drawMainChart() {
  const filtered = crisisData.filter(d => d.episode === state.episode && d.asset_name === state.asset).sort((a,b) => a.date - b.date);
  const spy = crisisData.filter(d => d.episode === state.episode && d.asset_name === "S&P 500").sort((a,b) => a.date - b.date);
  const meta = episodeMeta.find(d => d.episode === state.episode);
  $("slide-2-title").textContent = `$100 in ${state.asset} during the ${state.episode}`;

  const el = $("main-chart");
  d3.select(el).selectAll("*").remove();

  if (!filtered.length) {
    el.innerHTML = `<p style="padding:60px;text-align:center;color:#aaa">${state.asset} data isn't available for the ${state.episode} period.</p>`;
    return;
  }

  const W = el.clientWidth || 780, H = 340;
  const margin = { top: 24, right: 90, bottom: 48, left: 58 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const all = [...filtered, ...spy];
  const x = d3.scaleTime().domain(d3.extent(all, d => d.date)).range([0, w]);
  const vals = all.map(d => d.indexed_100);
  const y = d3.scaleLinear()
    .domain([Math.min(d3.min(vals) * 0.94, 82), Math.max(d3.max(vals) * 1.06, 118)]).nice()
    .range([h, 0]);

  const svg = d3.select(el).append("svg").attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#f0f0f0"); });
  g.append("line").attr("x1",0).attr("x2",w).attr("y1",y(100)).attr("y2",y(100))
    .attr("stroke","#ddd").attr("stroke-dasharray","5,4").attr("stroke-width",1.5);
  g.append("text").attr("x", w + 4).attr("y", y(100) + 4).attr("fill","#ccc").attr("font-size",11).text("$100");

  const lineGen = d3.line().x(d => x(d.date)).y(d => y(d.indexed_100)).curve(d3.curveMonotoneX);
  const info = ASSET_INFO[state.asset];
  const lineColor = info?.group === "New money" ? "#4a90d9" : info?.group === "Old money" ? "#e6a817" : "#888";

  // SPY line
  if (spy.length) {
    const spyPath = g.append("path").datum(spy).attr("fill","none").attr("stroke","#bbb")
      .attr("stroke-width", 2).attr("stroke-dasharray","6 3").attr("d", lineGen);
    animatePath(spyPath, 1000);
    const spyLast = spy[spy.length - 1];
    g.append("text").attr("x", x(spyLast.date)+7).attr("y", y(spyLast.indexed_100)+4)
      .attr("fill","#bbb").attr("font-size",11).attr("font-weight",600).text(`SPY $${Math.round(spyLast.indexed_100)}`);
  }

  // Selected asset line
  const assetPath = g.append("path").datum(filtered).attr("fill","none").attr("stroke",lineColor)
    .attr("stroke-width", 3).attr("d", lineGen);
  animatePath(assetPath, 1400);
  const last = filtered[filtered.length - 1];
  g.append("text").attr("x", x(last.date)+8).attr("y", y(last.indexed_100)+4)
    .attr("fill", last.indexed_100 >= 100 ? "#2a9d5c" : "#d9534f")
    .attr("font-size", 14).attr("font-weight", 800).text(`$${last.indexed_100.toFixed(0)}`);

  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6));
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}`));
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-44).attr("text-anchor","middle").text("Value of $100 invested");

  // Hover tooltip (both lines)
  const tooltip = d3.select("#tooltip");
  const dot = g.append("circle").attr("r",5).attr("fill",lineColor).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const bisect = d3.bisector(d => d.date).left;
  g.append("rect").attr("width",w).attr("height",h).attr("fill","none").attr("pointer-events","all")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const i = Math.min(bisect(filtered, date, 1), filtered.length - 1);
      const d = filtered[i];
      const si = spy.length ? Math.min(bisect(spy, date, 1), spy.length - 1) : -1;
      const sd = si >= 0 ? spy[si] : null;
      dot.attr("cx", x(d.date)).attr("cy", y(d.indexed_100)).style("opacity", 1);
      tooltip.style("opacity",1)
        .style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${state.asset}</b><br/>${d.date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}<br/>$100 → <b>$${d.indexed_100.toFixed(2)}</b>${sd ? `<br/><span style="color:#bbb">SPY: $${sd.indexed_100.toFixed(2)}</span>` : ""}`);
    })
    .on("mouseleave", () => { dot.style("opacity",0); tooltip.style("opacity",0); });
}

// ── SLIDE 2: BAR CHART ────────────────────────────────────────────────────────
function drawBarChart() {
  const data = summaryData.filter(d => d.episode === state.episode).sort((a,b) => a.total_return_pct - b.total_return_pct);
  const el = $("bar-chart");
  d3.select(el).selectAll("*").remove();
  if (!data.length) return;

  const W = el.clientWidth || 780, H = 340;
  const margin = { top: 10, right: 64, bottom: 36, left: 148 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const x = d3.scaleLinear().domain(d3.extent([...data.map(d => d.total_return_pct), 0])).nice().range([0, w]);
  const y = d3.scaleBand().domain(data.map(d => d.asset_name)).range([0, h]).padding(0.22);

  const svg = d3.select(el).append("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  g.append("line").attr("x1",x(0)).attr("x2",x(0)).attr("y1",0).attr("y2",h).attr("stroke","#ddd");
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%"))
    .call(gx => gx.select(".domain").remove());

  const tooltip = d3.select("#tooltip");
  const bars = g.selectAll(".bar").data(data).join("rect").attr("class","bar")
    .attr("x", d => Math.min(x(0), x(d.total_return_pct)))
    .attr("y", d => y(d.asset_name))
    .attr("height", y.bandwidth())
    .attr("width", d => Math.abs(x(d.total_return_pct) - x(0)))
    .attr("fill", d => d.total_return_pct >= 0 ? "#2a9d5c" : "#d9534f")
    .attr("opacity", d => d.asset_name === state.asset ? 1 : 0.6)
    .attr("rx", 2)
    .on("mousemove", (event, d) => {
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${d.asset_name}</b><br/>Return: <b>${fmtPct(d.total_return_pct)}</b><br/>$100 → <b>${fmtMoney(d.end_value)}</b><br/>Worst drop: ${fmtPct(d.max_drawdown)}`);
    })
    .on("mouseleave", () => tooltip.style("opacity",0));

  // Animate in
  bars.attr("width", 0).transition().duration(900).delay((d,i) => i * 45)
    .attr("x", d => Math.min(x(0), x(d.total_return_pct)))
    .attr("width", d => Math.abs(x(d.total_return_pct) - x(0)));

  g.selectAll(".bar-label").data(data).join("text").attr("class","bar-label")
    .attr("x",-6).attr("y", d => y(d.asset_name) + y.bandwidth()/2 + 4)
    .attr("text-anchor","end")
    .attr("fill", d => d.asset_name === state.asset ? "#1a1a1a" : "#999")
    .attr("font-weight", d => d.asset_name === state.asset ? "700" : "400")
    .text(d => d.asset_name);

  g.selectAll(".bar-value").data(data).join("text").attr("class","bar-value")
    .attr("x", d => d.total_return_pct >= 0 ? x(d.total_return_pct)+4 : x(d.total_return_pct)-4)
    .attr("y", d => y(d.asset_name) + y.bandwidth()/2 + 4)
    .attr("text-anchor", d => d.total_return_pct >= 0 ? "start" : "end")
    .attr("fill", d => d.total_return_pct >= 0 ? "#2a9d5c" : "#d9534f")
    .attr("font-size",11).attr("font-weight",600)
    .text(d => fmtPct(d.total_return_pct));
}

// ── SLIDE 3: ASSET INFO PANEL ─────────────────────────────────────────────────
function drawAssetInfoPanel() {
  const panel = $("asset-info-panel");
  const asset = state.asset, episode = state.episode;
  const info = ASSET_INFO[asset];
  const takeaway = EPISODE_TAKEAWAYS[episode]?.[asset];
  const row = summaryData.find(d => d.episode === episode && d.asset_name === asset);
  const rankRows = summaryData.filter(d => d.episode === episode).sort((a,b) => b.total_return_pct - a.total_return_pct);
  const rank = rankRows.findIndex(d => d.asset_name === asset) + 1;
  const epCtx = EPISODE_CONTEXT[episode] || {};
  const metaStory = episodeMeta.find(d => d.episode === episode)?.story || "";
  const isNew = info?.group === "New money";
  const groupExplain = GROUP_EXPLAINER[info?.group] || "";

  const statsHTML = row ? `
    <div class="asset-stats-row">
      <div class="asset-stat">
        <div class="asset-stat-label">End value</div>
        <div class="asset-stat-val ${row.end_value >= 100 ? "pos" : "neg"}">${fmtMoney(row.end_value)}</div>
        <div class="asset-stat-hint">$100 became this</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Total return</div>
        <div class="asset-stat-val ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}</div>
        <div class="asset-stat-hint">% gain or loss</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Worst drawdown</div>
        <div class="asset-stat-val neg">${fmtPct(row.max_drawdown)}</div>
        <div class="asset-stat-hint">biggest fall</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Rank</div>
        <div class="asset-stat-val">${rank}/${rankRows.length}</div>
        <div class="asset-stat-hint">within episode</div>
      </div>
    </div>` : "";

  panel.innerHTML = `
    <div class="info-card">
      <span class="info-tag ${isNew ? "tag-new-money" : "tag-old-money"}">${info?.group || "Asset"}</span>
      <div class="asset-name-large">${getTicker(asset)} ${asset}</div>
      <p>${info?.description || ""}</p>
      <p class="takeaway">💡 ${groupExplain}</p>
      ${statsHTML}
    </div>
    <div class="info-card">
      <span class="info-tag">${episode}</span>
      <p><b>${epCtx.dates || ""}</b> ${metaStory}</p>
      ${takeaway ? `<p class="takeaway">📌 ${takeaway}</p>` : ""}
      ${epCtx.keyFact ? `<p class="takeaway" style="margin-top:10px"><b>Key insight:</b> ${epCtx.keyFact}</p>` : ""}
    </div>`;
}

// ── SLIDE 3: OLD VS NEW CHART ─────────────────────────────────────────────────
function drawOldVsNewChart() {
  const ep = state.episode;
  const rows = crisisData.filter(d => d.episode === ep && (d.group === "Old money" || d.group === "New money"));
  const el = $("old-vs-new-chart");
  d3.select(el).selectAll("*").remove();
  if (!rows.length) return;

  const days = [...new Set(rows.map(d => d.episode_day))].sort((a,b) => a - b);
  const oldMap = new Map(), newMap = new Map();
  days.forEach(day => {
    const dr = rows.filter(d => d.episode_day === day);
    const or = dr.filter(d => d.group === "Old money");
    const nr = dr.filter(d => d.group === "New money");
    if (or.length) oldMap.set(day, d3.mean(or, d => d.indexed_100));
    if (nr.length) newMap.set(day, d3.mean(nr, d => d.indexed_100));
  });
  const oldSeries = days.map(d => ({ day: d, val: oldMap.get(d) })).filter(d => d.val != null);
  const newSeries = days.map(d => ({ day: d, val: newMap.get(d) })).filter(d => d.val != null);
  const allVals = [...oldSeries, ...newSeries].map(d => d.val);
  if (!allVals.length) return;

  const totalW = el.clientWidth || 780, H = 260;
  const margin = { top: 14, right: 60, bottom: 40, left: 56 };
  const W = totalW - margin.left - margin.right;
  const [yMin, yMax] = d3.extent(allVals);
  const yPad = (yMax - yMin) * 0.1;
  const xScale = d3.scaleLinear().domain([0, d3.max(days)]).range([0, W]);
  const yScale = d3.scaleLinear().domain([Math.min(yMin - yPad, 94), yMax + yPad]).nice().range([H, 0]);

  const svg = d3.select(el).append("svg").attr("width","100%").attr("viewBox",`0 0 ${totalW} ${H + margin.top + margin.bottom}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(yScale).ticks(5).tickSize(-W).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke","#f4f4f4"); });
  g.append("line").attr("x1",0).attr("x2",W).attr("y1",yScale(100)).attr("y2",yScale(100))
    .attr("stroke","#ddd").attr("stroke-dasharray","3 3");
  g.append("g").attr("transform",`translate(0,${H})`).call(d3.axisBottom(xScale).ticks(6).tickFormat(d => `Day ${d}`));
  g.append("g").call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d3.format(".0f")(d)}`));

  const makeLine = d3.line().x(d => xScale(d.day)).y(d => yScale(d.val)).curve(d3.curveCatmullRom.alpha(0.5));

  const oldPath = g.append("path").datum(oldSeries).attr("fill","none").attr("stroke","#e6a817").attr("stroke-width",2.5).attr("d",makeLine);
  animatePath(oldPath, 1200);
  const newPath = g.append("path").datum(newSeries).attr("fill","none").attr("stroke","#4a90d9").attr("stroke-width",2.5).attr("stroke-dasharray","7 4").attr("d",makeLine);
  animatePath(newPath, 1200);

  [{ s: oldSeries, c: "#e6a817", label: "Old money" }, { s: newSeries, c: "#4a90d9", label: "New money" }].forEach(({ s, c, label }) => {
    if (!s.length) return;
    const last = s[s.length - 1];
    g.append("text").attr("x", xScale(last.day)+5).attr("y", yScale(last.val)+4)
      .attr("fill", c).attr("font-size", 11).attr("font-weight", 700).text(`$${last.val.toFixed(0)}`);
  });

  // Hover tooltip
  const tooltip = d3.select("#tooltip");
  const crosshair = g.append("line").attr("y1",0).attr("y2",H).attr("stroke","#ddd").attr("stroke-dasharray","3 3").style("opacity",0);
  const dotOld = g.append("circle").attr("r",4).attr("fill","#e6a817").attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const dotNew = g.append("circle").attr("r",4).attr("fill","#4a90d9").attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const bisect = d3.bisector(d => d.day).left;

  g.append("rect").attr("width",W).attr("height",H).attr("fill","transparent")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const day = Math.round(xScale.invert(mx));
      const oi = Math.min(bisect(oldSeries, day), oldSeries.length - 1);
      const ni = Math.min(bisect(newSeries, day), newSeries.length - 1);
      const od = oldSeries[oi], nd = newSeries[ni];
      crosshair.attr("x1",mx).attr("x2",mx).style("opacity",1);
      if (od) { dotOld.attr("cx",xScale(od.day)).attr("cy",yScale(od.val)).style("opacity",1); }
      if (nd) { dotNew.attr("cx",xScale(nd.day)).attr("cy",yScale(nd.val)).style("opacity",1); }
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>Day ${day}</b><br/><span style="color:#e6a817">● Old money</span> ${od ? "$"+od.val.toFixed(1) : "—"}<br/><span style="color:#4a90d9">● New money</span> ${nd ? "$"+nd.val.toFixed(1) : "—"}`);
    })
    .on("mouseleave", () => { crosshair.style("opacity",0); dotOld.style("opacity",0); dotNew.style("opacity",0); tooltip.style("opacity",0); });
}

// ── SLIDE 4: GROUP SUMMARY ────────────────────────────────────────────────────
function drawGroupSummary() {
  $("slide-4-title").textContent = `Old money vs new money: ${state.episode}`;
  $("slide-4-desc").textContent = "Every asset grouped by type. See which camp held up and which didn't.";
  const container = $("group-summary");
  container.innerHTML = "";
  const episodeRows = summaryData.filter(d => d.episode === state.episode);
  ["Old money", "New money"].forEach(groupName => {
    const rows = episodeRows.filter(d => d.group === groupName).sort((a,b) => b.total_return_pct - a.total_return_pct);
    if (!rows.length) return;
    const avg = d3.mean(rows, d => d.total_return_pct);
    const card = document.createElement("div");
    card.className = `group-card ${groupName === "New money" ? "new-money-card" : "old-money-card"}`;
    card.innerHTML = `
      <div class="group-card-label">${groupName}</div>
      <div class="group-card-title">Avg: <span class="${avg >= 0 ? "pos" : "neg"}">${fmtPct(avg)}</span></div>
      <ul class="group-asset-list">
        ${rows.map(d => `<li class="group-asset-item"><span>${d.asset_name}</span><b class="${d.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(d.total_return_pct)}</b></li>`).join("")}
      </ul>`;
    container.appendChild(card);
  });
}

// ── SLIDE 5: QUIZ ─────────────────────────────────────────────────────────────
function buildQuizOptions() {
  const assets = [...new Set(summaryData.map(d => d.asset_name))].sort();
  const container = $("slide5-options");
  if (!container) return;
  container.innerHTML = "";
  assets.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.addEventListener("click", function() {
      state.selectedQuiz = name;
      container.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
    });
    container.appendChild(btn);
  });
  const revealBtn = $("reveal-btn");
  if (revealBtn) revealBtn.onclick = revealQuiz;
}

function consistencyRanking() {
  const byAsset = d3.group(summaryData, d => d.asset_name);
  return Array.from(byAsset, ([assetName, vals]) => {
    const positive = vals.filter(v => v.total_return_pct > 0).length;
    const group = vals[0].group;
    return {
      assetName, group,
      count: vals.length, positive,
      positiveShare: positive / vals.length,
      avgReturn: d3.mean(vals, d => d.total_return_pct),
    };
  }).sort((a,b) => d3.descending(a.positiveShare, b.positiveShare));
}

function revealQuiz() {
  const ranked = consistencyRanking();
  const winner = ranked[0];
  const picked = state.selectedQuiz ? ranked.find(d => d.assetName === state.selectedQuiz) : null;
  const pickedRank = picked ? ranked.indexOf(picked) + 1 : null;
  const result = $("quiz-result");
  result.classList.add("visible");
  let pickedMsg = "";
  if (picked) {
    pickedMsg = picked.assetName === winner.assetName
      ? "✅ You got it. "
      : `You picked <b>${picked.assetName}</b> (ranked #${pickedRank} for consistency). `;
  }
  result.innerHTML = `
    <h3>🏅 ${winner.assetName} held up most consistently across all episodes.</h3>
    <p>${pickedMsg}${winner.assetName} finished positive in <b>${winner.positive} out of ${winner.count}</b> episodes.
    Bitcoin had explosive returns — but consistency across every type of crisis is a different game.</p>`;
  drawQuizRanking(ranked, picked?.assetName);
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function drawQuizRanking(data, highlightName) {
  const container = $("quiz-ranking");
  container.innerHTML = "";
  const top = data.slice(0, 11);
  const W = Math.min(container.clientWidth || 720, 720), H = 320;
  const margin = { top: 16, right: 120, bottom: 30, left: 148 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;
  const svg = d3.select("#quiz-ranking").append("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
  const x = d3.scaleLinear().domain([0,1]).range([0,w]);
  const y = d3.scaleBand().domain(top.map(d => d.assetName)).range([0,h]).padding(0.28);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(4).tickFormat(d => `${Math.round(d*100)}%`)).call(gx => gx.select(".domain").remove());
  g.selectAll("rect").data(top).join("rect")
    .attr("x",0).attr("y", d => y(d.assetName)).attr("height", y.bandwidth()).attr("width",0)
    .attr("fill", d => d.group === "New money" ? "#4a90d9" : "#e6a817")
    .attr("opacity", d => d.assetName === highlightName ? 1 : 0.6).attr("rx",2)
    .transition().duration(800).delay((_,i) => i*60).ease(d3.easeQuadOut)
    .attr("width", d => x(d.positiveShare));
  g.selectAll(".bar-label").data(top).join("text").attr("class","bar-label")
    .attr("x",-6).attr("y", d => y(d.assetName)+y.bandwidth()/2+4).attr("text-anchor","end")
    .attr("font-weight", d => d.assetName === highlightName ? "700" : "400")
    .attr("fill", d => d.assetName === highlightName ? "#1a1a1a" : "#999")
    .text(d => d.assetName);
  g.selectAll(".bar-value").data(top).join("text").attr("class","bar-value")
    .attr("x", d => x(d.positiveShare)+6).attr("y", d => y(d.assetName)+y.bandwidth()/2+4)
    .attr("opacity",0).text(d => `${d.positive}/${d.count} positive`)
    .transition().delay((_,i) => 400+i*60).duration(300).attr("opacity",1);
}

// ── LONG VIEW SECTION ─────────────────────────────────────────────────────────
function renderLongViewSection() {
  renderCheckboxes();
  drawLongChart();
}

function renderCheckboxes() {
  const allAssets = ["S&P 500", ...Object.keys(ASSET_INFO).filter(a => a !== "S&P 500")];
  // Always keep S&P 500 + selected asset checked
  checkedAssets.add("S&P 500");
  if (state.asset) checkedAssets.add(state.asset);

  const container = $("asset-checkboxes");
  if (!container) return;
  container.innerHTML = "";

  allAssets.forEach(name => {
    const ticker = ASSET_INFO[name]?.ticker || name;
    const isLocked = name === "S&P 500";
    const label = document.createElement("label");
    label.className = `check-chip${isLocked ? " locked" : ""}`;
    label.innerHTML = `<input type="checkbox" value="${name}" ${checkedAssets.has(name) ? "checked" : ""} ${isLocked ? "disabled" : ""}/> <span>${ticker} ${name}</span>`;
    label.querySelector("input").addEventListener("change", function() {
      if (name === "S&P 500") return;
      this.checked ? checkedAssets.add(name) : checkedAssets.delete(name);
      checkedAssets.add("S&P 500");
      drawLongChart();
    });
    container.appendChild(label);
  });
}

function longSeriesForAsset(assetName, startDate) {
  const ticker = ASSET_INFO[assetName]?.ticker;
  if (!ticker || !wideData.length) return [];
  const rows = wideData
    .filter(d => d.date >= startDate && Number.isFinite(d[ticker]))
    .sort((a, b) => a.date - b.date);
  if (!rows.length) return [];
  const first = rows[0][ticker];
  return rows.map(d => ({ date: d.date, value: 100 * d[ticker] / first, asset: assetName, ticker }));
}

function drawLongChart() {
  const el = $("long-chart");
  if (!el) return;
  d3.select(el).selectAll("*").remove();

  const epMeta = episodeMeta.find(d => d.episode === state.episode);
  if (!epMeta) return;
  const startDate = new Date(epMeta.start);

  const titleEl = $("long-chart-title");
  if (titleEl) titleEl.textContent = `From ${state.episode} onward`;

  // Build series for each checked asset
  const series = [...checkedAssets]
    .map(name => ({ name, values: longSeriesForAsset(name, startDate) }))
    .filter(s => s.values.length > 0);

  if (!series.length) {
    el.innerHTML = `<p style="padding:60px;text-align:center;color:#aaa">No long-term data available. Make sure asset_prices_wide.csv is in the data folder.</p>`;
    return;
  }

  const all = series.flatMap(s => s.values);
  const W = el.clientWidth || 980, H = 455;
  const margin = { top: 28, right: 110, bottom: 50, left: 68 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const x = d3.scaleTime().domain([startDate, d3.max(all, d => d.date)]).range([0, w]);
  const maxVal = d3.max(all, d => d.value);
  const minVal = d3.min(all, d => d.value);
  const y = useLogScale && minVal > 0
    ? d3.scaleLog().domain([Math.max(10, minVal * 0.8), maxVal * 1.12]).range([h, 0])
    : d3.scaleLinear().domain([Math.max(0, minVal * 0.86), maxVal * 1.12]).nice().range([h, 0]);

  const svg = d3.select(el).append("svg").attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // Grid lines
  g.append("g").call(d3.axisLeft(y).ticks(6).tickSize(-w).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#f0f0f0"); });

  // Crisis window bands
  episodeMeta.forEach(ep => {
    const s = new Date(ep.start), e = new Date(ep.end);
    if (e < startDate) return;
    const x0 = Math.max(0, x(s)), x1 = Math.min(w, x(e));
    if (x1 > x0) {
      g.append("rect").attr("x", x0).attr("y", 0).attr("width", x1 - x0).attr("height", h)
        .attr("fill", "#0b6f45").attr("opacity", 0.08);
      g.append("text").attr("x", x0 + 4).attr("y", 13)
        .attr("fill", "#0b6f45").attr("font-size", 9).attr("font-weight", 700)
        .text(ep.episode.replace("Global Financial Crisis", "2008 Crisis").replace("Regional Banking Crisis", "Banking Crisis"));
    }
  });

  // $100 baseline
  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);

  const lineGen = d3.line()
    .defined(d => Number.isFinite(d.value) && d.value > 0)
    .x(d => x(d.date)).y(d => y(d.value)).curve(d3.curveMonotoneX);

  // Consistent per-asset colors (same asset = same color every time)
  const ASSET_COLORS = {
    "S&P 500":         "#888",
    "Gold":            "#e6a817",
    "Financials":      "#e67e22",
    "Regional Banks":  "#c0392b",
    "Energy":          "#f39c12",
    "Utilities":       "#7f8c8d",
    "Long Bonds":      "#2980b9",
    "Nasdaq 100":      "#4a90d9",
    "Technology":      "#1abc9c",
    "Semiconductors":  "#8e44ad",
    "Innovation Stocks":"#d9534f",
    "Bitcoin":         "#2a9d5c",
  };

  series.forEach(s => {
    const isSpy = s.name === "S&P 500";
    const isSelected = s.name === state.asset;
    const color = isSelected && !isSpy ? "#2a9d5c" : (ASSET_COLORS[s.name] || "#999");

    const path = g.append("path").datum(s.values)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", isSpy ? 2 : isSelected ? 3.2 : 2)
      .attr("stroke-dasharray", isSpy ? "6 3" : "none")
      .attr("opacity", isSpy ? 0.8 : 1)
      .attr("d", lineGen);

    // Animate
    const len = path.node().getTotalLength();
    path.attr("stroke-dasharray", isSpy ? len : len)
      .attr("stroke-dashoffset", len)
      .transition().duration(isSpy ? 1200 : 1800).delay(isSpy ? 0 : 200)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0)
      .on("end", () => { if (isSpy) path.attr("stroke-dasharray", "6 3"); });

    const last = s.values[s.values.length - 1];
    const ticker = ASSET_INFO[s.name]?.ticker || s.name;
    g.append("text").attr("x", x(last.date) + 6).attr("y", y(last.value) + 4)
      .attr("fill", color).attr("font-size", 11).attr("font-weight", 700)
      .text(`${ticker} ${fmtDollar(last.value)}`);
  });

  // Axes
  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(8))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d3.format(",.0f")(d)}`))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("text").attr("class", "axis-label").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -54).attr("text-anchor", "middle")
    .text("Indexed value from first available date");

  // Hover tooltip
  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1", 0).attr("y2", h)
    .attr("stroke", "#ddd").attr("stroke-dasharray", "3 3").style("opacity", 0);
  const bisect = d3.bisector(d => d.date).left;

  g.append("rect").attr("width", w).attr("height", h).attr("fill", "none").attr("pointer-events", "all")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      hoverLine.attr("x1", mx).attr("x2", mx).style("opacity", 1);
      let html = `<b>${date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}</b>`;
      series.forEach(s => {
        const i = Math.min(bisect(s.values, date, 1), s.values.length - 1);
        const d = s.values[i];
        if (d) html += `<br/>${s.name}: <b>${fmtDollar(d.value)}</b>`;
      });
      tooltip.style("opacity", 1)
        .style("left", (event.clientX + 14) + "px").style("top", (event.clientY - 48) + "px")
        .html(html);
    })
    .on("mouseleave", () => { hoverLine.style("opacity", 0); tooltip.style("opacity", 0); });
}

function continueToNextCrisis() {
  const idx = episodeMeta.findIndex(d => d.episode === state.episode);
  const next = episodeMeta[(idx + 1) % episodeMeta.length];
  state.episode = next.episode;
  const epDd = $("episode-dropdown");
  if (epDd) epDd.value = state.episode;
  ensureAssetAvailable();
  updateInflationBlurb();
  drawInflationChart();
  renderLongViewSection();
  renderTable();
  $("long-view-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── MARKET TABLE (removed from page; function kept as no-op to avoid errors) ──
function renderTable() {
  // Market sheet section removed — data now lives in "Know your assets" glossary cards
}

// ── GLOSSARY ──────────────────────────────────────────────────────────────────
function buildGlossaryCards() {
  const container = $("glossary-cards");
  if (!container) return;
  container.innerHTML = "";
  Object.entries(ASSET_INFO).forEach(([name, info]) => {
    const isNew = info.group === "New money";
    const card = document.createElement("div");
    card.className = `glossary-card-tile ${isNew ? "new-card" : "old-card"}`;
    card.dataset.group = isNew ? "new" : "old";
    card.innerHTML = `
      <div class="tile-badge ${isNew ? "new-badge" : "old-badge"}">${info.group.toUpperCase()}</div>
      <h3 class="tile-name">${name}</h3>
      <p class="tile-preview">${info.description.slice(0, 110)}…</p>
      <button class="tile-learn-btn" type="button">Learn more →</button>`;
    card.addEventListener("click", () => openGlossaryModal(name));
    container.appendChild(card);
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const f = this.dataset.filter;
      document.querySelectorAll(".glossary-card-tile").forEach(c => {
        c.style.display = (f === "all" || c.dataset.group === f) ? "" : "none";
      });
    });
  });
}

function openGlossaryModal(assetName) {
  const info = ASSET_INFO[assetName];
  const isNew = info.group === "New money";
  const explainer = GROUP_EXPLAINER[info.group] || "";
  const episodeListHTML = Object.keys(EPISODE_TAKEAWAYS).map(ep => {
    const takeaway = EPISODE_TAKEAWAYS[ep]?.[assetName];
    if (!takeaway) return "";
    const row = summaryData.find(d => d.episode === ep && d.asset_name === assetName);
    const retBadge = row
      ? `<span class="modal-ret-badge ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}</span>`
      : "";
    return `
      <li class="modal-episode-item">
        <div class="modal-episode-name"><span>${ep}</span>${retBadge}</div>
        <div class="modal-episode-takeaway">${takeaway}</div>
      </li>`;
  }).filter(Boolean).join("");

  $("modal-content").innerHTML = `
    <div class="modal-asset-name">${assetName}</div>
    <span class="modal-group-badge ${isNew ? "new-money" : "old-money"}">${info.group}</span>
    <p class="modal-description">${info.description}</p>
    <div class="modal-group-explainer">💡 ${explainer}</div>
    <p class="modal-description" style="margin-top:14px"><b>Example:</b> ${info.example}</p>
    <div class="modal-episodes-label">Performance across episodes</div>
    <ul class="modal-episode-list">${episodeListHTML}</ul>`;

  const overlay = $("glossary-modal");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

$("modal-close")?.addEventListener("click", closeGlossaryModal);
$("glossary-modal")?.addEventListener("click", e => { if (e.target === e.currentTarget) closeGlossaryModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeGlossaryModal(); });

function closeGlossaryModal() {
  $("glossary-modal").classList.remove("open");
  $("glossary-modal").setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

// ── PORTFOLIO BUILDER ─────────────────────────────────────────────────────────
const PB = { year: 2007, selected: new Set(), weights: {} };

function buildPortfolioBuilder() {
  const assets = [...new Set(crisisData.filter(d => d.asset_name !== "S&P 500").map(d => d.asset_name))].sort();
  const slider = $("pb-year-slider");
  const yearDisplay = $("pb-year-display");
  if (!slider) return;

  const initPct = ((PB.year - 2000) / 23 * 100).toFixed(1);
  slider.style.background = `linear-gradient(to right,#1a1a1a 0%,#1a1a1a ${initPct}%,#e0e0e0 ${initPct}%)`;

  slider.addEventListener("input", function() {
    PB.year = +this.value;
    yearDisplay.textContent = this.value;
    $("pb-best-year").textContent = this.value;
    const pct = ((this.value - 2000) / 23 * 100).toFixed(1);
    this.style.background = `linear-gradient(to right,#1a1a1a 0%,#1a1a1a ${pct}%,#e0e0e0 ${pct}%)`;
    renderPBChart();
    renderBestCombo();
  });

  // Tick marks
  const tickContainer = document.querySelector(".pb-year-ticks");
  if (tickContainer) {
    [2000,2005,2010,2015,2020,2023].forEach(y => {
      const tick = document.createElement("span");
      tick.textContent = y;
      tick.style.left = ((y - 2000) / 23 * 100) + "%";
      tickContainer.appendChild(tick);
    });
  }

  // Asset pills
  const pillContainer = $("pb-asset-pills");
  assets.forEach(name => {
    const info = ASSET_INFO[name];
    const isNew = info?.group === "New money";
    const pill = document.createElement("button");
    pill.className = `pb-pill ${isNew ? "pb-pill-new" : "pb-pill-old"}`;
    pill.textContent = name;
    pill.dataset.asset = name;
    pill.addEventListener("click", () => togglePBAsset(name));
    pillContainer.appendChild(pill);
  });
}

function togglePBAsset(name) {
  if (PB.selected.has(name)) { PB.selected.delete(name); delete PB.weights[name]; }
  else { PB.selected.add(name); }
  document.querySelectorAll(".pb-pill").forEach(p => p.classList.toggle("pb-pill-active", PB.selected.has(p.dataset.asset)));
  updatePBCount();
  rebuildWeightSliders();
  renderPBChart();
  renderBestCombo();
}

function updatePBCount() {
  const el = $("pb-asset-count");
  if (el) el.textContent = PB.selected.size === 0 ? "(none selected)" : `(${PB.selected.size} selected)`;
}

function rebuildWeightSliders() {
  const section = $("pb-weights-section");
  const slidersEl = $("pb-sliders");
  if (!section || !slidersEl) return;
  if (PB.selected.size === 0) { section.style.display = "none"; return; }
  section.style.display = "block";
  const assets = [...PB.selected];
  const n = assets.length;
  const even = Math.floor(100 / n);
  const remainder = 100 - even * n;
  PB.weights = {};
  assets.forEach((name, i) => { PB.weights[name] = even + (i < remainder ? 1 : 0); });
  slidersEl.innerHTML = "";
  assets.forEach(name => {
    const isNew = ASSET_INFO[name]?.group === "New money";
    const color = isNew ? "#4a90d9" : "#e6a817";
    const row = document.createElement("div");
    row.className = "pb-slider-row";
    row.innerHTML = `
      <div class="pb-slider-label"><span class="pb-slider-dot" style="background:${color}"></span><span>${name}</span></div>
      <input type="range" class="pb-weight-slider" data-asset="${name}" min="0" max="100" step="1" value="${PB.weights[name]}" />
      <span class="pb-weight-val" id="pbw-${name.replace(/[\s&]/g,'_')}">${PB.weights[name]}%</span>`;
    slidersEl.appendChild(row);
  });
  slidersEl.querySelectorAll(".pb-weight-slider").forEach(sl => {
    sl.addEventListener("input", function() {
      PB.weights[this.dataset.asset] = +this.value;
      updateTotalPct();
      renderPBChart();
    });
  });
  updateTotalPct();
}

function updateTotalPct() {
  const total = Object.values(PB.weights).reduce((s,v) => s+v, 0);
  const totalEl = $("pb-total-pct");
  const warnEl = $("pb-total-warn");
  if (!totalEl) return;
  totalEl.textContent = total + "%";
  totalEl.style.color = total === 100 ? "#2a9d5c" : "#d9534f";
  if (warnEl) warnEl.style.display = total !== 100 ? "inline" : "none";
  Object.entries(PB.weights).forEach(([name, w]) => {
    const el = $(`pbw-${name.replace(/[\s&]/g,"_")}`);
    if (el) el.textContent = w + "%";
  });
}

function getPortfolioTimeSeries(selectedAssets, weights, startYear) {
  const startDate = new Date(`${startYear}-01-01`);
  const dateSet = new Set();
  selectedAssets.forEach(name => crisisData.filter(d => d.asset_name === name && d.date >= startDate).forEach(d => dateSet.add(d.date.getTime())));
  const allDates = [...dateSet].sort((a,b) => a-b).map(t => new Date(t));
  if (!allDates.length) return [];
  const priceLookup = {};
  selectedAssets.forEach(name => {
    const rows = crisisData.filter(d => d.asset_name === name && d.date >= startDate).sort((a,b) => a.date - b.date);
    priceLookup[name] = new Map(rows.map(d => [d.date.getTime(), d.indexed_100]));
  });
  const totalWeight = Object.values(weights).reduce((s,v) => s+v, 0);
  if (totalWeight === 0) return [];
  return allDates.map(date => {
    let val = 0, covered = 0;
    selectedAssets.forEach(name => {
      const w = (weights[name] || 0) / totalWeight;
      const price = priceLookup[name].get(date.getTime());
      if (price !== undefined) { val += w * price; covered++; }
    });
    return covered > 0 ? { date, value: val } : null;
  }).filter(Boolean);
}

function getSPTimeSeries(startYear) {
  const startDate = new Date(`${startYear}-01-01`);
  return crisisData.filter(d => d.asset_name === "S&P 500" && d.date >= startDate)
    .sort((a,b) => a.date - b.date).map(d => ({ date: d.date, value: d.indexed_100 }));
}

function renderPBChart() {
  const chartArea = $("pb-chart-area");
  const chartEl = $("pb-line-chart");
  const legendEl = $("pb-legend");
  if (!chartArea || !chartEl) return;
  const selected = [...PB.selected];
  const total = Object.values(PB.weights).reduce((s,v) => s+v, 0);
  if (selected.length === 0 || total !== 100) { chartArea.style.display = "none"; return; }
  chartArea.style.display = "block";

  const portfolioSeries = getPortfolioTimeSeries(selected, PB.weights, PB.year);
  const spSeries = getSPTimeSeries(PB.year);
  if (!portfolioSeries.length) { chartEl.innerHTML = `<p style="color:#aaa;padding:40px;text-align:center">No data for this combination from ${PB.year}.</p>`; return; }
  chartEl.innerHTML = "";

  const W = chartEl.clientWidth || 760, H = 320;
  const margin = { top: 24, right: 80, bottom: 44, left: 58 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;
  const allDates = [...portfolioSeries.map(d => d.date), ...spSeries.map(d => d.date)];
  const allVals = [...portfolioSeries.map(d => d.value), ...spSeries.map(d => d.value)];
  const x = d3.scaleTime().domain(d3.extent(allDates)).range([0,w]);
  const y = d3.scaleLinear().domain([Math.min(d3.min(allVals)*0.92,75), d3.max(allVals)*1.08]).nice().range([h,0]);
  const svg = d3.select(chartEl).append("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
  g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat("")).call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke","#f4f4f4"); });
  g.append("line").attr("x1",0).attr("x2",w).attr("y1",y(100)).attr("y2",y(100)).attr("stroke","#e0e0e0").attr("stroke-dasharray","5,4").attr("stroke-width",1.5);
  g.append("text").attr("x",w+4).attr("y",y(100)+4).attr("fill","#ccc").attr("font-size",11).text("$100");
  const lineGen = d3.line().x(d => x(d.date)).y(d => y(d.value)).curve(d3.curveMonotoneX);
  if (spSeries.length) {
    const spPath = g.append("path").datum(spSeries).attr("fill","none").attr("stroke","#bbb").attr("stroke-width",1.8).attr("stroke-dasharray","6 3").attr("d",lineGen);
    const spLen = spPath.node().getTotalLength();
    spPath.attr("stroke-dasharray",spLen).attr("stroke-dashoffset",spLen).transition().duration(1000).ease(d3.easeQuadInOut).attr("stroke-dashoffset",0).on("end", () => spPath.attr("stroke-dasharray","6 3"));
    const spLast = spSeries[spSeries.length-1];
    g.append("text").attr("x",x(spLast.date)+6).attr("y",y(spLast.value)+4).attr("fill","#bbb").attr("font-size",11).attr("font-weight",600).text(`$${spLast.value.toFixed(0)}`);
  }
  const portPath = g.append("path").datum(portfolioSeries).attr("fill","none").attr("stroke","#4a90d9").attr("stroke-width",3).attr("d",lineGen);
  const portLen = portPath.node().getTotalLength();
  portPath.attr("stroke-dasharray",portLen).attr("stroke-dashoffset",portLen).transition().duration(1200).delay(200).ease(d3.easeQuadInOut).attr("stroke-dashoffset",0);
  const portLast = portfolioSeries[portfolioSeries.length-1];
  g.append("text").attr("x",x(portLast.date)+6).attr("y",y(portLast.value)+4).attr("fill",portLast.value>=100?"#2a9d5c":"#d9534f").attr("font-size",14).attr("font-weight",800).text(`$${portLast.value.toFixed(0)}`);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`)).call(gx => gx.select(".domain").attr("stroke","#eee"));

  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1",0).attr("y2",h).attr("stroke","#e0e0e0").attr("stroke-dasharray","3 3").style("opacity",0);
  const bisect = d3.bisector(d => d.date).left;
  g.append("rect").attr("width",w).attr("height",h).attr("fill","none").attr("pointer-events","all")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const pi = Math.min(bisect(portfolioSeries, date, 1), portfolioSeries.length-1);
      const si = spSeries.length ? Math.min(bisect(spSeries, date, 1), spSeries.length-1) : -1;
      const pd = portfolioSeries[pi];
      const sd = si >= 0 ? spSeries[si] : null;
      hoverLine.attr("x1",mx).attr("x2",mx).style("opacity",1);
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${pd.date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}</b><br/><span style="color:#4a90d9">● Your portfolio</span> <b>$${pd.value.toFixed(2)}</b>${sd ? `<br/><span style="color:#bbb">● S&P 500</span> $${sd.value.toFixed(2)}` : ""}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity",0); tooltip.style("opacity",0); });

  if (legendEl) legendEl.innerHTML = `<span class="pb-leg-item"><span class="pb-leg-swatch" style="background:#4a90d9"></span>Your portfolio</span><span class="pb-leg-item"><span class="pb-leg-swatch pb-leg-dashed"></span>S&amp;P 500</span>`;
}

function assetFinalReturn(assetName, startYear) {
  const startDate = new Date(`${startYear}-01-01`);
  const rows = crisisData.filter(d => d.asset_name === assetName && d.date >= startDate).sort((a,b) => a.date - b.date);
  if (!rows.length) return null;
  return rows[rows.length-1].indexed_100 / rows[0].indexed_100;
}
function weightedFinalValue(assets, weights, startYear) {
  let total = 0;
  for (let i = 0; i < assets.length; i++) {
    const r = assetFinalReturn(assets[i], startYear);
    if (r === null) return null;
    total += weights[i] * r;
  }
  return total * 100;
}
function optimizeWeightsWithMin(assets, startYear, MIN = 0.10, steps = 500) {
  const n = assets.length;
  const returns = assets.map(a => assetFinalReturn(a, startYear));
  if (returns.some(r => r === null)) return null;
  const budget = 1 - n * MIN;
  if (budget <= 0) return assets.map(() => 1 / n);
  const lr = 0.2;
  let logits = new Array(n).fill(0);
  for (let step = 0; step < steps; step++) {
    const maxL = Math.max(...logits);
    const exps = logits.map(l => Math.exp(l - maxL));
    const sumE = exps.reduce((a,b) => a+b, 0);
    const s = exps.map(e => e / sumE);
    const w = s.map(si => MIN + budget * si);
    const R = returns.reduce((acc, r, i) => acc + r * w[i], 0);
    const grad = returns.map((r, i) => budget * s[i] * (r - R));
    logits = logits.map((l, i) => l + lr * grad[i]);
  }
  const maxL = Math.max(...logits);
  const exps = logits.map(l => Math.exp(l - maxL));
  const sumE = exps.reduce((a,b) => a+b, 0);
  const s = exps.map(e => e / sumE);
  return s.map(si => MIN + budget * si);
}
function assetEarliestYear(assetName) {
  const rows = crisisData.filter(d => d.asset_name === assetName);
  if (!rows.length) return 9999;
  return Math.min(...rows.map(d => d.date.getFullYear()));
}

function renderBestCombo() {
  const bestEl = $("pb-best-combo");
  const bestContent = $("pb-best-content");
  if (!bestEl || !bestContent) return;
  const eligibleAssets = [...new Set(crisisData.map(d => d.asset_name))].filter(name => name !== "S&P 500").filter(name => assetEarliestYear(name) <= PB.year + 2);
  if (eligibleAssets.length < 2) { bestEl.style.display = "none"; return; }
  const ranked = eligibleAssets.map(a => ({ name: a, ret: assetFinalReturn(a, PB.year) })).filter(d => d.ret !== null).sort((a,b) => b.ret - a.ret);
  let bestReturn = -Infinity, bestCombo = [], bestWeights = [];
  for (let k = 2; k <= Math.min(5, ranked.length); k++) {
    const combo = ranked.slice(0, k).map(d => d.name);
    const w = optimizeWeightsWithMin(combo, PB.year);
    if (!w) continue;
    const val = weightedFinalValue(combo, w, PB.year);
    if (val !== null && val > bestReturn) { bestReturn = val; bestCombo = combo; bestWeights = w; }
  }
  if (!bestCombo.length) { bestEl.style.display = "none"; return; }
  bestEl.style.display = "block";
  let displayPcts = bestWeights.map(w => Math.round(w * 100));
  const diff = 100 - displayPcts.reduce((a,b) => a+b, 0);
  displayPcts[0] += diff;
  const gain = (bestReturn - 100).toFixed(1);
  const isPos = bestReturn >= 100;
  const weightObj = {};
  bestCombo.forEach((name, i) => { weightObj[name] = displayPcts[i]; });

  bestContent.innerHTML = `
    <div class="pb-best-card">
      <div class="pb-best-assets">
        ${bestCombo.map((name, i) => {
          const isNew = ASSET_INFO[name]?.group === "New money";
          return `<span class="pb-best-pill ${isNew ? "pb-pill-new" : "pb-pill-old"}">${name} <b>${displayPcts[i]}%</b></span>`;
        }).join("")}
      </div>
      <div class="pb-best-result">$100 → <b class="${isPos?"pos":"neg"}">$${bestReturn.toFixed(0)}</b> <span class="${isPos?"pos":"neg"}">(${isPos?"+":""}${gain}%)</span></div>
      <p class="pb-best-note">Best weighted split of 2–5 assets from ${PB.year} to end of data. Only assets with data from that year are included.</p>
    </div>
    <div id="pb-best-chart"></div>`;

  // Draw comparison chart
  const chartEl = $("pb-best-chart");
  if (!chartEl) return;
  const portfolioSeries = getPortfolioTimeSeries(bestCombo, weightObj, PB.year);
  const spSeries = getSPTimeSeries(PB.year);
  if (!portfolioSeries.length) return;
  const W = chartEl.clientWidth || 760, H = 280;
  const margin = { top: 20, right: 80, bottom: 44, left: 58 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;
  const allDates = [...portfolioSeries.map(d => d.date), ...spSeries.map(d => d.date)];
  const allVals = [...portfolioSeries.map(d => d.value), ...spSeries.map(d => d.value)];
  const x = d3.scaleTime().domain(d3.extent(allDates)).range([0,w]);
  const y = d3.scaleLinear().domain([Math.min(d3.min(allVals)*0.92,75), d3.max(allVals)*1.08]).nice().range([h,0]);
  const svg = d3.select(chartEl).append("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
  g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat("")).call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke","#f4f4f4"); });
  g.append("line").attr("x1",0).attr("x2",w).attr("y1",y(100)).attr("y2",y(100)).attr("stroke","#e0e0e0").attr("stroke-dasharray","5,4");
  const lineGen = d3.line().x(d => x(d.date)).y(d => y(d.value)).curve(d3.curveMonotoneX);
  if (spSeries.length) {
    const sp = g.append("path").datum(spSeries).attr("fill","none").attr("stroke","#bbb").attr("stroke-width",1.8).attr("d",lineGen);
    animatePath(sp, 1000);
    const sl = spSeries[spSeries.length-1];
    g.append("text").attr("x",x(sl.date)+6).attr("y",y(sl.value)+4).attr("fill","#bbb").attr("font-size",11).attr("font-weight",600).attr("opacity",0).text(`$${sl.value.toFixed(0)}`).transition().delay(900).duration(300).attr("opacity",1);
  }
  const bp = g.append("path").datum(portfolioSeries).attr("fill","none").attr("stroke","#2a9d5c").attr("stroke-width",3).attr("d",lineGen);
  animatePath(bp, 1200);
  const bl = portfolioSeries[portfolioSeries.length-1];
  g.append("text").attr("x",x(bl.date)+6).attr("y",y(bl.value)+4).attr("fill","#2a9d5c").attr("font-size",14).attr("font-weight",800).attr("opacity",0).text(`$${bl.value.toFixed(0)}`).transition().delay(1100).duration(300).attr("opacity",1);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`)).call(gx => gx.select(".domain").attr("stroke","#eee"));
}