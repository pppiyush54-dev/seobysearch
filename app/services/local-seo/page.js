import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'Local SEO Services – Be Visible Where Your Customers Are Searching',
  description: 'Local SEO services including Google Business Profile, local citations, local landing pages, maps visibility and "near me" search optimisation. Get a free local SEO audit.',
  path: '/services/local-seo/',
})

const FAQS = [
  { q: 'What is local SEO?', a: 'Local SEO improves your visibility for searches with local intent — "plumber near me", "best restaurant in Delhi", "accountant in Dubai". It covers Google Business Profile, local citations, reviews, local landing pages and map visibility.' },
  { q: 'How important is Google Business Profile?', a: 'GBP is critical for local visibility. It controls your appearance in the map pack, local knowledge panel and "near me" results. Regular posting, review responses, accurate category selection and complete information all contribute to local ranking signals.' },
  { q: 'Do you help with multi-location businesses?', a: 'Yes. We create unique local landing pages for each location, manage GBP listings across locations and build location-specific citation profiles — at scale.' },
  { q: 'How long does local SEO take?', a: 'GBP optimisation and citation corrections can show improvements in local rankings within 4–8 weeks. Building a stronger local authority base typically shows consistent improvement over 3–6 months.' },
]

export default function LocalSEOPage() {
  return (
    <>
      <ServiceHero
        label="Local SEO"
        heading="Be Visible Where Your Customers Are Searching."
        sub="Local search has become the primary way customers find businesses in their area — across maps, voice search, 'near me' queries and Google Business Profile. We make sure your business is the one they find."
        primaryCTA={{ label: 'Check My Local Visibility', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'Local SEO' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Local SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Everything Your Local Search Visibility Needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['📍','Google Business Profile','Complete optimisation, category selection, posting strategy, Q&A management and photo optimisation.'],
              ['🗺️','Map Pack Visibility','Improve your ranking position in Google Maps and the local 3-pack for commercial queries.'],
              ['📋','Local Citations','Build accurate, consistent NAP citations across directories, data aggregators and local platforms.'],
              ['⭐','Reviews Strategy','Review acquisition strategy, response protocols and reputation management.'],
              ['🏙️','Local Landing Pages','Unique, content-rich landing pages for each city, town or service area you serve.'],
              ['🔗','Local Schema','LocalBusiness, Service and GeoCoordinates structured data for enhanced local signals.'],
              ['🗣️','Voice Search','Optimise for conversational "near me" and question-based local queries.'],
              ['📊','Local Reporting','Map pack positions, GBP insights, review trends and local traffic reporting.'],
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
      <FAQ items={FAQS} heading="Local SEO Questions" />
      <CTABand
        heading="Are Local Customers Finding Your Business?"
        sub="Let's audit your local search visibility and build a strategy to win more local customers."
        primary={{ label: 'Check My Local Visibility', href: '/#audit' }}
        secondary={{ label: 'Talk to a Local SEO Specialist', href: '/contact/' }}
      />
    </>
  )
}
