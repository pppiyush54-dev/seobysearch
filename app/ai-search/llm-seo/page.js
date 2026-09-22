import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'LLM SEO – Optimise Your Brand for Large Language Models',
  description: 'LLM SEO positions your brand, content and entity data to be accurately understood and cited by large language models including ChatGPT, Gemini, Claude and Perplexity.',
  path: '/ai-search/llm-seo/',
})

const FAQS = [
  { q: 'What is LLM SEO?', a: 'LLM SEO is the practice of optimising your brand\'s digital presence so that large language models — ChatGPT, Gemini, Claude, Perplexity — accurately understand, represent and cite your business when users ask relevant questions. It combines entity optimisation, content structuring and authority signal building.' },
  { q: 'How do LLMs learn about my brand?', a: 'LLMs learn from web content included in their training data, real-time retrieval from the web (for search-enabled models), entity knowledge bases, structured data and cross-domain citation patterns. The more consistently and accurately your brand is represented across these sources, the more accurately LLMs will describe it.' },
  { q: 'Can I control what LLMs say about my brand?', a: 'You cannot directly edit what an LLM says. But you can influence it by ensuring your brand is represented accurately and consistently across authoritative web sources, structured data, knowledge bases and PR mentions — which is the core of LLM SEO.' },
  { q: 'How is LLM SEO measured?', a: 'We measure LLM SEO through: brand mention accuracy audits (does the LLM describe you correctly?), citation frequency across query clusters, share-of-model-voice vs competitors, entity coverage in knowledge bases and referral traffic from AI-assisted search platforms.' },
]

export default function LLMSEOPage() {
  return (
    <>
      <ServiceHero
        label="LLM SEO"
        heading="How Large Language Models Understand Your Brand Matters."
        sub="When users ask ChatGPT, Gemini or Perplexity about your category, product or problem — what do the models say? LLM SEO ensures they describe you accurately, favourably and frequently."
        primaryCTA={{ label: 'Audit My LLM Presence', href: '/#audit' }}
        breadcrumbs={[{ label: 'AI Search', href: '/ai-search/' }, { label: 'LLM SEO' }]}
      />

      {/* Why It Matters */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Why LLM SEO Matters</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">The Models Are Already Talking About You</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Every day, millions of people ask AI models questions about products, services, brands and solutions. For many of these queries, the AI provides an answer without a search result link — and the brands it mentions are the ones positioned correctly in its knowledge.</p>
              <p className="text-gray-600 leading-relaxed mb-4">If an LLM describes your business inaccurately, doesn't know about your key services, or consistently recommends competitors in your category — you are losing business to a system you never optimised for.</p>
              <p className="text-gray-600 leading-relaxed">LLM SEO is the systematic approach to ensuring AI models have accurate, positive and comprehensive knowledge of your brand.</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                ['❌','Without LLM SEO','AI describes you generically, inaccurately or not at all. Competitors dominate model responses. Brand appears untrustworthy or outdated in AI outputs.'],
                ['✅','With LLM SEO','AI accurately describes your services, expertise and differentiators. Brand appears in relevant AI responses. Entity data is clean, consistent and authoritative.'],
              ].map(([icon,title,desc])=>(
                <div key={title} className={`p-6 rounded-xl border-2 ${icon==='✅' ? 'border-green-200 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{icon}</span>
                    <h4 className="font-bold text-gray-900">{title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LLM SEO Services */}
      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">LLM SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">How We Optimise for Language Models</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🔍','LLM Brand Audit','Systematic testing of how major LLMs describe your brand, services, and category position today.'],
              ['🏛️','Knowledge Graph Optimisation','Ensure your entity data in Google Knowledge Graph and Wikidata is accurate, complete and consistent.'],
              ['📝','LLM-Ready Content','Create content structured for extraction by language models — clear facts, entity associations, authoritative sourcing.'],
              ['🌐','Citation Building','Earn mentions from authoritative sources that LLMs use to validate brand claims during training and retrieval.'],
              ['🏷️','Entity Disambiguation','Ensure your brand entity is clearly distinct from competitors, common terms or unrelated entities.'],
              ['📋','Brand Consistency Audit','Audit and align your brand description, services and positioning across all web sources LLMs index.'],
              ['🤖','AI Platform Optimisation','Optimise presence on sources LLMs frequently retrieve from: Wikipedia, industry publications, directories.'],
              ['📊','LLM Share-of-Voice Tracking','Monitor how often your brand appears in AI responses vs competitors across relevant query sets.'],
              ['🔄','Model Correction Strategy','Identify and correct inaccurate LLM beliefs about your brand through strategic content and PR.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="p-6 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-card transition-all">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 text-[0.95rem]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={FAQS} heading="LLM SEO Questions" />
      <CTABand
        heading="Ready to Control Your AI Narrative?"
        sub="Let's audit what AI models currently say about your brand and build a strategy to make it work in your favour."
        primary={{ label: 'Audit My LLM Presence', href: '/#audit' }}
        secondary={{ label: 'Talk to an LLM SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
