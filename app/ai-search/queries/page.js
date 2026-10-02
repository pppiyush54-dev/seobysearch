'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ─── Static demo dataset ─── */
const DEMO_DATA = {
  domain: 'seobysearch.com',
  overallScore: 72,
  metrics: [
    { label: 'AI Visibility Score', value: '72', unit: '/100', delta: '+8', positive: true, icon: '🧠', color: 'blue' },
    { label: 'Total Citations', value: '1,240', unit: '', delta: '+214', positive: true, icon: '🔗', color: 'green' },
    { label: 'Branded Queries', value: '38', unit: '', delta: '+5', positive: true, icon: '🏷️', color: 'purple' },
    { label: 'Unbranded Wins', value: '96', unit: '', delta: '-3', positive: false, icon: '🎯', color: 'orange' },
  ],
  queries: [
    { query: 'best seo agency for b2b saas', engine: 'ChatGPT', intent: 'Commercial', volume: 2400, position: 2, trend: [30,40,38,55,60,72,80], cited: true, difficulty: 'Medium' },
    { query: 'generative engine optimisation services', engine: 'Perplexity', intent: 'Commercial', volume: 880, position: 1, trend: [10,18,25,40,60,75,90], cited: true, difficulty: 'Low' },
    { query: 'how to rank in ai overviews', engine: 'Google AI', intent: 'Informational', volume: 5200, position: 4, trend: [55,60,58,62,65,60,63], cited: false, difficulty: 'Hard' },
    { query: 'llm seo agency uk', engine: 'ChatGPT', intent: 'Commercial', volume: 320, position: 3, trend: [5,8,12,20,28,35,42], cited: true, difficulty: 'Low' },
    { query: 'aeo answer engine optimisation', engine: 'Gemini', intent: 'Informational', volume: 1100, position: 2, trend: [20,25,30,35,42,50,58], cited: true, difficulty: 'Medium' },
    { query: 'seo for chatgpt visibility', engine: 'Perplexity', intent: 'Commercial', volume: 760, position: 5, trend: [15,15,18,22,20,25,28], cited: false, difficulty: 'Medium' },
    { query: 'enterprise seo with ai integration', engine: 'Google AI', intent: 'Commercial', volume: 430, position: 3, trend: [8,12,16,20,25,30,36], cited: true, difficulty: 'Medium' },
    { query: 'perplexity seo optimisation tips', engine: 'Perplexity', intent: 'Informational', volume: 590, position: 6, trend: [30,28,32,35,33,38,40], cited: false, difficulty: 'Hard' },
    { query: 'geo strategy for ecommerce brands', engine: 'ChatGPT', intent: 'Commercial', volume: 210, position: 1, trend: [2,5,8,14,20,28,36], cited: true, difficulty: 'Low' },
    { query: 'how do ai search engines rank content', engine: 'Gemini', intent: 'Informational', volume: 3800, position: 7, trend: [60,65,62,70,68,72,75], cited: false, difficulty: 'Hard' },
  ],
}

const ENGINE_COLORS = {
  'ChatGPT': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Perplexity': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  'Google AI': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Gemini': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
}

const INTENT_COLORS = {
  Commercial: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Informational: { bg: 'bg-gray-100', text: 'text-gray-600' },
  Navigational: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
}

const DIFF_COLORS = {
  Low: { bg: 'bg-green-50', text: 'text-green-700' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Hard: { bg: 'bg-red-50', text: 'text-red-700' },
}

function Sparkline({ data, positive }) {
  const max = Math.max(...data), min = Math.min(...data)
  const h = 28, w = 70
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  const color = positive !== false ? '#22c55e' : '#f97316'
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" points={pts} />
    </svg>
  )
}

function ScoreRing({ score }) {
  const r = 36, circ = 2 * Math.PI * r
  const pct = (score / 100) * circ
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${pct} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 50 50)" />
      <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f172a">{score}</text>
    </svg>
  )
}

