import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'International SEO Services – Global Search Visibility',
  description: 'International SEO services including hreflang, country targeting, localised keyword research, regional content strategy and international architecture. Target India, UAE, UK, USA, Europe and GCC.',
  path: '/services/international-seo/',
})

export default function InternationalSEOPage() {
  return (
    <>
      <ServiceHero
        label="International SEO"
        heading="Build Search Visibility in Every Market You Serve."
        sub="International SEO is more than translating content. It requires country-specific keyword strategy, localised content, correct technical implementation and regional authority signals — all working together."
        primaryCTA={{ label: 'Build My International SEO Strategy', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'International SEO' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Markets We Target</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Key Markets</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['🇮🇳','India','Delhi, Mumbai, Bangalore, Hyderabad, Pune and national targeting.'],
                  ['🇦🇪','UAE & GCC','Dubai, Abu Dhabi, Riyadh, Doha and pan-GCC visibility.'],
                  ['🇬🇧','United Kingdom','London, regional cities and UK national search.'],
                  ['🇺🇸','United States','City targeting, national SEO and US market entry.'],
                  ['🇪🇺','Europe','Multi-country European SEO with language targeting.'],
                  ['🌐','Global','Multi-market international SEO programmes.'],
                ].map(([flag,market,desc])=>(
                  <div key={market} className="p-5 rounded-xl border border-gray-100 bg-[#F7F8FC]">
                    <span className="text-2xl mb-2 block">{flag}</span>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{market}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="section-label">Technical Implementation</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">International SEO Services</h2>
              <div className="flex flex-col gap-4">
                {[
                  ['🌍','Hreflang Implementation','Correct language and country targeting signals for Google and Bing.'],
                  ['🏗️','International Architecture','ccTLD, subdomain or subfolder — choosing and implementing the right structure.'],
                  ['🔍','Local Keyword Research','Market-specific keyword research reflecting local terminology and search behaviour.'],
                  ['✍️','Regional Content','Content that resonates with local audiences, not just translated global content.'],
                  ['🔗','International Link Building','Authority signals from relevant local sources in target markets.'],
                  ['📊','International Reporting','Market-by-market visibility, traffic and conversion reporting.'],
                ].map(([icon,title,desc])=>(
                  <div key={title} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABand
        heading="Ready to Grow in International Markets?"
        sub="Let's build the right international SEO strategy for your target markets and commercial goals."
        primary={{ label: 'Build My International SEO Strategy', href: '/#audit' }}
        secondary={{ label: 'Talk to an International SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
