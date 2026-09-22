import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'GEO – Generative Engine Optimisation for AI Search',
  description: 'GEO (Generative Engine Optimisation) helps your brand appear in AI-generated answers from ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude. Get a GEO strategy built for your business.',
  path: '/ai-search/geo/',
})

const FAQS = [
  { q: 'What is Generative Engine Optimisation (GEO)?', a: 'GEO is the practice of optimising content and brand signals so that AI language models and generative search engines (ChatGPT, Google AI Overviews, Gemini, Perplexity) reference or cite your brand when answering relevant user queries.' },
  { q: 'Is GEO different from traditional SEO?', a: 'Yes. Traditional SEO targets ranked links in search results. GEO targets the generative answer itself — the text an AI model produces. Success metrics include brand mentions in AI outputs, citation frequency and share-of-voice in AI-generated responses.' },
  { q: 'How do you measure GEO success?', a: 'We track brand mention frequency in AI search outputs, citation rate in AI Overviews, share-of-model-voice across query clusters, referral traffic from AI search platforms and qualitative audit of how AI describes your brand vs competitors.' },
  { q: 'How long does GEO take to show results?', a: 'AI model training cycles mean GEO is a medium-term strategy. Content and entity work can influence AI citations within 3–6 months. Building consistent AI visibility typically takes 6–12 months of structured effort.' },
]

export default function GEOPage() {
  return (
    <>
      <ServiceHero
        label="Generative Engine Optimisation"
        heading="Be the Answer AI Gives Your Customers."
        sub="GEO is the discipline of optimising your brand to appear in AI-generated answers — not just search result pages. As ChatGPT, Google AI Overviews and Perplexity become primary discovery channels, visibility in their outputs is the new competitive frontier."
        primaryCTA={{ label: 'Build My GEO Strategy', href: '/#audit' }}
        breadcrumbs={[{ label: 'AI Search', href: '/ai-search/' }, { label: 'GEO' }]}
      />

      {/* What is GEO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Understanding GEO</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">The New Battle for Search Visibility</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Traditional SEO wins you a ranked link. GEO wins you a mention — or a recommendation — inside the AI answer itself. When someone asks ChatGPT "what's the best SEO agency in India" or Google AI Overviews "which platforms should I use for ecommerce", the brands that appear are the ones winning GEO.</p>
              <p className="text-gray-600 leading-relaxed mb-6">AI models synthesise information from web content, structured data, authoritative sources and entity knowledge graphs. GEO is the systematic approach to influencing all of these signals so your brand is represented accurately, favourably and frequently.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['AI Overviews','Google\'s AI-generated summaries appearing above organic results'],
                  ['ChatGPT Search','OpenAI\'s search-integrated answer engine'],
                  ['Perplexity','AI-native search with citations and source attribution'],
                  ['Gemini','Google\'s multimodal AI assistant integrated into search'],
                ].map(([platform,desc])=>(
                  <div key={platform} className="p-4 rounded-xl border border-gray-100 bg-[#F7F8FC]">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{platform}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#08111F] to-[#1a2744] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">How AI Models Decide What to Cite</h3>
              <div className="flex flex-col gap-5">
                {[
                  ['🏛️','Entity Authority','Is your brand a recognised entity in knowledge graphs and AI training data?'],
                  ['📝','Content Quality','Does your content provide clear, factual answers AI can extract and cite?'],
                  ['🔗','Source Credibility','Do authoritative external sources reference and validate your claims?'],
                  ['🏷️','Structured Data','Does schema markup make your content machine-readable and AI-accessible?'],
                  ['🌐','Consistent Presence','Is your brand represented consistently across web, social and directories?'],
                ].map(([icon,factor,desc])=>(
                  <div key={factor} className="flex gap-4">
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">{factor}</h4>
                      <p className="text-xs text-blue-200 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Services */}
      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">GEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Everything Required to Win AI Visibility</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🧠','Entity Optimisation','Build your brand as a recognised, accurate entity in Google\'s Knowledge Graph and AI training datasets.'],
              ['📖','GEO Content Strategy','Create content structured for AI extraction — clear answers, factual claims, authoritative sourcing.'],
              ['🏷️','Structured Data for AI','Schema markup that makes content digestible for AI models: FAQPage, HowTo, Article, Organization.'],
              ['🔍','AI Query Mapping','Map the conversational and intent-based queries where AI models are answering your customers.'],
              ['📊','AI Mention Monitoring','Track how often and how accurately your brand appears in AI-generated answers across platforms.'],
              ['🌐','Digital PR for AI Authority','Earn citations from authoritative sources that AI models use to validate brand claims.'],
              ['🤝','AI Answer Positioning','Optimise content to appear in the answer itself — not just cited below it.'],
              ['📋','GEO Audit','Baseline assessment of current AI visibility, entity accuracy and content GEO readiness.'],
              ['🔄','Competitor GEO Analysis','Understand how AI models currently position your competitors and identify displacement opportunities.'],
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

      {/* Disclaimer */}
      <section className="py-10 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-amber-800 text-sm leading-relaxed"><strong>Transparency note:</strong> No GEO practitioner can guarantee your brand will appear in any specific AI-generated answer. AI models update independently and without notice. Our GEO work creates the right conditions — authority signals, content structure, entity clarity — that maximise the likelihood of AI citation. We report on trends and progress, not guaranteed placements.</p>
        </div>
      </section>

      <FAQ items={FAQS} heading="GEO Questions" />
      <CTABand
        heading="Ready to Win AI Search Visibility?"
        sub="Let's build the GEO strategy that positions your brand in AI-generated answers across every major platform."
        primary={{ label: 'Build My GEO Strategy', href: '/#audit' }}
        secondary={{ label: 'Talk to a GEO Specialist', href: '/contact/' }}
      />
    </>
  )
}
