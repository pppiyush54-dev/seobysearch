import Link from 'next/link'
import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'AI SEO Services – Make Your Brand Easier for AI to Understand',
  description: 'AI SEO services including entity optimisation, semantic SEO, structured data, GEO, AEO and LLM visibility strategy. Prepare your brand for AI-powered search discovery.',
  path: '/services/ai-seo/',
})

const FAQS = [
  { q: 'What is the difference between traditional SEO and AI SEO?', a: 'Traditional SEO focuses on ranking web pages for keyword queries. AI SEO extends this to help AI systems — Google AI Overviews, ChatGPT, Gemini, Perplexity — understand your brand, content and expertise accurately. It involves entity optimisation, semantic content structure, structured data and factual consistency signals beyond keyword targeting.' },
  { q: 'Can you get my brand mentioned in ChatGPT or Gemini?', a: "There is no guaranteed mechanism to make AI systems cite or mention a specific brand. However, improving the quality, authority, consistency and accessibility of your information — through strong content, structured data, entity signals and authoritative third-party coverage — can improve how AI systems understand and potentially represent your business. That is what GEO and AEO strategy addresses." },
  { q: 'What is entity optimisation?', a: "Entity optimisation ensures your brand, products, people and services are represented consistently and accurately across the web — your own site, directories, press coverage, social profiles and knowledge databases. Consistent entity signals help search and AI systems understand who you are and what you offer with greater confidence." },
  { q: 'How do you measure AI SEO success?', a: 'AI SEO measurement is evolving. We track brand mentions in AI-generated answers, structured data coverage, entity consistency signals, topical authority growth, featured snippet capture and AI Overview appearances where measurable.' },
]

export default function AISEOPage() {
  return (
    <>
      <ServiceHero
        label="AI SEO"
        heading="Make Your Brand Easier for AI to Understand."
        sub="Search engines and AI systems increasingly interpret entities, relationships, context and authority — not just keywords. We help businesses build an information ecosystem that both humans and AI can clearly understand."
        primaryCTA={{ label: 'Check Your AI Search Visibility', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'AI SEO' }]}
      />

      {/* The shift */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Why AI SEO Matters</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-5">Search Is No Longer Just About Rankings</h2>
            <p className="text-gray-600 leading-relaxed mb-4">AI-powered systems — Google AI Overviews, ChatGPT, Gemini, Perplexity — are now answering questions directly, often without a user ever clicking a result. If your brand is not part of these answers, you are invisible to a growing portion of search activity.</p>
            <p className="text-gray-600 leading-relaxed">AI systems select sources based on authority, factual consistency, content structure, entity clarity and topical depth — the same signals that strong SEO builds. AI SEO is not separate from SEO. It extends it.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { platform: 'Google AI Overviews', desc: 'Synthesised answers above organic results in Google Search.' },
              { platform: 'ChatGPT Search', desc: 'AI-powered web search and Q&A with source attribution.' },
              { platform: 'Google Gemini', desc: "Google's conversational AI assistant with web access." },
              { platform: 'Perplexity', desc: 'AI search engine that cites sources for every answer.' },
            ].map(({platform,desc})=>(
              <div key={platform} className="p-5 rounded-xl border border-gray-100 bg-[#F7F8FC]">
                <h4 className="font-bold text-gray-900 text-sm mb-1.5">{platform}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="py-24 bg-[#08111F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/8 rounded-full px-4 py-1.5 mb-5">AI SEO Framework</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">How We Approach AI SEO</h2>
            <p className="text-white/50">A structured, systematic process for building AI search readiness.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['01','Brand Entity Analysis','Understand how AI and search systems currently interpret your brand, products and expertise.'],
              ['02','Intent Mapping','Map the questions your audience is asking and identify where AI systems provide answers.'],
              ['03','Content Architecture','Structure content around meaningful topics and direct question-answer relationships.'],
              ['04','Entity Consistency','Ensure your brand information is consistent across your site, directories and third-party sources.'],
              ['05','Structured Data','Schema markup that communicates structure, authority and relationships to search and AI systems.'],
              ['06','Topical Authority','Build depth of coverage on core topics that supports AI source selection criteria.'],
              ['07','Authority Signals','Digital PR, citations and external references that establish credibility and expertise.'],
              ['08','AI Search Monitoring','Track and measure brand visibility and citation patterns across AI-powered search surfaces.'],
            ].map(([num,title,desc])=>(
              <div key={num} className="p-5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center mb-4">{num}</div>
                <h4 className="text-white/90 font-semibold mb-2 text-sm">{title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services included */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="section-label">What's Included</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">AI SEO Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🏷️','Entity Optimization','Build and strengthen your brand entity signals across the web for consistent AI interpretation.'],
              ['🕸️','Semantic SEO','Topic clusters, semantic relationships and content that covers subjects with depth and context.'],
              ['📋','Schema Markup','Organisation, Person, Article, FAQ, Product, Service and custom schema implementation.'],
              ['🧠','GEO','Generative Engine Optimization — structure content for AI-generated answer environments.','/ai-search/geo/'],
              ['💬','AEO','Answer Engine Optimization — optimise for featured snippets, direct answers and voice.','/ai-search/aeo/'],
              ['🔗','Knowledge Graph','Optimise entity presence and relationships for Google Knowledge Graph representation.'],
              ['📝','Conversational Content','Content structured to match conversational query patterns used in AI search.'],
              ['📡','AI Search Monitoring','Ongoing tracking of brand citations and mentions across AI-powered search surfaces.'],
            ].map(([icon,title,desc,href])=>(
              <div key={title} className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-card transition-all">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 text-[0.95rem]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-2">{desc}</p>
                {href && <Link href={href} className="text-blue-600 text-xs font-semibold hover:underline">Learn more →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important disclaimer */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> No SEO agency can guarantee that ChatGPT, Gemini, Google AI Overviews or other AI systems will mention your brand. AI systems select sources based on their own models and training. Our AI SEO work focuses on improving the information architecture, authority, consistency and accessibility that can positively influence discoverability — not on making direct instructions to AI systems.
          </p>
        </div>
      </section>

      <FAQ items={FAQS} heading="AI SEO Questions" />
      <CTABand
        heading="Is Your Brand Visible in AI Search?"
        sub="Let's assess your current AI search visibility and build a strategy to improve it."
        primary={{ label: 'Check My AI Search Visibility', href: '/#audit' }}
        secondary={{ label: 'Talk to an AI SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
