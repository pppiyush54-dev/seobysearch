import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO Insights – AI Search, Technical SEO & Organic Growth Strategy',
  description: 'Practical SEO insights on technical SEO, AI search (GEO, AEO, LLM SEO), content strategy and organic growth. Guides, analysis and commentary from SEO By Search.',
  path: '/insights/',
})

const PLACEHOLDER_POSTS = [
  {
    category: 'AI SEO',
    title: 'What Google AI Overviews Mean for Your Organic Traffic in 2025',
    excerpt: 'AI Overviews are reshaping how users interact with search results. This guide covers what the data shows about click-through impact and how to position your content to appear in AI Overviews.',
    readTime: '8 min read',
    date: '[Publication Date]',
    slug: 'google-ai-overviews-organic-traffic',
  },
  {
    category: 'Technical SEO',
    title: 'JavaScript SEO in 2025: What Gets Rendered, What Gets Missed',
    excerpt: 'JavaScript-rendered content continues to challenge crawlability. This guide covers the current state of Googlebot\'s JS rendering, when it goes wrong and how to test and fix it.',
    readTime: '12 min read',
    date: '[Publication Date]',
    slug: 'javascript-seo-2025',
  },
  {
    category: 'GEO',
    title: 'Generative Engine Optimisation: A Practical Framework',
    excerpt: 'GEO is still an emerging discipline with more questions than answers. This is our working framework for helping brands build visibility in AI-generated answers across ChatGPT, Gemini and Perplexity.',
    readTime: '10 min read',
    date: '[Publication Date]',
    slug: 'geo-practical-framework',
  },
  {
    category: 'Ecommerce SEO',
    title: 'Category Page SEO: The Framework That Moves Revenue',
    excerpt: 'Category pages are the highest-commercial-intent pages on most ecommerce sites — and the most underoptimised. This guide covers the framework we use to systematically improve category page rankings.',
    readTime: '11 min read',
    date: '[Publication Date]',
    slug: 'category-page-seo-framework',
  },
  {
    category: 'Local SEO',
    title: 'Google Business Profile Optimisation: What Actually Moves the Needle',
    excerpt: 'GBP is your most powerful local ranking asset. This guide separates the factors that actually influence map pack rankings from the ones that don\'t — with actionable guidance for each.',
    readTime: '9 min read',
    date: '[Publication Date]',
    slug: 'google-business-profile-optimisation',
  },
  {
    category: 'Content Strategy',
    title: 'Topical Authority: How to Build It and Why It Matters More Than Ever',
    excerpt: 'Topical authority is increasingly how Google evaluates content quality in competitive niches. This guide covers what it is, how to audit where you stand, and how to build it systematically.',
    readTime: '13 min read',
    date: '[Publication Date]',
    slug: 'topical-authority-guide',
  },
]

export default function InsightsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">Insights</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">SEO Thinking for the AI Era.</h1>
          <p className="text-xl text-gray-600 max-w-xl">Practical guides, strategic analysis and clear thinking on technical SEO, AI search and organic growth — without the filler.</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 flex-wrap">
          {['All','AI SEO','Technical SEO','GEO','AEO','Ecommerce SEO','Local SEO','Content Strategy','Enterprise SEO'].map(cat => (
            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${cat === 'All' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 p-5 rounded-xl border border-amber-100 bg-amber-50">
            <p className="text-amber-800 text-sm"><strong>Note:</strong> Full article content is being published. These articles will be available shortly. Subscribe or check back for new content.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_POSTS.map(({ category, title, excerpt, readTime, date, slug }) => (
              <article key={slug} className="p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all group">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 block">{category}</span>
                <h2 className="font-bold text-gray-900 mb-3 text-base leading-snug group-hover:text-blue-600 transition-colors">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{readTime}</span>
                  <span className="text-blue-600 text-xs font-semibold">Read more →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Want SEO Insights Specific to Your Business?"
        sub="A free audit is worth more than a hundred general guides — it tells you exactly what to fix."
        primary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
