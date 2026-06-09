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
    description: "QQQ tracks the Nasdaq-100: 100 of the largest non-financial companies listed on Nasdaq. It is not exactly the same as a technology-sector fund. It is a growth-heavy index with a lot of mega-cap tech, but it can also include consumer, communication, and other Nasdaq-listed companies. That makes it a useful proxy for the broader new-money story, from the dot-com crash to the AI rally.",
    example: "Think of QQQ as the growth-heavy Nasdaq basket: Apple, Microsoft, Nvidia, Amazon, Costco, and other large Nasdaq names can all matter here.",
  },
  "Technology": {
    ticker: "XLK", group: "New money",
    description: "XLK is a true technology-sector ETF. It pulls technology companies from the S&P 500, so it is narrower than QQQ and more directly focused on software, hardware, chips, and IT services. QQQ is a Nasdaq growth index; XLK is the technology sector itself.",
    example: "A finance person would read XLK as the cleaner technology-sector bet, while QQQ is the broader Nasdaq/growth benchmark.",
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
    description: "The world's largest cryptocurrency. Bitcoin sits outside the traditional banking system and trades more like a high-conviction risk asset than a steady store of value. Some people pitch it as digital gold; others see it as a speculative bet. In the data here, it can win huge, but it is never calm.",
    example: "Bitcoin can rally during distrust in banks, but it can also fall more than stocks during risk-off periods.",
  },
};

const GROUP_EXPLAINER = {
  "Baseline": "The benchmark is the yardstick. It is not an asset category you are choosing between old and new money; it is the reference point the rest of the project compares against.",
  "Old money": "Old money assets are the classic parts of a portfolio: gold, bonds, banks, utilities, and energy. People often trust them in rough markets, but each crisis tests that idea in a different way.",
  "New money": "New money assets are tied to modern growth stories: technology, semiconductors, innovation stocks, and crypto. They can surge when optimism is high, but they can fall hard when investors stop paying for future growth.",
};

const ASSET_ORDER = [
  "Gold", "Financials", "Regional Banks", "Energy", "Utilities", "Long Bonds",
  "Nasdaq 100", "Technology", "Semiconductors", "Innovation Stocks", "Bitcoin"
];

const ASSET_DISPLAY_NAMES = {
  "S&P 500": "SPY S&P 500 benchmark",
  "Gold": "GLD Gold",
  "Financials": "XLF Financials",
  "Regional Banks": "KRE Regional Banks",
  "Energy": "XLE Energy",
  "Utilities": "XLU Utilities",
  "Long Bonds": "TLT Long Treasury bonds",
  "Nasdaq 100": "QQQ Nasdaq-100 ETF",
  "Technology": "XLK Technology",
  "Semiconductors": "SMH Semiconductors",
  "Innovation Stocks": "ARKK Innovation stocks",
  "Bitcoin": "BTC-USD Bitcoin",
};

const ASSET_FULL_NAMES = {
  "S&P 500": "S&P 500 benchmark",
  "Gold": "Gold",
  "Financials": "Financials",
  "Regional Banks": "Regional Banks",
  "Energy": "Energy",
  "Utilities": "Utilities",
  "Long Bonds": "Long Treasury bonds",
  "Nasdaq 100": "Nasdaq-100 ETF",
  "Technology": "Technology",
  "Semiconductors": "Semiconductors",
  "Innovation Stocks": "Innovation stocks",
  "Bitcoin": "Bitcoin",
};

const ASSET_AVAILABILITY_NOTES = {
  "Gold": "Gold existed during older crises, but this project uses GLD as the tradable gold ETF proxy. GLD starts on Nov. 18, 2004, after the Dot-Com Crash ended.",
  "Regional Banks": "Regional banks existed, but this project uses KRE as the tradable regional-bank ETF proxy. KRE starts on Jun. 22, 2006, after the Dot-Com Crash ended.",
  "Innovation Stocks": "The ARKK innovation ETF starts on Oct. 31, 2014, so it cannot represent the Dot-Com Crash or the 2008 crisis in this dataset.",
  "Bitcoin": "Bitcoin was launched in 2009. The BTC-USD price series in this dataset begins on Sep. 17, 2014, so it cannot appear in Dot-Com or the 2008 crisis.",
  "Long Bonds": "TLT starts on Jul. 30, 2002, so its Dot-Com result only covers the last part of the episode.",
  "Semiconductors": "SMH starts on Jun. 5, 2000, so its Dot-Com result begins after the episode had already started."
};

const ASSET_COLORS = {
  "S&P 500": "#111111",
  "Gold": "#6f7378",
  "Financials": "#8a8f94",
  "Regional Banks": "#a3a6aa",
  "Energy": "#4c5257",
  "Utilities": "#7b8085",
  "Long Bonds": "#565d63",
  "Nasdaq 100": "#0b6f45",
  "Technology": "#178a59",
  "Semiconductors": "#2a9d6c",
  "Innovation Stocks": "#3f7f62",
  "Bitcoin": "#0f5f3d",
};

const SELECTED_ASSET_COLOR = "#0b6f45";
const OLD_MONEY_COLOR = "#666c70";
const NEW_MONEY_COLOR = "#0b6f45";
const BENCHMARK_COLOR = "#111111";

function assetLabel(name) {
  return ASSET_DISPLAY_NAMES[name] || name;
}

function assetLabelHTML(name) {
  const info = ASSET_INFO[name] || {};
  const ticker = info.ticker || name;
  const full = ASSET_FULL_NAMES[name] || name;
  return `<span class="asset-ticker">${ticker}</span> <span class="asset-full-name">${full}</span>`;
}

function availableAssetsForEpisode(episode) {
  const have = new Set(crisisData.filter(d => d.episode === episode && d.asset_name !== "S&P 500").map(d => d.asset_name));
  return ASSET_ORDER.filter(a => have.has(a));
}

function allStressTestAssets() {
  const have = new Set(crisisData.filter(d => d.asset_name !== "S&P 500").map(d => d.asset_name));
  return ASSET_ORDER.filter(a => have.has(a));
}

function rowFor(assetName, episode) {
  return summaryData.find(d => d.episode === episode && d.asset_name === assetName);
}

function assetEarliestYearFromData(assetName) {
  const rows = crisisData.filter(d => d.asset_name === assetName).sort((a,b) => a.date - b.date);
  return rows.length ? rows[0].date.getFullYear() : null;
}

