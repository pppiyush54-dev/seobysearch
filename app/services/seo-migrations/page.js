import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO Migrations – Risk-Managed Website Migrations That Protect Organic Traffic',
  description: 'SEO migration services for website redesigns, platform changes, domain moves and URL restructures. Pre-migration audit, redirect mapping, monitoring and post-migration recovery.',
  path: '/services/seo-migrations/',
})

const FAQS = [
  { q: 'Why do migrations hurt organic traffic?', a: 'Migrations break the connections Google has built between your URLs and their search positions. Without careful redirect mapping, canonical management and crawl signalling, Google treats the new site as a fresh entity — losing all accumulated ranking equity.' },
  { q: 'When should I involve SEO in a migration?', a: 'As early as possible — ideally at the planning stage. The further into the process we get involved, the more constraints exist and the more difficult it is to implement SEO best practices. Pre-launch is far better than post-launch recovery.' },
  { q: 'How long does it take to recover from a bad migration?', a: 'Recovery timeline depends heavily on the severity of the mistakes and the authority of the domain. Minor issues can resolve in weeks. Significant redirect failures or crawlability problems can take months to recover from — if they recover at all.' },
]

export default function SEOMigrationsPage() {
  return (
    <>
      <ServiceHero
        label="SEO Migrations"
        heading="Migrate Without Losing Your Rankings."
        sub="Website migrations are one of the highest-risk moments in a site's SEO history. Done wrong, you can lose years of accumulated ranking authority. Done right, a migration can be an opportunity to improve your SEO foundation."
        primaryCTA={{ label: 'Get Migration SEO Support', href: '/contact/' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'SEO Migrations' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Migration SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Full-Cycle Migration Protection</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🔍','Pre-Migration Audit','Baseline crawl, index status, traffic analysis and identification of high-value URLs requiring protection.'],
              ['🗺️','Redirect Mapping','Comprehensive URL-level redirect mapping preserving ranking equity across all high-value pages.'],
              ['⚙️','Technical Specification','Migration technical brief for developers: redirects, canonicals, hreflang, XML sitemaps, robots.txt.'],
              ['✅','Pre-Launch Review','Staging environment review to catch issues before they impact live rankings.'],
              ['📊','Post-Migration Monitoring','Intensive post-launch monitoring for crawl errors, ranking changes and indexation issues.'],
              ['🔄','Recovery Support','If issues emerge post-launch, rapid diagnosis and remediation to minimise ranking impact.'],
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
      <FAQ items={FAQS} heading="SEO Migration Questions" />
      <CTABand
        heading="Planning a Migration? Talk to Us First."
        sub="Early SEO involvement protects your organic traffic. Late involvement costs more and recovers less."
        primary={{ label: 'Get Migration SEO Support', href: '/contact/' }}
        secondary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
      />
    </>
  )
}
