import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'AEO – Answer Engine Optimisation for Featured Snippets & AI Answers',
  description: 'AEO (Answer Engine Optimisation) positions your content for featured snippets, People Also Ask, voice search and AI-generated direct answers. Turn your content into the answer.',
  path: '/ai-search/aeo/',
})

const FAQS = [
  { q: 'What is Answer Engine Optimisation (AEO)?', a: 'AEO is the practice of structuring and formatting content so that search engines and AI tools extract and display it as a direct answer — in featured snippets, People Also Ask boxes, voice search responses and AI Overviews.' },
  { q: 'What is the difference between AEO and GEO?', a: 'AEO focuses on winning position-zero placements in traditional search results — featured snippets, PAA boxes, direct answers. GEO focuses on appearing in AI-generated conversational responses from tools like ChatGPT and Perplexity. The two disciplines overlap and complement each other.' },
  { q: 'What types of content work best for AEO?', a: 'Definitional content ("what is X"), how-to guides, FAQ pages, comparison content ("X vs Y"), list-format answers and concise factual statements with clear supporting context all perform well for featured snippet and direct answer capture.' },
  { q: 'Do featured snippets affect organic click-through rates?', a: 'Featured snippets capture significant visibility but can reduce clicks for some query types (particularly simple factual queries). For complex or commercial queries, snippets often drive higher qualified click-through because they establish authority before the click.' },
]

export default function AEOPage() {
  return (
    <>
      <ServiceHero
        label="Answer Engine Optimisation"
        heading="Turn Your Content Into the Answer."
        sub="AEO is the discipline of formatting and structuring content to be selected as the direct answer by search engines and AI tools. Position zero, People Also Ask, voice search and AI Overviews all reward AEO-optimised content."
        primaryCTA={{ label: 'Optimise My Content for Answers', href: '/#audit' }}
        breadcrumbs={[{ label: 'AI Search', href: '/ai-search/' }, { label: 'AEO' }]}
      />

      {/* Answer Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Answer Placements</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Where AEO Wins You Visibility</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['⭐','Featured Snippets','The paragraph, list or table answer Google displays above all organic results for high-intent queries.'],
              ['❓','People Also Ask','Expandable question boxes that appear in search results — each a new AEO opportunity within a SERP.'],
              ['🎙️','Voice Search Answers','The spoken answer delivered by Google Assistant, Siri and Alexa — almost always pulled from a featured snippet.'],
              ['🤖','AI Overviews','Google\'s generative summaries that synthesise multiple sources — AEO-structured content is preferred for citation.'],
              ['📊','Rich Results','Tables, numbered steps and structured lists pulled from optimised content and displayed with formatting intact.'],
              ['💬','Conversational AI','AI assistants surfacing your content as the recommended answer when users ask questions in tools like Gemini.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-card transition-all">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 text-[0.95rem]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO Framework */}
      <section className="py-20 bg-gradient-to-br from-[#08111F] to-[#1a2744]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label text-blue-300">AEO Framework</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">The Six Elements of Answer Optimisation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['1','Question Targeting','Identify the high-value questions your audience asks where featured snippets are winnable.'],
              ['2','Answer Structure','Format content with a direct concise answer in the first 40–60 words, followed by supporting detail.'],
              ['3','Heading Hierarchy','Use H2/H3 headings phrased as questions to signal answerable content to search engines.'],
              ['4','Schema Markup','Apply FAQPage, HowTo and QAPage schema to give search engines explicit extraction signals.'],
              ['5','Semantic Depth','Surround answer content with topically related content that validates your authority on the subject.'],
              ['6','Freshness & Accuracy','Keep answer content factually current — AI and featured snippet systems favour accurate, up-to-date content.'],
            ].map(([num,title,desc])=>(
              <div key={title} className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4">{num}</div>
                <h3 className="font-bold text-white mb-2 text-[0.95rem]">{title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO Services */}
      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="section-label">AEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">What We Do</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ['🔍','Snippet Opportunity Audit','Identify every query in your niche where featured snippets are winnable and currently unowned.'],
              ['✍️','AEO Content Rewrites','Restructure existing content to match the format, length and structure preferred for snippet selection.'],
              ['📋','FAQ Page Creation','Build structured FAQ content targeting PAA boxes and conversational answer opportunities.'],
              ['🏷️','Answer Schema Implementation','Deploy FAQPage, HowTo and QAPage schema across relevant content.'],
              ['🗺️','Question Cluster Mapping','Map entire question clusters around your core topics to dominate PAA boxes and related answer opportunities.'],
              ['📊','AEO Performance Tracking','Monitor snippet ownership, PAA appearances, voice search presence and AI citation rates.'],
              ['🖊️','HowTo Content','Create step-by-step guides targeting HowTo rich results and AI answer preference for instructional queries.'],
              ['🔄','Snippet Displacement','Target and displace competitor snippets across commercial and informational query clusters.'],
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

      <FAQ items={FAQS} heading="AEO Questions" />
      <CTABand
        heading="Ready to Become the Answer?"
        sub="Let's identify your highest-value answer opportunities and build a strategy to own them."
        primary={{ label: 'Optimise My Content for Answers', href: '/#audit' }}
        secondary={{ label: 'Talk to an AEO Specialist', href: '/contact/' }}
      />
    </>
  )
}