function fmtShortDate(date) {
  if (!date || isNaN(date)) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function episodeDates(episode) {
  const ep = episodeMeta.find(d => d.episode === episode);
  return ep ? { start: new Date(ep.start), end: new Date(ep.end) } : null;
}

function firstWideDateForAsset(assetName) {
  const ticker = getTicker(assetName);
  if (!ticker || !wideData.length) return null;
  const first = wideData.find(d => Number.isFinite(d[ticker]));
  return first ? first.date : null;
}

function availabilityStatus(assetName, episode) {
  const row = rowFor(assetName, episode);
  const dates = episodeDates(episode);
  const first = firstWideDateForAsset(assetName);
  if (!dates || !first) return row ? { kind: "full" } : { kind: "missing", short: "Not available", detail: ASSET_AVAILABILITY_NOTES[assetName] || "This asset does not have a usable price series for this episode." };

  if (!row && first > dates.end) {
    return {
      kind: "missing",
      short: assetName === "Bitcoin" ? "Not created / not tracked yet" : "ETF not trading yet",
      detail: ASSET_AVAILABILITY_NOTES[assetName] || `${assetLabel(assetName)} starts on ${fmtShortDate(first)}, after ${episode} ended.`
    };
  }
  if (!row && first > dates.start) {
    return {
      kind: "missing",
      short: "No full-crisis data",
      detail: ASSET_AVAILABILITY_NOTES[assetName] || `${assetLabel(assetName)} starts on ${fmtShortDate(first)}, after ${episode} began.`
    };
  }
  if (!row) {
    return {
      kind: "missing",
      short: "No data in file",
      detail: ASSET_AVAILABILITY_NOTES[assetName] || "This asset is missing from the summary file for this episode."
    };
  }
  if (first > dates.start) {
    return {
      kind: "partial",
      short: "Partial episode",
      detail: ASSET_AVAILABILITY_NOTES[assetName] || `${assetLabel(assetName)} starts on ${fmtShortDate(first)}, so this result does not cover the full episode.`
    };
  }
  return { kind: "full" };
}

const EPISODE_CONTEXT = {
  "Dot-Com Crash":           { dates: "2000–2002", summary: "The internet bubble was the stress test for early tech optimism. Companies with big stories and weak profits were suddenly repriced, so new-money assets were hit much harder than traditional sectors.", keyFact: "A crisis where the new-money story broke first." },
  "Global Financial Crisis": { dates: "2007–2009", summary: "The housing and credit system cracked. Banks, mortgage exposure, and financial leverage became the weak points, so this crisis tested old-money finance more directly.", keyFact: "A reminder that traditional finance can be the fragile part too." },
  "COVID Crash":             { dates: "2020",      summary: "COVID created a fast market panic, then a fast recovery. Lockdowns hurt the whole market at first, but stimulus, low rates, and remote work helped tech recover quickly.", keyFact: "A crash can be short and still violent." },
  "2022 Inflation Shock":    { dates: "2022",      summary: "Inflation and rising rates changed the rules. Growth stocks fell, long bonds fell, and energy became one of the few areas that actually benefited.", keyFact: "This is the clearest example of why bonds are not automatically safe." },
  "Regional Banking Crisis": { dates: "2023",      summary: "A narrow but sharp panic hit smaller banks after Silicon Valley Bank failed. Regional banks carried the stress, while large tech and Bitcoin held up better.", keyFact: "A crisis can be very painful for one corner of the market without breaking everything else." },
  "AI Rally":                { dates: "2023–2024", summary: "AI optimism pushed semiconductors and large technology stocks higher. The market looked strong, but much of the gain came from a narrow new-money theme.", keyFact: "Not a crash: a period where new money dominated." },
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
    "Nasdaq 100":      "The Nasdaq-100 was ground zero for the dot-com crash. Because QQQ is a growth-heavy Nasdaq basket, it captured how badly the internet bubble damaged large new-money names.",
    "Technology":      "XLK is the cleaner technology-sector slice. It was devastated too, showing that the damage was not just hype stocks — the whole tech sector was repriced.",
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
let longRevealIdx = 0; // how many episodes are revealed in the long view (0 = first only)
let state = { episode: "Dot-Com Crash", asset: "Nasdaq 100", currentSlide: 1, selectedQuiz: null };

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

// Compute a proportional stroke-dasharray so the visible dashes appear at a
// consistent pixel width no matter how wiggly (and therefore how long) the path is.
// dashPx / gapPx are the desired visual pixel sizes on screen.
function spyDash(pathNode, chartW, dashPx = 16, gapPx = 7) {
  const totalLen = pathNode.getTotalLength();
  if (!totalLen || !chartW) return "6 3";
  const r = totalLen / chartW;
  return `${(dashPx * r).toFixed(1)} ${(gapPx * r).toFixed(1)}`;
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

function assetDropdownNote(assetName, episode) {
  const status = availabilityStatus(assetName, episode);
  if (status.kind === "full") return "";
  if (status.kind === "partial") return " (partial episode)";
  if (assetName === "Bitcoin") return " (launched 2009; data starts 2014)";
  if (assetName === "Gold") return " (GLD starts 2004)";
  if (assetName === "Regional Banks") return " (KRE starts 2006)";
  if (assetName === "Innovation Stocks") return " (ARKK starts 2014)";
  return ` (${status.short || "not available"})`;
}

function dropdownAssetsForEpisode() {
  // Keep the full project asset list visible so missing history reads as context, not a broken menu.
  // Missing assets are disabled and greyed out instead of disappearing.
  return ASSET_ORDER.filter(a => ASSET_INFO[a]);
}

function refreshAssetDropdown() {
  const assetDd = d3.select("#asset-dropdown");
  if (assetDd.empty()) return;
  const options = dropdownAssetsForEpisode();
  const selectable = options.filter(a => availabilityStatus(a, state.episode).kind !== "missing");
  if (!selectable.includes(state.asset)) state.asset = selectable[0] || options[0] || "Nasdaq 100";

  assetDd.selectAll("option").data(options, d => d).join("option")
    .attr("value", d => d)
    .attr("disabled", d => availabilityStatus(d, state.episode).kind === "missing" ? true : null)
    .attr("data-status", d => availabilityStatus(d, state.episode).kind)
    .text(d => assetLabel(d) + assetDropdownNote(d, state.episode));

  assetDd.property("value", state.asset);
}

function initDropdowns() {
  const epDd = d3.select("#episode-dropdown");
  epDd.selectAll("option").data(episodeMeta).join("option")
    .attr("value", d => d.episode)
    .text(d => {
      const startYear = new Date(d.start).getFullYear();
      const endYear   = new Date(d.end).getFullYear();
      const yearStr   = startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`;
      const nameMap   = {
        "Global Financial Crisis": "2008 Crisis",
        "Regional Banking Crisis":  "Banking Crisis",
      };
      const name = nameMap[d.episode] || d.episode;
      return `${name} (${yearStr})`;
    });
  epDd.property("value", state.episode);

  function populateAssetDropdown() {
    refreshAssetDropdown();
  }

  populateAssetDropdown();

  epDd.on("change", function() {
    state.episode = this.value;
    populateAssetDropdown();
    updateInflationBlurb();
    drawInflationChart();
    if ($("slideshow").classList.contains("visible")) goToSlide(state.currentSlide, false);
    renderLongViewSection();
    renderTable();
  });

  d3.select("#asset-dropdown").on("change", function() {
    state.asset = this.value;
    checkedAssets.add("S&P 500");
    checkedAssets.add(state.asset);
    if ($("slideshow").classList.contains("visible")) goToSlide(state.currentSlide, false);
    renderLongViewSection();
  });

  $("shuffle-assets-btn")?.addEventListener("click", () => {
    const selectable = dropdownAssetsForEpisode().filter(
      a => availabilityStatus(a, state.episode).kind !== "missing"
    );
    if (!selectable.length) return;
    const pick = selectable[Math.floor(Math.random() * selectable.length)];
    state.asset = pick;
    const assetDd = $("asset-dropdown");
    if (assetDd) assetDd.value = pick;
    checkedAssets.add("S&P 500");
    checkedAssets.add(pick);
    if ($("slideshow").classList.contains("visible")) goToSlide(state.currentSlide, false);
    renderLongViewSection();
  });

  $("begin-btn").addEventListener("click", () => {
    $("slideshow").classList.add("visible");
    goToSlide(1);
    $("slideshow").scrollIntoView({ behavior: "smooth" });
  });

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
  const selectable = dropdownAssetsForEpisode().filter(a => availabilityStatus(a, state.episode).kind !== "missing");
  if (!selectable.includes(state.asset)) state.asset = selectable[0] || "Nasdaq 100";
  const assetDd = $("asset-dropdown");
  if (assetDd) assetDd.value = state.asset;
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
  if (n === 2) drawAssetInfoPanel();
  if (n === 3) { drawMainChart(); drawBarChart(); }
  if (n === 4) { drawGroupSummary(); drawOldVsNewChart(); }
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
    Cash quietly lost <b>$${loss}</b> of buying power. Before we even compare assets, doing nothing already has a cost.`;
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
  const epWidth = Math.max(4, activeX(epEnd) - activeX(years.start));
  const epLabelX = expanded ? activeX(years.start) + 5 : activeX(years.start) + epWidth / 2;
  g.append("rect")
    .attr("class", "ep-band")
    .attr("x", activeX(years.start)).attr("y", 0)
    .attr("width", epWidth).attr("height", h)
    .attr("fill", "#0b6f45").attr("opacity", 0.07);
  g.append("text").attr("class", "ep-label")
    .attr("x", epLabelX).attr("y", 12)
    .attr("text-anchor", expanded ? "start" : "middle")
    .attr("fill", "#0b6f45").attr("font-size", 10).attr("font-weight", 700).text(`${state.episode} inflation`);

  // $100 baseline
  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);
  g.append("text").attr("class", "cash-start-label").attr("x", activeX(years.start) + 5).attr("y", y(100) + 18)
    .attr("fill", "#bbb").attr("font-size", 11).text(`$100 in ${startYear}`);

  // ── EPISODE portion (area + line) ──
  const epArea = g.append("path").attr("class", "ep-area")
    .datum(lineData).attr("fill", "#eef3ef").attr("opacity", 0.5)
    .attr("d", areaGen(activeX));
  const epLine = g.append("path").attr("class", "ep-line")
    .datum(lineData).attr("fill", "none")
    .attr("stroke", "#0b6f45").attr("stroke-width", 2.5)
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
    .datum(extData).attr("fill", "#eef3ef").attr("opacity", 0.5)
    .attr("clip-path", "url(#inflation-clip)")
    .attr("d", areaGen(expanded ? xFull : xInit));
  const extLine = g.append("path").attr("class", "ext-line")
    .datum(extData).attr("fill", "none")
    .attr("stroke", "#0b6f45").attr("stroke-width", 2.5)
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
  g.append("text").attr("class", "axis-label")
    .attr("x", w / 2).attr("y", h + 38).attr("text-anchor", "middle")
    .text("Year");

  // Hover tooltip
  const tooltip  = d3.select("#tooltip");
  const hoverDot = g.append("circle").attr("r", 5).attr("fill", "#666c70")
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
        .attr("text-anchor", "start")
        .transition().duration(DURATION).ease(ease)
        .attr("x", xFull(years.start) + 5);
      g.select(".cash-start-label")
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
    — a loss of <b>$${loss}</b> in real purchasing power. The point is simple: cash is a benchmark too.`;
}

// ── SLIDE 2: MAIN $100 CHART ──────────────────────────────────────────────────
function drawMainChart() {
  const filtered = crisisData.filter(d => d.episode === state.episode && d.asset_name === state.asset).sort((a,b) => a.date - b.date);
  const spy = crisisData.filter(d => d.episode === state.episode && d.asset_name === "S&P 500").sort((a,b) => a.date - b.date);
  $("slide-2-title").textContent = `If you invested $100 in ${assetLabel(state.asset)} during the ${state.episode}`;

  const el = $("main-chart");
  d3.select(el).selectAll("*").remove();

  if (!filtered.length) {
    el.innerHTML = `<p class="no-data-msg">${assetLabel(state.asset)} does not have price history during the ${state.episode}. Try another asset for this episode.</p>`;
    return;
  }

  const W = el.clientWidth || 780, H = 360;
  const margin = { top: 28, right: 100, bottom: 58, left: 68 };
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
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#eeeeee"); });
  g.append("line").attr("x1",0).attr("x2",w).attr("y1",y(100)).attr("y2",y(100))
    .attr("stroke","#111").attr("stroke-dasharray","5,4").attr("stroke-width",1.8).attr("opacity",0.55);
  g.append("text").attr("x", w + 4).attr("y", y(100) + 4).attr("fill","#111").attr("font-size",11).attr("font-weight",700).text("$100 start");

  const lineGen = d3.line().x(d => x(d.date)).y(d => y(d.indexed_100)).curve(d3.curveMonotoneX);
  const lineColor = SELECTED_ASSET_COLOR;

  if (spy.length) {
    const spyPath = g.append("path").datum(spy).attr("fill","none").attr("stroke",BENCHMARK_COLOR)
      .attr("stroke-width", 2.5).attr("d", lineGen);
    animatePath(spyPath, 1000);
    const spyLast = spy[spy.length - 1];
    g.append("text").attr("x", x(spyLast.date)+7).attr("y", y(spyLast.indexed_100)+4)
      .attr("fill",BENCHMARK_COLOR).attr("font-size",11).attr("font-weight",700).text(`SPY $${Math.round(spyLast.indexed_100)}`);
  }

  const assetPath = g.append("path").datum(filtered).attr("fill","none").attr("stroke",lineColor)
    .attr("stroke-width", 3).attr("d", lineGen);
  animatePath(assetPath, 1400);
  const last = filtered[filtered.length - 1];
  g.append("text").attr("x", x(last.date)+8).attr("y", y(last.indexed_100)+4)
    .attr("fill", "#111")
    .attr("font-size", 14).attr("font-weight", 800).text(`$${last.indexed_100.toFixed(0)}`);

  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6));
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d}`));
  g.append("text").attr("class","axis-label").attr("x",w/2).attr("y",h+44).attr("text-anchor","middle").text("Date during the episode");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-50).attr("text-anchor","middle").text("Value of your original $100");

  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1",0).attr("y2",h)
    .attr("stroke","#555").attr("stroke-width",1.5).attr("stroke-dasharray","5 3")
    .style("opacity",0).style("pointer-events","none");
  const dot    = g.append("circle").attr("r",5).attr("fill",lineColor).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const spyDot = g.append("circle").attr("r",5).attr("fill","#111").attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const bisect = d3.bisector(d => d.date).left;
  g.append("rect").attr("width",w).attr("height",h).attr("fill","none").attr("pointer-events","all")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const i = Math.min(bisect(filtered, date, 1), filtered.length - 1);
      const d = filtered[i];
      const si = spy.length ? Math.min(bisect(spy, date, 1), spy.length - 1) : -1;
      const sd = si >= 0 ? spy[si] : null;
      hoverLine.attr("x1",mx).attr("x2",mx).style("opacity",1);
      dot.attr("cx", x(d.date)).attr("cy", y(d.indexed_100)).style("opacity", 1);
      if (sd) spyDot.attr("cx", x(sd.date)).attr("cy", y(sd.indexed_100)).style("opacity", 1);
      else spyDot.style("opacity", 0);
      tooltip.style("opacity",1)
        .style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${assetLabel(state.asset)}</b><br/>${d.date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}<br/>$100 became <b>$${d.indexed_100.toFixed(2)}</b>${sd ? `<br/><span style="color:#111">SPY benchmark: <b>$${sd.indexed_100.toFixed(2)}</b></span>` : ""}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity",0); dot.style("opacity",0); spyDot.style("opacity",0); tooltip.style("opacity",0); });
}

// ── SLIDE 2: BAR CHART ────────────────────────────────────────────────────────
function drawBarChart() {
  const data = summaryData.filter(d => d.episode === state.episode).sort((a,b) => a.total_return_pct - b.total_return_pct);
  const el = $("bar-chart");
  d3.select(el).selectAll("*").remove();
  if (!data.length) return;

  const W = el.clientWidth || 780, H = 360;
  const margin = { top: 12, right: 72, bottom: 58, left: 168 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const x = d3.scaleLinear().domain(d3.extent([...data.map(d => d.total_return_pct), 0])).nice().range([0, w]);
  const y = d3.scaleBand().domain(data.map(d => d.asset_name)).range([0, h]).padding(0.22);

  const svg = d3.select(el).append("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  g.append("line").attr("x1",x(0)).attr("x2",x(0)).attr("y1",0).attr("y2",h).attr("stroke","#111").attr("opacity",0.35);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%"))
    .call(gx => gx.select(".domain").remove());
  g.append("text").attr("class","axis-label").attr("x",w/2).attr("y",h+44).attr("text-anchor","middle").text("Total return during this episode");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-150).attr("text-anchor","middle").text("Assets");

  const tooltip = d3.select("#tooltip");
  const bars = g.selectAll(".bar").data(data).join("rect").attr("class","bar")
    .attr("x", d => Math.min(x(0), x(d.total_return_pct)))
    .attr("y", d => y(d.asset_name))
    .attr("height", y.bandwidth())
    .attr("width", d => Math.abs(x(d.total_return_pct) - x(0)))
    .attr("fill", d => d.total_return_pct >= 0 ? "#0b6f45" : "#c84b4b")
    .attr("opacity", d => d.asset_name === state.asset ? 1 : 0.62)
    .attr("stroke", d => d.asset_name === state.asset ? "#111" : "none")
    .attr("stroke-width", 1.5)
    .attr("rx", 2)
    .on("mousemove", (event, d) => {
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${assetLabel(d.asset_name)}</b><br/>Return: <b>${fmtPct(d.total_return_pct)}</b><br/>$100 became <b>${fmtMoney(d.end_value)}</b><br/>Worst drop: ${fmtPct(d.max_drawdown)}`);
    })
    .on("mouseleave", () => tooltip.style("opacity",0));

  bars.attr("width", 0).transition().duration(900).delay((d,i) => i * 45)
    .attr("x", d => Math.min(x(0), x(d.total_return_pct)))
    .attr("width", d => Math.abs(x(d.total_return_pct) - x(0)));

  g.selectAll(".bar-label").data(data).join("text").attr("class","bar-label")
    .attr("x",-6).attr("y", d => y(d.asset_name) + y.bandwidth()/2 + 4)
    .attr("text-anchor","end")
    .attr("fill", d => d.asset_name === state.asset ? "#111" : "#777")
    .attr("font-weight", d => d.asset_name === state.asset ? "700" : "400")
    .text(d => ASSET_INFO[d.asset_name]?.ticker || d.asset_name);

  g.selectAll(".bar-value").data(data).join("text").attr("class","bar-value")
    .attr("x", d => d.total_return_pct >= 0 ? x(d.total_return_pct)+4 : x(d.total_return_pct)-4)
    .attr("y", d => y(d.asset_name) + y.bandwidth()/2 + 4)
    .attr("text-anchor", d => d.total_return_pct >= 0 ? "start" : "end")
    .attr("fill", "#111")
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
  const isNew = info?.group === "New money";
  const groupExplain = GROUP_EXPLAINER[info?.group] || "";

  const statsHTML = row ? `
    <div class="asset-stats-row">
      <div class="asset-stat">
        <div class="asset-stat-label">End value</div>
        <div class="asset-stat-val ${row.end_value >= 100 ? "pos" : "neg"}">${fmtMoney(row.end_value)}</div>
        <div class="asset-stat-hint">what your $100 became</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Total return</div>
        <div class="asset-stat-val ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}</div>
        <div class="asset-stat-hint">gain or loss</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Worst drawdown</div>
        <div class="asset-stat-val neg">${fmtPct(row.max_drawdown)}</div>
        <div class="asset-stat-hint">biggest fall along the way</div>
      </div>
      <div class="asset-stat">
        <div class="asset-stat-label">Rank</div>
        <div class="asset-stat-val">${rank}/${rankRows.length}</div>
        <div class="asset-stat-hint">within this episode</div>
      </div>
    </div>` : `<p class="takeaway"><b>Data note:</b> This asset did not trade through the full ${episode} window, so it is not ranked for this episode.</p>`;

  panel.innerHTML = `
    <div class="info-card">
      <span class="info-tag ${isNew ? "tag-new-money" : "tag-old-money"}">${info?.group || "Asset"}</span>
      <div class="asset-name-large">${assetLabel(asset)}</div>
      <p>${info?.description || ""}</p>
      <p class="takeaway"><b>Why this category matters:</b> ${groupExplain}</p>
      ${statsHTML}
    </div>
    <div class="info-card">
      <span class="info-tag">${episode} · ${epCtx.dates || ""}</span>
      <p>${epCtx.summary || ""}</p>
      ${takeaway ? `<p class="takeaway"><b>What happened here:</b> ${takeaway}</p>` : ""}
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

  const totalW = el.clientWidth || 780, H = 280;
  const margin = { top: 16, right: 64, bottom: 54, left: 64 };
  const W = totalW - margin.left - margin.right;
  const [yMin, yMax] = d3.extent(allVals);
  const yPad = (yMax - yMin) * 0.1;
  const xScale = d3.scaleLinear().domain([0, d3.max(days)]).range([0, W]);
  const yScale = d3.scaleLinear().domain([Math.min(yMin - yPad, 94), yMax + yPad]).nice().range([H, 0]);

  const svg = d3.select(el).append("svg").attr("width","100%").attr("viewBox",`0 0 ${totalW} ${H + margin.top + margin.bottom}`);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(yScale).ticks(5).tickSize(-W).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke","#eeeeee"); });
  g.append("line").attr("x1",0).attr("x2",W).attr("y1",yScale(100)).attr("y2",yScale(100))
    .attr("stroke","#111").attr("stroke-dasharray","3 3").attr("opacity",0.35);
  g.append("g").attr("transform",`translate(0,${H})`).call(d3.axisBottom(xScale).ticks(6).tickFormat(d => `Day ${d}`));
  g.append("g").call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d3.format(".0f")(d)}`));
  g.append("text").attr("class","axis-label").attr("x",W/2).attr("y",H+42).attr("text-anchor","middle").text("Days since the episode began");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-H/2).attr("y",-50).attr("text-anchor","middle").text("Average value of $100");

  const makeLine = d3.line().x(d => xScale(d.day)).y(d => yScale(d.val)).curve(d3.curveCatmullRom.alpha(0.5));

  const oldPath = g.append("path").datum(oldSeries).attr("fill","none").attr("stroke",OLD_MONEY_COLOR).attr("stroke-width",2.7).attr("d",makeLine);
  animatePath(oldPath, 1200);
  const newPath = g.append("path").datum(newSeries).attr("fill","none").attr("stroke",NEW_MONEY_COLOR).attr("stroke-width",2.7).attr("stroke-dasharray","7 4").attr("d",makeLine);
  animatePath(newPath, 1200);

  [{ s: oldSeries, c: OLD_MONEY_COLOR, label: "Old money" }, { s: newSeries, c: NEW_MONEY_COLOR, label: "New money" }].forEach(({ s, c, label }) => {
    if (!s.length) return;
    const last = s[s.length - 1];
    g.append("text").attr("x", xScale(last.day)+5).attr("y", yScale(last.val)+4)
      .attr("fill", c).attr("font-size", 11).attr("font-weight", 700).text(`${label}: $${last.val.toFixed(0)}`);
  });

  const tooltip = d3.select("#tooltip");
  const crosshair = g.append("line").attr("y1",0).attr("y2",H).attr("stroke","#ddd").attr("stroke-dasharray","3 3").style("opacity",0);
  const dotOld = g.append("circle").attr("r",4).attr("fill",OLD_MONEY_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const dotNew = g.append("circle").attr("r",4).attr("fill",NEW_MONEY_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
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
        .html(`<b>Day ${day}</b><br/><span style="color:${OLD_MONEY_COLOR}">● Old money</span> ${od ? "$"+od.val.toFixed(1) : "—"}<br/><span style="color:${NEW_MONEY_COLOR}">● New money</span> ${nd ? "$"+nd.val.toFixed(1) : "—"}`);
    })
    .on("mouseleave", () => { crosshair.style("opacity",0); dotOld.style("opacity",0); dotNew.style("opacity",0); tooltip.style("opacity",0); });
}

// ── SLIDE 4: GROUP SUMMARY ────────────────────────────────────────────────────
function drawGroupSummary() {
  $("slide-4-title").textContent = `Old money vs new money: ${state.episode}`;
  $("slide-4-desc").textContent = "This view compares the two wealth stories directly. It is not trying to crown one permanent winner; it shows which assumptions this episode rewarded.";
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
      <div class="group-card-title">Average return: <span class="${avg >= 0 ? "pos" : "neg"}">${fmtPct(avg)}</span></div>
      <p class="group-card-copy">${GROUP_EXPLAINER[groupName]}</p>
      <ul class="group-asset-list">
        ${rows.map(d => `<li class="group-asset-item"><span>${ASSET_INFO[d.asset_name]?.ticker || d.asset_name} ${d.asset_name}</span><b class="${d.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(d.total_return_pct)}</b></li>`).join("")}
      </ul>`;
    container.appendChild(card);
  });
}

// ── SLIDE 5: QUIZ ─────────────────────────────────────────────────────────────
function buildQuizOptions() {
  // Reset all quiz state on every entry so a return visit starts fresh
  state.selectedQuiz = null;
  const result = $("quiz-result");
  if (result) { result.innerHTML = ""; result.classList.remove("visible"); }
  const ranking = $("quiz-ranking");
  if (ranking) ranking.innerHTML = "";

  const assets = allStressTestAssets();
  const container = $("slide5-options");
  if (!container) return;
  container.innerHTML = "";
  assets.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = assetLabel(name);
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
      ? "You got it. "
      : `You picked <b>${picked.assetName}</b> (ranked #${pickedRank} for consistency). `;
  }
  result.innerHTML = `
    <h3>${assetLabel(winner.assetName)} held up most consistently across all episodes.</h3>
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
    .attr("fill", d => d.group === "New money" ? NEW_MONEY_COLOR : OLD_MONEY_COLOR)
    .attr("opacity", d => d.assetName === highlightName ? 1 : 0.6).attr("rx",2)
    .transition().duration(800).delay((_,i) => i*60).ease(d3.easeQuadOut)
    .attr("width", d => x(d.positiveShare));
  g.selectAll(".bar-label").data(top).join("text").attr("class","bar-label")
    .attr("x",-6).attr("y", d => y(d.assetName)+y.bandwidth()/2+4).attr("text-anchor","end")
    .attr("font-weight", d => d.assetName === highlightName ? "700" : "400")
    .attr("fill", d => d.assetName === highlightName ? "#1a1a1a" : "#999")
    .text(d => ASSET_INFO[d.assetName]?.ticker || d.assetName);
  g.append("text").attr("class","axis-label").attr("x",w/2).attr("y",h+26).attr("text-anchor","middle").text("% finished positive across the 6 episodes");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-132).attr("text-anchor","middle").text("Assets");
  g.selectAll(".bar-value").data(top).join("text").attr("class","bar-value")
    .attr("x", d => x(d.positiveShare)+6).attr("y", d => y(d.assetName)+y.bandwidth()/2+4)
    .attr("opacity",0).text(d => `${d.positive}/${d.count} positive`)
    .transition().delay((_,i) => 400+i*60).duration(300).attr("opacity",1);
}

// ── LONG VIEW SECTION ─────────────────────────────────────────────────────────
function renderLongViewSection() {
  longRevealIdx = 0;
  renderCheckboxes();
  drawLongChart();
}

function renderCheckboxes() {
  const MAX_LONG_ASSETS = 5;
  const allAssets = ["S&P 500", ...allStressTestAssets()];
  checkedAssets.add("S&P 500");
  if (state.asset) checkedAssets.add(state.asset);

  // Keep the long view readable: SPY plus up to five comparison assets.
  const nonSpy = [...checkedAssets].filter(a => a !== "S&P 500");
  if (nonSpy.length > MAX_LONG_ASSETS) {
    const keep = new Set([state.asset, ...nonSpy].filter(Boolean).slice(0, MAX_LONG_ASSETS));
    checkedAssets = new Set(["S&P 500", ...keep]);
  }

  const selectedCount = [...checkedAssets].filter(a => a !== "S&P 500").length;
  const note = $("long-selection-note");
  if (note) note.textContent = `${selectedCount}/${MAX_LONG_ASSETS} comparison assets selected. SPY stays locked on.`;

  const container = $("asset-checkboxes");
  if (!container) return;
  container.innerHTML = "";

  allAssets.forEach(name => {
    const isLocked = name === "S&P 500";
    const isChecked = checkedAssets.has(name);
    const wouldExceed = !isLocked && !isChecked && selectedCount >= MAX_LONG_ASSETS;
    const label = document.createElement("label");
    label.className = `check-chip${isLocked ? " locked" : ""}${wouldExceed ? " disabled-soft" : ""}`;
    label.innerHTML = `<input type="checkbox" value="${name}" ${isChecked ? "checked" : ""} ${isLocked ? "disabled" : ""}/> <span>${assetLabel(name)}</span>`;
    const input = label.querySelector("input");
    input.addEventListener("change", function() {
      if (name === "S&P 500") return;
      const current = [...checkedAssets].filter(a => a !== "S&P 500").length;
      if (this.checked && current >= MAX_LONG_ASSETS) {
        this.checked = false;
        if (note) note.textContent = `Limit reached: keep this to five comparison assets so the lines and labels stay readable.`;
        return;
      }
      this.checked ? checkedAssets.add(name) : checkedAssets.delete(name);
      checkedAssets.add("S&P 500");
      renderCheckboxes();
      drawLongChart();
    });
    container.appendChild(label);
  });
}

function longSeriesForAsset(assetName, startDate, endDate) {
  const ticker = ASSET_INFO[assetName]?.ticker;
  if (!ticker || !wideData.length) return [];
  const rows = wideData
    .filter(d => d.date >= startDate && d.date <= endDate && Number.isFinite(d[ticker]))
    .sort((a, b) => a.date - b.date);
  if (!rows.length) return [];
  const first = rows[0][ticker];
  return rows.map(d => ({ date: d.date, value: 100 * d[ticker] / first, asset: assetName, ticker }));
}

function shortEpisodeLabel(name) {
  return ({
    "Dot-Com Crash": "Dot-com",
    "Global Financial Crisis": "2008",
    "COVID Crash": "COVID",
    "2022 Inflation Shock": "2022 inf.",
    "Regional Banking Crisis": "Banks",
    "AI Rally": "AI"
  })[name] || name;
}

function fitLabelY(labels, minGap, h) {
  const sorted = labels.slice().sort((a,b) => a.y - b.y);
  sorted.forEach((d, i) => {
    if (i === 0) d.y2 = Math.max(10, Math.min(h - 6, d.y));
    else d.y2 = Math.max(d.y, sorted[i-1].y2 + minGap);
  });
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].y2 > h - 6) sorted[i].y2 = h - 6;
    if (i < sorted.length - 1) sorted[i].y2 = Math.min(sorted[i].y2, sorted[i+1].y2 - minGap);
  }
  sorted.forEach(d => { d.y2 = Math.max(10, d.y2); });
  return sorted;
}

function drawLongChart() {
  const el = $("long-chart");
  if (!el) return;
  d3.select(el).selectAll("*").remove();

  if (!episodeMeta.length) return;

  const startDate = new Date("2000-01-01");
  const revealedEpisode = episodeMeta[Math.min(longRevealIdx, episodeMeta.length - 1)];
  const endDate = new Date(revealedEpisode.end);

  const titleEl = $("long-chart-title");
  if (titleEl) titleEl.textContent = longRevealIdx === 0
    ? `The ${revealedEpisode.episode}`
    : `Through the ${revealedEpisode.episode}`;

  const continueBtn = $("continue-next-crisis");
  if (continueBtn) {
    if (longRevealIdx >= episodeMeta.length - 1) {
      continueBtn.textContent = "Full history revealed";
      continueBtn.disabled = true;
      continueBtn.style.opacity = "0.4";
    } else {
      const next = episodeMeta[longRevealIdx + 1];
      continueBtn.textContent = `Continue into ${next.episode} →`;
      continueBtn.disabled = false;
      continueBtn.style.opacity = "1";
    }
  }

  const selectedNames = [...checkedAssets];
  const series = selectedNames
    .map(name => ({ name, values: longSeriesForAsset(name, startDate, endDate) }))
    .filter(s => s.values.length > 0);

  if (!series.length) {
    el.innerHTML = `<p style="padding:60px;text-align:center;color:#aaa">No data available. Make sure asset_prices_wide.csv is in the data folder.</p>`;
    return;
  }

  const all = series.flatMap(s => s.values);
  const W = el.clientWidth || 980, H = 455;
  const margin = { top: 55, right: 138, bottom: 50, left: 68 };
  const w = W - margin.left - margin.right, h = H - margin.top - margin.bottom;

  const x = d3.scaleTime().domain([startDate, endDate]).range([0, w]);
  const maxVal = d3.max(all, d => d.value);
  const minVal = d3.min(all, d => d.value);
  const logMode = useLogScale && minVal > 0;
  const y = logMode
    ? d3.scaleLog().domain([Math.max(10, minVal * 0.8), maxVal * 1.12]).range([h, 0])
    : d3.scaleLinear().domain([Math.max(0, minVal * 0.86), maxVal * 1.12]).nice().range([h, 0]);

  const svg = d3.select(el).append("svg").attr("width", "100%").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(y).ticks(6).tickSize(-w).tickFormat(""))
    .call(gx => { gx.select(".domain").remove(); gx.selectAll("line").attr("stroke", "#f0f0f0"); });

  // Crisis bands + labels — labels sit ABOVE the chart (negative y) to avoid data overlap.
  // Stagger into up to 3 rows when episodes cluster together.
  let lastLabelRight = -Infinity;
  let labelRow = 0;
  episodeMeta.slice(0, longRevealIdx + 1).forEach((ep) => {
    const s = new Date(ep.start), e = new Date(ep.end);
    if (e < startDate) return;
    const x0 = Math.max(0, x(s));
    const x1 = Math.min(w, x(e));
    if (x1 > x0) {
      const bw = Math.max(4, x1 - x0);
      g.append("rect")
        .attr("class", "long-crisis-band")
        .attr("x", x0).attr("y", 0).attr("width", bw).attr("height", h)
        .attr("fill", "#5f8f74").attr("opacity", 0.18);

      const shortName = ep.episode
        .replace("Global Financial Crisis", "2008 Crisis")
        .replace("Regional Banking Crisis", "Banking Crisis")
        .replace("2022 Inflation Shock", "Inflation Shock");
      const estWidth = shortName.length * 6.5;
      if (x0 < lastLabelRight + 8) {
        labelRow = Math.min(labelRow + 1, 2);
      } else {
        labelRow = 0;
      }
      const labelY = -40 + labelRow * 14;
      g.append("text")
        .attr("class", "long-crisis-label")
        .attr("x", x0 + 4).attr("y", labelY)
        .attr("fill", "#006b45").attr("font-size", 10).attr("font-weight", 800)
        .text(shortName);
      lastLabelRight = x0 + estWidth;
    }
  });

  if (logMode) {
    g.append("text").attr("x", w).attr("y", 14).attr("text-anchor", "end")
      .attr("fill", "#999").attr("font-size", 10).attr("font-style", "italic")
      .text("Log scale — toggle off to see linear.");
  }

  g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(100)).attr("y2", y(100))
    .attr("stroke", "#ddd").attr("stroke-dasharray", "5,4").attr("stroke-width", 1.5);

  const lineGen = d3.line()
    .defined(d => Number.isFinite(d.value) && d.value > 0)
    .x(d => x(d.date)).y(d => y(d.value)).curve(d3.curveMonotoneX);

  const drawOrder = series.slice().sort((a,b) => (a.name === "S&P 500") - (b.name === "S&P 500"));
  const labelData = [];

  drawOrder.forEach((s) => {
    const isSpy = s.name === "S&P 500";
    const isSelected = s.name === state.asset;
    const color = isSpy ? BENCHMARK_COLOR : isSelected ? SELECTED_ASSET_COLOR : (ASSET_COLORS[s.name] || "#777");

    const path = g.append("path").datum(s.values)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", isSpy ? 3.2 : isSelected ? 3 : 1.9)
      .attr("opacity", isSpy ? 1 : 0.86)
      .attr("d", lineGen);
    animatePath(path, isSpy ? 1000 : 1600);

    const last = s.values[s.values.length - 1];
    const ticker = ASSET_INFO[s.name]?.ticker || s.name;
    labelData.push({ name: s.name, ticker, value: last.value, x: x(last.date), y: y(last.value), color, isSpy });
  });

  fitLabelY(labelData, 14, h).forEach(d => {
    g.append("path")
      .attr("d", `M${d.x+2},${d.y} L${w+4},${d.y2}`)
      .attr("stroke", d.color).attr("stroke-width", 0.7).attr("opacity", 0.45).attr("fill", "none");
    g.append("text").attr("x", w + 8).attr("y", d.y2 + 4)
      .attr("fill", d.color).attr("font-size", 10).attr("font-weight", d.isSpy ? 800 : 700)
      .text(`${d.ticker} ${fmtDollar(d.value)}`);
  });

  g.append("g").attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(8))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d3.format(",.0f")(d)}`))
    .call(gx => gx.select(".domain").attr("stroke", "#eee"));
  g.append("text").attr("class", "axis-label").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -54).attr("text-anchor", "middle")
    .text(logMode ? "Value of $100 (log scale)" : "Value of $100 from start of data");
  g.append("text").attr("class", "axis-label")
    .attr("x", w / 2).attr("y", h + 42).attr("text-anchor", "middle")
    .text("Date");

  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1", 0).attr("y2", h)
    .attr("stroke", "#d7d2c8").attr("stroke-dasharray", "3 3").style("opacity", 0);
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
        if (d) html += `<br/>${assetLabel(s.name)}: <b>${fmtDollar(d.value)}</b>`;
      });
      tooltip.style("opacity", 1)
        .style("left", (event.clientX + 14) + "px").style("top", (event.clientY - 48) + "px")
        .html(html);
    })
    .on("mouseleave", () => { hoverLine.style("opacity", 0); tooltip.style("opacity", 0); });
}