export default function AISearchQueriesPage() {
  const [domain, setDomain] = useState('')
  const [activeEngine, setActiveEngine] = useState('All')
  const [sortCol, setSortCol] = useState('volume')
  const [sortDir, setSortDir] = useState('desc')
  const [analysed, setAnalysed] = useState(true) // show demo on load

  const data = DEMO_DATA
  const ENGINES = ['All', 'ChatGPT', 'Google AI', 'Gemini', 'Perplexity']

  const filtered = data.queries
    .filter(q => activeEngine === 'All' || q.engine === activeEngine)
    .sort((a, b) => {
      const dir = sortDir === 'desc' ? -1 : 1
      if (sortCol === 'volume') return dir * (a.volume - b.volume)
      if (sortCol === 'position') return -dir * (a.position - b.position)
      if (sortCol === 'query') return dir * a.query.localeCompare(b.query)
      return 0
    })

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const SortIcon = ({ col }) => sortCol !== col ? (
    <span className="text-gray-300 ml-1">↕</span>
  ) : sortDir === 'desc' ? (
    <span className="text-blue-500 ml-1">↓</span>
  ) : (
    <span className="text-blue-500 ml-1">↑</span>
  )

  return (
    <div className="min-h-screen bg-[#F0F2F7]">

      {/* ── Top nav bar ── */}
      <div className="bg-[#08111F] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white font-black text-lg tracking-tight">SEO<span className="text-blue-400">by</span>Search</Link>
            <span className="text-white/20">|</span>
            <nav className="hidden md:flex items-center gap-5">
              {['AI Queries','Visibility','Citations','Competitors','Settings'].map((t,i) => (
                <button key={t} className={`text-sm font-medium transition-colors ${i===0?'text-white border-b-2 border-blue-400 pb-0.5':'text-white/50 hover:text-white'}`}>{t}</button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">Demo workspace</span>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">PP</div>
          </div>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-3">
          <div className="flex-1 max-w-xl relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="Enter domain or keyword, e.g. seobysearch.com"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50"
            />
          </div>
          <button
            onClick={() => setAnalysed(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Analyse
          </button>
          <div className="flex items-center gap-2 ml-2 text-xs text-gray-400 hidden md:flex">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse-dot"></span>Live data</span>
            <span>•</span>
            <span>Updated: Sep 25, 2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">AI Search Intelligence</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">AI Search Queries</h1>
            <p className="text-sm text-gray-500 mt-1">Track where your brand appears in ChatGPT, Gemini, Perplexity & Google AI answers.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:border-blue-300 transition-colors">
              📅 Last 30 days
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:border-blue-300 transition-colors">
              ⬇️ Export CSV
            </button>
          </div>
        </div>

        {/* ── Score + Metric cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {/* Score ring */}
          <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center gap-1">
            <ScoreRing score={data.overallScore} />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Overall Score</p>
            <p className="text-xs text-green-600 font-medium">▲ +8 this month</p>
          </div>

          {/* 4 metric cards */}
          {data.metrics.map(m => {
            const colorMap = {
              blue: { ring: 'ring-blue-100', icon: 'bg-blue-50', delta: 'text-green-600', neg: 'text-orange-500' },
              green: { ring: 'ring-green-100', icon: 'bg-green-50', delta: 'text-green-600', neg: 'text-orange-500' },
              purple: { ring: 'ring-purple-100', icon: 'bg-purple-50', delta: 'text-green-600', neg: 'text-orange-500' },
              orange: { ring: 'ring-orange-100', icon: 'bg-orange-50', delta: 'text-green-600', neg: 'text-orange-500' },
            }[m.color]
            return (
              <div key={m.label} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ring-1 ${colorMap.ring}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl w-10 h-10 ${colorMap.icon} rounded-xl flex items-center justify-center`}>{m.icon}</span>
                  <span className={`text-xs font-semibold ${m.positive ? colorMap.delta : colorMap.neg}`}>{m.delta}</span>
                </div>
                <p className="text-2xl font-black text-gray-900">{m.value}<span className="text-sm font-normal text-gray-400 ml-0.5">{m.unit}</span></p>
                <p className="text-xs text-gray-500 font-medium mt-1">{m.label}</p>
              </div>
            )
          })}
        </div>

        {/* ── Engine filter tabs + table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

          {/* Table toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {ENGINES.map(e => (
                <button
                  key={e}
                  onClick={() => setActiveEngine(e)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${activeEngine === e ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {e !== 'All' ? <span className={`inline-block w-1.5 h-1.5 rounded-full ${ENGINE_COLORS[e]?.dot} mr-1.5`}></span> : null}
                  {e}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{filtered.length} queries</span>
              <span className="text-gray-200">|</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>Cited
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>Not cited
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/60">
                  <th className="pl-6 pr-3 py-3 text-left w-8">#</th>
                  <th className="px-3 py-3 text-left cursor-pointer select-none hover:text-gray-700" onClick={() => handleSort('query')}>
                    Query <SortIcon col="query" />
                  </th>
                  <th className="px-3 py-3 text-left">Engine</th>
                  <th className="px-3 py-3 text-left">Intent</th>
                  <th className="px-3 py-3 text-left cursor-pointer select-none hover:text-gray-700" onClick={() => handleSort('volume')}>
                    AI Volume <SortIcon col="volume" />
                  </th>
                  <th className="px-3 py-3 text-left cursor-pointer select-none hover:text-gray-700" onClick={() => handleSort('position')}>
                    Position <SortIcon col="position" />
                  </th>
                  <th className="px-3 py-3 text-left">Difficulty</th>
                  <th className="px-3 py-3 text-left">Cited</th>
                  <th className="px-3 py-3 text-left pr-6">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => {
                  const eng = ENGINE_COLORS[row.engine] || { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' }
                  const int_ = INTENT_COLORS[row.intent] || INTENT_COLORS.Informational
                  const diff = DIFF_COLORS[row.difficulty] || DIFF_COLORS.Medium
                  return (
                    <tr key={row.query} className="border-t border-gray-50 hover:bg-blue-50/30 transition-colors group">
                      <td className="pl-6 pr-3 py-4 text-gray-400 font-medium">{idx + 1}</td>
                      <td className="px-3 py-4 max-w-xs">
                        <div className="flex items-start gap-2">
                          <div>
                            <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors leading-tight">{row.query}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${eng.bg} ${eng.text} rounded-full px-2.5 py-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${eng.dot}`}></span>
                          {row.engine}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`text-xs font-medium ${int_.bg} ${int_.text} rounded-full px-2.5 py-1`}>{row.intent}</span>
                      </td>
                      <td className="px-3 py-4 font-semibold text-gray-800">{row.volume.toLocaleString()}</td>
                      <td className="px-3 py-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${row.position <= 2 ? 'bg-green-100 text-green-700' : row.position <= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-50 text-red-600'}`}>
                          {row.position}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`text-xs font-medium ${diff.bg} ${diff.text} rounded-full px-2.5 py-1`}>{row.difficulty}</span>
                      </td>
                      <td className="px-3 py-4">
                        {row.cited ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full px-2.5 py-1">✓ Yes</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 rounded-full px-2.5 py-1">— No</span>
                        )}
                      </td>
                      <td className="px-3 py-4 pr-6">
                        <Sparkline data={row.trend} positive={row.trend[row.trend.length-1] > row.trend[0]} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Showing {filtered.length} of {data.queries.length} queries · Updated hourly</p>
            <button className="text-xs font-semibold text-blue-600 hover:underline">Load more →</button>
          </div>
        </div>

        {/* ── Insight panel ── */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Engine Distribution</p>
            <div className="space-y-3">
              {[['ChatGPT', 40, 'bg-emerald-500'], ['Google AI', 28, 'bg-blue-500'], ['Perplexity', 20, 'bg-violet-500'], ['Gemini', 12, 'bg-orange-500']].map(([name, pct, col]) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 w-20">{name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className={`${col} h-2 rounded-full`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Query Intent Mix</p>
            <div className="space-y-3">
              {[['Commercial', 58, 'bg-blue-500'], ['Informational', 34, 'bg-gray-400'], ['Navigational', 8, 'bg-yellow-400']].map(([name, pct, col]) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 w-24">{name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className={`${col} h-2 rounded-full`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl shadow-sm p-5 text-white">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-3">🔔 Top Opportunity</p>
            <p className="font-bold text-base mb-2 leading-snug">"how to rank in ai overviews"</p>
            <p className="text-xs text-blue-100 mb-4">5,200 monthly AI queries · Currently position 4 · Not cited. Publishing a structured FAQ article could move you into top-3 citations within 30 days.</p>
            <button className="text-xs font-bold bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Build content brief →
            </button>
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-gray-400 pb-4">
          AI Search Queries tool · <Link href="/ai-search/" className="text-blue-500 hover:underline">Back to AI Search</Link> · Data refreshed hourly from live AI engine sampling
        </p>
      </div>
    </div>
  )
}
