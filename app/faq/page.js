import FAQ from '../../components/FAQ'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO FAQ – Common Questions About SEO, AI Search & Organic Growth',
  description: 'Answers to common questions about SEO, technical SEO, AI SEO (GEO, AEO), local SEO, ecommerce SEO and how organic search strategy drives business growth.',
  path: '/faq/',
})

const GENERAL_FAQS = [
  { q: 'How long does SEO take to show results?', a: 'SEO results vary by competition, starting point and strategy scope. Technical fixes and on-page improvements can show impact within 4–8 weeks. Competitive keyword rankings typically take 3–12 months of sustained effort. The compounding nature of SEO means results accelerate over time.' },
  { q: 'What is the difference between SEO and paid search (PPC)?', a: 'SEO targets organic (unpaid) search results that appear below ads. PPC shows paid advertisements above organic results. SEO takes time to build but generates compounding returns with no per-click cost. PPC delivers immediate traffic that stops when you stop paying. Most businesses benefit from both working together.' },
  { q: 'How much does SEO cost?', a: 'SEO costs vary based on scope, competition and goals. Project work (audits, migrations) is typically fixed-price. Ongoing SEO programmes are usually monthly retainers. We provide transparent pricing after understanding your specific situation — contact us for a proposal.' },
  { q: 'Do you guarantee rankings?', a: 'No ethical SEO provider can guarantee specific rankings — Google\'s algorithm is complex, competitive and constantly updated. We guarantee: rigorous strategy based on what the data shows, transparent reporting on what we\'ve done and why, and commercial focus on outcomes that matter to your business.' },
  { q: 'Can I do SEO myself?', a: 'Yes, for basics — but competitive SEO requires deep technical knowledge, strategic content planning, authority building and staying ahead of algorithm changes. Most businesses find that specialist SEO investment delivers significantly better ROI than in-house trial and error.' },
]

const TECHNICAL_FAQS = [
  { q: 'What is a technical SEO audit?', a: 'A technical SEO audit is a systematic review of your website\'s technical foundation — crawlability, indexation, site speed, structured data, URL structure, duplicate content, internal linking and Core Web Vitals. It identifies issues preventing Google from effectively crawling and ranking your content.' },
  { q: 'What are Core Web Vitals?', a: 'Core Web Vitals are Google\'s page experience metrics: LCP (Largest Contentful Paint — loading speed), CLS (Cumulative Layout Shift — visual stability) and INP (Interaction to Next Paint — responsiveness). Poor Core Web Vitals can negatively impact rankings and conversion rates.' },
  { q: 'What is structured data / schema markup?', a: 'Structured data is code (typically JSON-LD format) added to web pages that helps search engines understand content meaning. Schema types like FAQPage, Product, LocalBusiness, Article and HowTo can enable rich results in search and improve AI model comprehension of your content.' },
]

const AI_FAQS = [
  { q: 'What is AI SEO?', a: 'AI SEO covers strategies for optimising visibility across AI-powered search tools including Google AI Overviews, ChatGPT Search, Perplexity and Gemini. It includes GEO (appearing in AI-generated answers), AEO (winning featured snippets and direct answers) and LLM SEO (how language models understand your brand).' },
  { q: 'Will AI replace traditional SEO?', a: 'AI search is changing the search landscape but not eliminating organic search. Traditional ranking signals (authority, relevance, technical quality) continue to matter. What\'s changing is the format of results and the need to optimise for AI-generated answer formats alongside traditional blue-link rankings.' },
  { q: 'What is the difference between GEO, AEO and LLM SEO?', a: 'GEO (Generative Engine Optimisation) targets AI-generated answers in tools like ChatGPT and Perplexity. AEO (Answer Engine Optimisation) targets featured snippets, PAA boxes and direct answers in traditional search. LLM SEO focuses on how language models understand and represent your brand in their responses.' },
]

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">FAQ</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">SEO Questions, Answered Straight.</h1>
          <p className="text-xl text-gray-600 max-w-xl">No jargon, no vague promises. Here are honest answers to the questions we hear most often.</p>
        </div>
      </section>

      <FAQ items={GENERAL_FAQS} heading="General SEO Questions" />
      <div className="bg-[#F7F8FC]">
        <FAQ items={TECHNICAL_FAQS} heading="Technical SEO Questions" />
      </div>
      <FAQ items={AI_FAQS} heading="AI Search & GEO Questions" />

      <CTABand
        heading="Have a Question Not Answered Here?"
        sub="Get in touch — we'll give you an honest, straightforward answer."
        primary={{ label: 'Talk to an SEO Expert', href: '/contact/' }}
        secondary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
      />
    </>
  )
}