function continueToNextCrisis() {
  if (longRevealIdx < episodeMeta.length - 1) {
    longRevealIdx++;
    drawLongChart();
  }
}

// ── MARKET TABLE / CLICKABLE ASSET GUIDE ─────────────────────────────────────
function renderTable() {
  buildGlossaryCards();
}

function buildGlossaryCards() {
  const container = $("glossary-cards");
  if (!container) return;
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  const assets = ["S&P 500", ...allStressTestAssets()].filter(name => {
    if (activeFilter === "all") return true;
    const group = ASSET_INFO[name]?.group;
    if (activeFilter === "old") return group === "Old money";
    if (activeFilter === "new") return group === "New money";
    return true;
  });

  const activeEpisode = state.episode || episodeMeta[0]?.episode;
  container.innerHTML = `
    <div class="asset-guide-table">
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Role</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          ${assets.map(name => {
            const info = ASSET_INFO[name] || {};
            const status = availabilityStatus(name, activeEpisode);
            const previewSource = status.kind === "missing" || status.kind === "partial" ? status.detail : (info.description || "");
            const cleanPreview = (previewSource || "").replace(/<[^>]*>/g, "");
            const preview = cleanPreview.slice(0, 145) + (cleanPreview.length > 145 ? "…" : "");
            const filterClass = info.group === "New money" ? "new-row" : info.group === "Old money" ? "old-row" : "base-row";
            return `<tr class="asset-guide-row ${filterClass}" data-asset="${name}">
              <td class="asset-col">${assetLabelHTML(name)}</td>
              <td>${info.group || "Asset"}</td>
              <td class="why-col">${preview} <span class="row-action">Open notes →</span></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
  container.querySelectorAll(".asset-guide-row").forEach(row => {
    row.addEventListener("click", () => openGlossaryModal(row.dataset.asset));
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      buildGlossaryCards();
    };
  });
}

