import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'AI Search SEO – GEO, AEO & LLM SEO Services',
  description: 'AI search optimisation services including GEO (Generative Engine Optimisation), AEO (Answer Engine Optimisation) and LLM SEO. Be visible where AI search is taking over.',
  path: '/ai-search/',
})

const AI_SERVICES = [
  {
    icon: '🧠',
    title: 'GEO – Generative Engine Optimisation',
    desc: 'Optimise your brand to appear in AI-generated answers from ChatGPT, Google AI Overviews, Gemini and Perplexity.',
    href: '/ai-search/geo/',
    label: 'GEO',
  },
  {
    icon: '💬',
    title: 'AEO – Answer Engine Optimisation',
    desc: 'Structure content to win featured snippets, People Also Ask boxes, voice search and direct AI answers.',
    href: '/ai-search/aeo/',
    label: 'AEO',
  },
  {
    icon: '🤖',
    title: 'LLM SEO',
    desc: 'Ensure large language models accurately understand, represent and cite your brand when users ask relevant questions.',
    href: '/ai-search/llm-seo/',
    label: 'LLM SEO',
  },
]

export default function AISearchPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#08111F] to-[#1a2744] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label text-blue-300">AI Search</span>
          <h1 className="text-5xl font-black text-white tracking-tight mb-6 max-w-3xl">SEO for the Age of AI Search.</h1>
          <p className="text-xl text-blue-200 max-w-2xl mb-8">Search is changing. AI Overviews, ChatGPT, Gemini and Perplexity are becoming primary discovery channels. We help forward-thinking businesses optimise for all of them.</p>
          <Link href="/#audit" className="btn-primary text-base py-4 px-8">Get a Free AI Search Audit</Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">AI Search Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Three Disciplines. One Goal: AI Visibility.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {AI_SERVICES.map(({ icon, title, desc, href, label }) => (
              <Link key={title} href={href} className="p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all block group">
                <span className="text-4xl mb-5 block">{icon}</span>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">{label}</span>
                <h2 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-lg">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                <span className="text-blue-600 text-xs font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Why AI Search Optimisation Is Now Essential</h2>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">Google AI Overviews now appear for over 15% of all searches. ChatGPT serves hundreds of millions of users daily. Perplexity is growing as a primary research tool. Brands not optimised for AI search are invisible to a rapidly growing share of their potential customers.</p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              ['🔄','AI search is now','AI-generated answers are already the first thing millions of users see for discovery queries.'],
              ['📈','It will only grow','As AI models improve, more users will trust AI answers over traditional blue-link search results.'],
              ['⚡','Early movers win','Brands that build AI visibility now will compound that advantage as the channel grows.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="bg-white p-6 rounded-xl border border-gray-100">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Is Your Brand Visible in AI Search?"
        sub="Let's audit your AI search visibility and build a strategy across GEO, AEO and LLM SEO."
        primary={{ label: 'Get a Free AI Search Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an AI Search Specialist', href: '/contact/' }}
      />
    </>
  )
}
