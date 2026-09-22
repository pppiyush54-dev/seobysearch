import { buildMeta } from '../../lib/seo'
import CTABand from '../../components/CTABand'

export const metadata = buildMeta({
  title: 'SEO & AI Search Glossary – Key Terms Explained',
  description: 'A practical glossary of SEO and AI search terms. Definitions for technical SEO, GEO, AEO, LLM SEO, Core Web Vitals, E-E-A-T, hreflang, schema markup and more.',
  path: '/glossary/',
})

const TERMS = [
  { term: 'AEO (Answer Engine Optimisation)', def: 'The practice of structuring content to be selected as the direct answer in featured snippets, People Also Ask boxes, voice search and AI-generated responses.' },
  { term: 'AI Overviews', def: 'Google\'s AI-generated summary answers that appear above organic search results for many queries, synthesising information from multiple web sources.' },
  { term: 'Algorithm', def: 'The system search engines use to rank web pages. Google\'s core algorithm incorporates hundreds of signals including relevance, authority, technical quality and user experience.' },
  { term: 'Anchor Text', def: 'The clickable text used in a hyperlink. Anchor text provides context to search engines about the content of the page being linked to.' },
  { term: 'Authority', def: 'A measure of a website\'s credibility and trustworthiness in the eyes of search engines, largely influenced by the quality and quantity of external links pointing to it.' },
  { term: 'Backlink', def: 'A link from an external website pointing to your website. Quality backlinks from authoritative, relevant sources are a major Google ranking factor.' },
  { term: 'Canonical URL', def: 'The preferred version of a web page, specified via a canonical tag, telling search engines which URL to index when duplicate or similar content exists across multiple URLs.' },
  { term: 'Crawl Budget', def: 'The number of pages Googlebot crawls on a website within a given time frame. Large websites must manage crawl budget to ensure important pages are crawled efficiently.' },
  { term: 'Core Web Vitals', def: 'Google\'s page experience metrics: LCP (loading speed), CLS (visual stability) and INP (responsiveness). These are confirmed ranking factors and directly affect user experience.' },
  { term: 'CTR (Click-Through Rate)', def: 'The percentage of users who click on a search result after seeing it. CTR is influenced by title tags, meta descriptions, rich results and search position.' },
  { term: 'E-E-A-T', def: 'Experience, Expertise, Authoritativeness and Trustworthiness — Google\'s framework for evaluating content quality, particularly important for YMYL content.' },
  { term: 'Entity', def: 'A distinct, identifiable thing (person, place, brand, concept) that Google\'s Knowledge Graph recognises and can associate with related entities, attributes and contexts.' },
  { term: 'Featured Snippet', def: 'A direct answer box displayed at the top of Google search results (position zero), extracting content from a web page to answer the user\'s query directly.' },
  { term: 'GEO (Generative Engine Optimisation)', def: 'The practice of optimising brand content, entity data and authority signals to appear in AI-generated answers from tools like ChatGPT, Gemini, Perplexity and Google AI Overviews.' },
  { term: 'hreflang', def: 'An HTML attribute that tells search engines which language and country version of a page to serve to users in different regions. Essential for international SEO.' },
  { term: 'Index / Indexation', def: 'The process by which search engines add pages to their database after crawling them. A page must be indexed to appear in search results.' },
  { term: 'Internal Linking', def: 'Links between pages on the same website. Strategic internal linking distributes authority, helps users navigate and signals page importance to search engines.' },
  { term: 'JSON-LD', def: 'JavaScript Object Notation for Linked Data — the recommended format for adding structured data (schema markup) to web pages without modifying existing HTML.' },
  { term: 'Knowledge Graph', def: 'Google\'s database of entities and their relationships, used to provide direct answers in search, populate Knowledge Panels and inform AI model understanding of brands and concepts.' },
  { term: 'LLM (Large Language Model)', def: 'AI models trained on large text datasets that can generate, summarise and answer questions in natural language. Examples include GPT-4, Gemini, Claude and Llama.' },
  { term: 'LLM SEO', def: 'Optimising your brand\'s digital presence to ensure large language models accurately understand, represent and cite your business when users ask relevant questions.' },
  { term: 'Long-Tail Keywords', def: 'Longer, more specific search queries typically with lower search volume but higher intent and conversion rates. Essential for content targeting in competitive niches.' },
  { term: 'Meta Description', def: 'The text snippet displayed below a page title in search results. Not a direct ranking factor but influences CTR. Should be compelling, accurate and within 155 characters.' },
  { term: 'NAP (Name, Address, Phone)', def: 'The three core local business data points. Consistent NAP across all directories, websites and platforms is a foundational local SEO requirement.' },
  { term: 'Organic Traffic', def: 'Website visitors who arrive via unpaid search engine results. The primary goal of SEO is to grow quality organic traffic that converts.' },
  { term: 'Page Speed', def: 'How fast a web page loads for users. Page speed affects both user experience and search rankings, particularly via Core Web Vitals metrics.' },
  { term: 'People Also Ask (PAA)', def: 'A Google SERP feature displaying related questions users commonly ask, with expandable answer boxes. Each PAA box is an AEO opportunity.' },
  { term: 'Schema Markup', def: 'Structured data code added to web pages using vocabulary from Schema.org, helping search engines and AI models understand content meaning and context.' },
  { term: 'SERP', def: 'Search Engine Results Page — the page displayed by a search engine in response to a query. Modern SERPs include organic results, ads, featured snippets, local packs, AI Overviews and more.' },
  { term: 'Technical SEO', def: 'Optimisation of a website\'s technical infrastructure — crawlability, indexation, site speed, structured data, URL structure — to help search engines effectively access and rank content.' },
  { term: 'Topical Authority', def: 'The degree to which a website is seen as an authoritative, comprehensive source on a specific topic. Built through systematic content coverage, internal linking and external citations.' },
  { term: 'YMYL (Your Money or Your Life)', def: 'Pages that could impact users\' health, finances, safety or wellbeing. Google applies higher quality standards and E-E-A-T scrutiny to YMYL content.' },
]

export default function GlossaryPage() {
  const alphabet = [...new Set(TERMS.map(t => t.term[0].toUpperCase()))].sort()

  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">SEO Glossary</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">SEO & AI Search: Key Terms Explained.</h1>
          <p className="text-xl text-gray-600 max-w-xl">Plain-language definitions for the terms that matter in modern SEO — from technical fundamentals to AI search concepts.</p>
        </div>
      </section>

      {/* Alphabet Nav */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {alphabet.map(letter => (
            <a key={letter} href={`#${letter}`} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 font-bold text-sm flex items-center justify-center transition-colors">{letter}</a>
          ))}
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {alphabet.map(letter => {
            const letterTerms = TERMS.filter(t => t.term[0].toUpperCase() === letter)
            return (
              <div key={letter} id={letter} className="mb-12">
                <h2 className="text-4xl font-black text-blue-600 mb-6 border-b border-gray-100 pb-3">{letter}</h2>
                <div className="flex flex-col gap-6">
                  {letterTerms.map(({ term, def }) => (
                    <div key={term}>
                      <h3 className="font-bold text-gray-900 mb-2">{term}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{def}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTABand
        heading="Understanding SEO Is Just the Start."
        sub="Let's put this knowledge to work for your business with a free audit."
        primary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