function openGlossaryModal(assetName) {
  const info = ASSET_INFO[assetName];
  if (!info) return;
  const isNew = info.group === "New money";
  const explainer = GROUP_EXPLAINER[info.group] || "";
  const episodeListHTML = Object.keys(EPISODE_TAKEAWAYS).map(ep => {
    const takeaway = EPISODE_TAKEAWAYS[ep]?.[assetName];
    if (!takeaway) return "";
    const row = summaryData.find(d => d.episode === ep && d.asset_name === assetName);
    const status = availabilityStatus(assetName, ep);
    const retBadge = row
      ? `<span class="modal-ret-badge ${row.total_return_pct >= 0 ? "pos" : "neg"}">${fmtPct(row.total_return_pct)}${status.kind === "partial" ? " · partial" : ""}</span>`
      : `<span class="modal-ret-badge muted">${status.short || "not available"}</span>`;
    const statusLine = status.kind === "full" ? "" : `<div class="modal-data-note">${status.detail}</div>`;
    return `
      <li class="modal-episode-item">
        <div class="modal-episode-name"><span>${ep}</span>${retBadge}</div>
        <div class="modal-episode-takeaway">${takeaway}</div>
        ${statusLine}
      </li>`;
  }).filter(Boolean).join("");

  $("modal-content").innerHTML = `
    <div class="modal-asset-name">${assetLabelHTML(assetName)}</div>
    <span class="modal-group-badge ${isNew ? "new-money" : info.group === "Old money" ? "old-money" : "base-money"}">${info.group}</span>
    <p class="modal-description">${info.description}</p>
    <div class="modal-group-explainer"><b>Category context:</b> ${explainer}</div>
    <p class="modal-description" style="margin-top:14px"><b>Example:</b> ${info.example}</p>
    <div class="modal-episodes-label">Performance notes by episode</div>
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
const PB = { year: 2007, selected: new Set(), weights: {}, autoBalance: true, showBest: false };

function buildPortfolioBuilder() {
  const assets = allStressTestAssets();
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
    PB.showBest = false;
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

  const autoToggle = $("pb-auto-balance");
  if (autoToggle) {
    autoToggle.checked = PB.autoBalance;
    autoToggle.addEventListener("change", function() {
      PB.autoBalance = this.checked;
      if (PB.autoBalance && PB.selected.size) {
        const assetsNow = [...PB.selected];
        const first = assetsNow[0];
        rebalanceWeights(first, PB.weights[first] || Math.round(100 / assetsNow.length));
      }
      syncWeightControls();
      updateTotalPct();
      renderPBChart();
    });
  }
  const bestBtn = $("pb-show-best-btn");
  if (bestBtn) {
    bestBtn.addEventListener("click", () => {
      PB.showBest = true;
      renderBestCombo();
      $("pb-best-combo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Asset pills — old money row first, new money row second
  const pillContainer = $("pb-asset-pills");
  const oldAssets = assets.filter(name => ASSET_INFO[name]?.group !== "New money");
  const newAssets = assets.filter(name => ASSET_INFO[name]?.group === "New money");

  const makeRow = (list, rowClass) => {
    const row = document.createElement("div");
    row.className = `pb-pill-row ${rowClass}`;
    list.forEach(name => {
      const isNew = ASSET_INFO[name]?.group === "New money";
      const pill = document.createElement("button");
      pill.className = `pb-pill ${isNew ? "pb-pill-new" : "pb-pill-old"}`;
      pill.textContent = assetLabel(name);
      pill.dataset.asset = name;
      pill.addEventListener("click", () => togglePBAsset(name));
      row.appendChild(pill);
    });
    return row;
  };

  pillContainer.appendChild(makeRow(oldAssets, "pb-row-old"));
  pillContainer.appendChild(makeRow(newAssets, "pb-row-new"));
}

function togglePBAsset(name) {
  if (PB.selected.has(name)) { PB.selected.delete(name); delete PB.weights[name]; }
  else { PB.selected.add(name); }
  PB.showBest = false;
  document.querySelectorAll(".pb-pill-row .pb-pill").forEach(p => p.classList.toggle("pb-pill-active", PB.selected.has(p.dataset.asset)));
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
    const color = isNew ? NEW_MONEY_COLOR : OLD_MONEY_COLOR;
    const safeId = safePBId(name);
    const row = document.createElement("div");
    row.className = "pb-slider-row";
    row.innerHTML = `
      <div class="pb-slider-label"><span class="pb-slider-dot" style="background:${color}"></span><span>${assetLabel(name)}</span></div>
      <input type="range" class="pb-weight-slider" data-asset="${name}" min="0" max="100" step="1" value="${PB.weights[name]}" />
      <input type="number" class="pb-weight-number" data-asset="${name}" min="0" max="100" step="1" value="${PB.weights[name]}" aria-label="${assetLabel(name)} percent" />
      <span class="pb-weight-val" id="pbw-${safeId}">${PB.weights[name]}%</span>`;
    slidersEl.appendChild(row);
  });
  slidersEl.querySelectorAll(".pb-weight-slider, .pb-weight-number").forEach(input => {
    input.addEventListener("input", function() {
      const asset = this.dataset.asset;
      const val = Math.max(0, Math.min(100, Math.round(+this.value || 0)));
      if (PB.autoBalance) rebalanceWeights(asset, val);
      else PB.weights[asset] = val;
      syncWeightControls();
      updateTotalPct();
      renderPBChart();
    });
  });
  syncWeightControls();
  updateTotalPct();
}

function safePBId(name) {
  return name.replace(/[^a-z0-9]/gi,"_");
}

function rebalanceWeights(changedAsset, changedValue) {
  const assets = [...PB.selected];
  if (!assets.length) return;
  changedValue = Math.max(0, Math.min(100, Math.round(changedValue)));
  if (assets.length === 1) {
    PB.weights[changedAsset] = 100;
    return;
  }
  const others = assets.filter(a => a !== changedAsset);
  const remaining = 100 - changedValue;
  const base = Math.floor(remaining / others.length);
  let rem = remaining - base * others.length;
  PB.weights[changedAsset] = changedValue;
  others.forEach((asset, i) => {
    PB.weights[asset] = base + (i < rem ? 1 : 0);
  });
}

function syncWeightControls() {
  Object.entries(PB.weights).forEach(([name, w]) => {
    document.querySelectorAll(`.pb-weight-slider[data-asset="${CSS.escape(name)}"], .pb-weight-number[data-asset="${CSS.escape(name)}"]`).forEach(el => { el.value = w; });
    const label = $(`pbw-${safePBId(name)}`);
    if (label) label.textContent = w + "%";
  });
}

function updateTotalPct() {
  const total = Object.values(PB.weights).reduce((s,v) => s+v, 0);
  const totalEl = $("pb-total-pct");
  const warnEl = $("pb-total-warn");
  if (!totalEl) return;
  totalEl.textContent = total + "%";
  totalEl.style.color = total === 100 ? "#2a9d5c" : "#d9534f";
  if (warnEl) warnEl.style.display = total !== 100 ? "inline" : "none";
  syncWeightControls();
}

function getPortfolioTimeSeries(selectedAssets, weights, startYear) {
  const startDate = new Date(`${startYear}-01-01`);
  const totalWeight = Object.values(weights).reduce((s, v) => s + v, 0);
  if (totalWeight === 0 || !wideData.length) return [];

  const rows = wideData.filter(d => d.date >= startDate).sort((a, b) => a.date - b.date);
  if (!rows.length) return [];

  // Find each asset's base price at its first available date on or after startDate
  const basePrices = {};
  selectedAssets.forEach(name => {
    const ticker = ASSET_INFO[name]?.ticker;
    if (!ticker) return;
    const first = rows.find(d => Number.isFinite(d[ticker]));
    if (first) basePrices[ticker] = first[ticker];
  });

  return rows.map(row => {
    let val = 0, weightCovered = 0;
    selectedAssets.forEach(name => {
      const ticker = ASSET_INFO[name]?.ticker;
      const w = (weights[name] || 0) / totalWeight;
      if (ticker && Number.isFinite(row[ticker]) && basePrices[ticker]) {
        val += w * (100 * row[ticker] / basePrices[ticker]);
        weightCovered += w;
      }
    });
    // Only emit a point when all selected assets have price data
    return weightCovered >= 0.99 ? { date: row.date, value: val } : null;
  }).filter(Boolean);
}

function getSPTimeSeries(startYear) {
  const startDate = new Date(`${startYear}-01-01`);
  const rows = wideData.filter(d => d.date >= startDate && Number.isFinite(d["SPY"]))
    .sort((a, b) => a.date - b.date);
  if (!rows.length) return [];
  const base = rows[0]["SPY"];
  return rows.map(d => ({ date: d.date, value: 100 * d["SPY"] / base }));
}

function renderPBChart() {
  const chartArea = $("pb-chart-area");
  const chartEl = $("pb-line-chart");
  const legendEl = $("pb-legend");
  if (!chartArea || !chartEl) return;
  const selected = [...PB.selected];
  const total = Object.values(PB.weights).reduce((s,v) => s+v, 0);
  if (selected.length === 0 || total !== 100) { chartArea.style.display = "none"; $("pb-best-combo") && ($("pb-best-combo").style.display = "none"); return; }
  chartArea.style.display = "block";
  const bestBtn = $("pb-show-best-btn");
  if (bestBtn) bestBtn.style.display = "inline-flex";

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
    const spPath = g.append("path").datum(spSeries)
      .attr("fill","none").attr("stroke",BENCHMARK_COLOR)
      .attr("stroke-width",2.5).attr("d",lineGen);
    animatePath(spPath, 1000);
    const spLast = spSeries[spSeries.length-1];
    g.append("text").attr("x",x(spLast.date)+6).attr("y",y(spLast.value)+4).attr("fill",BENCHMARK_COLOR).attr("font-size",11).attr("font-weight",600).text(`$${spLast.value.toFixed(0)}`);
  }
  const portPath = g.append("path").datum(portfolioSeries).attr("fill","none").attr("stroke",SELECTED_ASSET_COLOR).attr("stroke-width",2.6).attr("d",lineGen);
  const portLen = portPath.node().getTotalLength();
  portPath.attr("stroke-dasharray",portLen).attr("stroke-dashoffset",portLen).transition().duration(1200).delay(200).ease(d3.easeQuadInOut).attr("stroke-dashoffset",0);
  const portLast = portfolioSeries[portfolioSeries.length-1];
  g.append("text").attr("x",x(portLast.date)+6).attr("y",y(portLast.value)+4).attr("fill",portLast.value>=100?"#2a9d5c":"#d9534f").attr("font-size",14).attr("font-weight",800).text(`$${portLast.value.toFixed(0)}`);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("text").attr("class","axis-label").attr("x",w/2).attr("y",h+40).attr("text-anchor","middle").text("Date");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-48).attr("text-anchor","middle").text("Value of $100");

  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1",0).attr("y2",h).attr("stroke","#555").attr("stroke-width",1.5).attr("stroke-dasharray","5 3").style("opacity",0);
  const portDot  = g.append("circle").attr("r",5).attr("fill",SELECTED_ASSET_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const spyDotPB = g.append("circle").attr("r",5).attr("fill",BENCHMARK_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
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
      portDot.attr("cx",x(pd.date)).attr("cy",y(pd.value)).style("opacity",1);
      if (sd) spyDotPB.attr("cx",x(sd.date)).attr("cy",y(sd.value)).style("opacity",1);
      else spyDotPB.style("opacity",0);
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${pd.date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}</b><br/><span style="color:#0b6f45">● Your portfolio</span> <b>$${pd.value.toFixed(2)}</b>${sd ? `<br/><span style="color:#111">● S&P 500</span> <b>$${sd.value.toFixed(2)}</b>` : ""}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity",0); portDot.style("opacity",0); spyDotPB.style("opacity",0); tooltip.style("opacity",0); });

  if (legendEl) legendEl.innerHTML = `<span class="pb-leg-item"><span class="pb-leg-swatch" style="background:${SELECTED_ASSET_COLOR}"></span>Your portfolio</span><span class="pb-leg-item"><span class="pb-leg-swatch" style="background:${BENCHMARK_COLOR}"></span>S&amp;P 500</span>`;
}

function assetFinalReturn(assetName, startYear) {
  const ticker = ASSET_INFO[assetName]?.ticker;
  if (!ticker || !wideData.length) return null;
  const startDate = new Date(`${startYear}-01-01`);
  const rows = wideData.filter(d => d.date >= startDate && Number.isFinite(d[ticker]))
    .sort((a, b) => a.date - b.date);
  if (rows.length < 2) return null;
  return rows[rows.length - 1][ticker] / rows[0][ticker];
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
  if (!PB.showBest) { bestEl.style.display = "none"; return; }
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
          return `<span class="pb-best-pill ${isNew ? "pb-pill-new" : "pb-pill-old"}">${assetLabel(name)} <b>${displayPcts[i]}%</b></span>`;
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
    const sp = g.append("path").datum(spSeries)
      .attr("fill","none").attr("stroke",BENCHMARK_COLOR)
      .attr("stroke-width",2.5).attr("d",lineGen);
    animatePath(sp, 1000);
    const sl = spSeries[spSeries.length-1];
    g.append("text").attr("x",x(sl.date)+6).attr("y",y(sl.value)+4).attr("fill",BENCHMARK_COLOR).attr("font-size",11).attr("font-weight",600).attr("opacity",0).text(`SPY $${sl.value.toFixed(0)}`).transition().delay(900).duration(300).attr("opacity",1);
  }
  const bp = g.append("path").datum(portfolioSeries).attr("fill","none").attr("stroke",SELECTED_ASSET_COLOR).attr("stroke-width",2.6).attr("d",lineGen);
  animatePath(bp, 1200);
  const bl = portfolioSeries[portfolioSeries.length-1];
  g.append("text").attr("x",x(bl.date)+6).attr("y",y(bl.value)+4).attr("fill",SELECTED_ASSET_COLOR).attr("font-size",14).attr("font-weight",800).attr("opacity",0).text(`Best $${bl.value.toFixed(0)}`).transition().delay(1100).duration(300).attr("opacity",1);
  g.append("g").attr("transform",`translate(0,${h})`).call(d3.axisBottom(x).ticks(6)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`)).call(gx => gx.select(".domain").attr("stroke","#eee"));
  g.append("text").attr("class","axis-label").attr("x",w/2).attr("y",h+40).attr("text-anchor","middle").text("Date");
  g.append("text").attr("class","axis-label").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-48).attr("text-anchor","middle").text("Value of $100");

  const tooltip = d3.select("#tooltip");
  const hoverLine = g.append("line").attr("y1",0).attr("y2",h).attr("stroke","#555").attr("stroke-width",1.5).attr("stroke-dasharray","5 3").style("opacity",0);
  const bestDot  = g.append("circle").attr("r",5).attr("fill",SELECTED_ASSET_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const spyDotBC = g.append("circle").attr("r",5).attr("fill",BENCHMARK_COLOR).attr("stroke","white").attr("stroke-width",2).style("opacity",0);
  const bisect = d3.bisector(d => d.date).left;
  g.append("rect").attr("width",w).attr("height",h).attr("fill","none").attr("pointer-events","all")
    .on("mousemove", function(event) {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const bi = Math.min(bisect(portfolioSeries, date, 1), portfolioSeries.length-1);
      const si = spSeries.length ? Math.min(bisect(spSeries, date, 1), spSeries.length-1) : -1;
      const bd = portfolioSeries[bi];
      const sd = si >= 0 ? spSeries[si] : null;
      hoverLine.attr("x1",mx).attr("x2",mx).style("opacity",1);
      bestDot.attr("cx",x(bd.date)).attr("cy",y(bd.value)).style("opacity",1);
      if (sd) spyDotBC.attr("cx",x(sd.date)).attr("cy",y(sd.value)).style("opacity",1);
      else spyDotBC.style("opacity",0);
      tooltip.style("opacity",1).style("left",(event.clientX+14)+"px").style("top",(event.clientY-48)+"px")
        .html(`<b>${bd.date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}</b><br/><span style="color:#0b6f45">● Best mix</span> <b>$${bd.value.toFixed(2)}</b>${sd ? `<br/><span style="color:#111">● S&P 500</span> <b>$${sd.value.toFixed(2)}</b>` : ""}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity",0); bestDot.style("opacity",0); spyDotBC.style("opacity",0); tooltip.style("opacity",0); });
}