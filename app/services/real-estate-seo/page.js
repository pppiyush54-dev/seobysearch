import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'Real Estate SEO Services – Organic Leads for Builders, Brokers & Agents',
  description: 'Real estate SEO for builders, brokers and agents — hyper-local landing pages, Google Business Profile optimisation, property-schema markup and lead-focused content that ranks for "[locality] + property" searches.',
  path: '/services/real-estate-seo/',
})

const FAQS = [
  { q: 'How is real estate SEO different from general local SEO?', a: 'Real estate search is intensely hyper-local and high-frequency — buyers search by locality, project name, and configuration ("3BHK in [locality]"), not just city name. Real estate SEO combines locality-level landing pages, Google Business Profile and Maps optimisation, property/listing schema, and content built around the actual search behaviour of property buyers and renters.' },
  { q: 'Do you build locality pages for every project or micro-market?', a: 'Yes — we map the localities and project types with real search volume and build dedicated, non-duplicate landing pages for each, rather than one generic city page trying to rank for everything.' },
  { q: 'Can SEO work for individual agents and brokers, not just developers?', a: 'Yes. Individual agents and brokerages benefit from Google Business Profile optimisation, review generation, and a smaller set of hyper-local pages targeting their specific service areas — the approach is scaled to the size of the business.' },
  { q: 'What schema markup matters most for real estate listings?', a: 'RealEstateListing, Residence/Apartment, and Organization schema, alongside FAQPage and LocalBusiness where relevant — these help both traditional search and AI answer engines represent listings and locations accurately.' },
]

export default function RealEstateSEOPage() {
  return (
    <>
      <ServiceHero
        label="Real Estate SEO"
        heading="Rank Where Property Buyers Are Actually Searching."
        sub="Property search is hyper-local and high-intent. Real estate SEO wins by matching that behaviour — locality-level pages, Maps visibility, and listing content structured for both Google and AI search."
        primaryCTA={{ label: 'Build My Real Estate SEO Strategy', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'Real Estate SEO' }]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Why Real Estate SEO Is Different</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Buyers Search by Locality, Not by Category</h2>
              <p className="text-gray-600 leading-relaxed mb-4">"Best builder in India" isn't a real search. "2BHK flats in [locality] under [budget]" is. Real estate SEO succeeds by mapping every locality, configuration and price band your inventory actually covers, then building content and pages for each — not by treating the whole business as one generic keyword.</p>
              <p className="text-gray-600 leading-relaxed">That means locality landing pages, Google Business Profile and Maps optimisation for every branch or project office, and listing content structured with real estate schema so both Google and AI search engines can represent projects accurately.</p>
            </div>
            <div className="bg-gradient-to-br from-[#08111F] to-[#1a2744] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">What We Build</h3>
              <div className="flex flex-col gap-5">
                {[
                  ['📍','Locality Landing Pages','Dedicated, non-duplicate pages per micro-market and configuration.'],
                  ['🗺️','Google Business Profile & Maps','Optimised listings for every project office or branch location.'],
                  ['🏷️','Real Estate Schema','RealEstateListing, Residence and Organization markup for listings.'],
                  ['⭐','Review Generation','Systematic review collection — a top local-pack ranking factor.'],
                  ['✍️','Buyer-Intent Content','Locality guides, price trends, and configuration comparisons.'],
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

      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Real Estate SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Built for Builders, Brokers and Agents</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['📍','Locality & Micro-Market Pages','Landing pages mapped to real search volume by locality, configuration and budget.'],
              ['🗺️','Google Business Profile Management','Setup and optimisation for every branch, project office or site presence.'],
              ['🏗️','Project & Listing Schema','RealEstateListing, Residence and Organization structured data for every listing.'],
              ['⭐','Review & Reputation Building','Systematic review requests and response management across Google and property portals.'],
              ['📊','Competitor Locality Mapping','See exactly which localities competitors rank for that you don\'t — and close the gap.'],
              ['🤖','AI Search Visibility','Structure listings and locality content so AI answer engines can cite your projects accurately.'],
              ['✍️','Buyer-Intent Content','Locality guides, price-trend reports, and configuration comparison content that converts.'],
              ['🔧','Technical SEO for Listing Sites','Crawlability, indexation and Core Web Vitals for large, frequently-updated listing inventories.'],
              ['📈','Lead Attribution Reporting','Connect organic traffic to site visits, callbacks and booked visits — not just clicks.'],
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

      <FAQ items={FAQS} heading="Real Estate SEO Questions" />
      <CTABand
        heading="Ready to Rank in Every Locality You Sell In?"
        sub="Let's map your inventory to real search demand and build the pages, listings and profiles that turn it into organic leads."
        primary={{ label: 'Build My Real Estate SEO Strategy', href: '/#audit' }}
        secondary={{ label: 'Talk to a Real Estate SEO Specialist', href: '/contact/' }}
      />
    </>
  )
}
