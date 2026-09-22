import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO Audits – Comprehensive Technical, Content & Authority Analysis',
  description: 'Comprehensive SEO audits covering technical health, content quality, authority signals and AI search readiness. Prioritised recommendations with clear commercial context.',
  path: '/services/seo-audits/',
})

const FAQS = [
  { q: 'What does an SEO audit cover?', a: 'Our audits cover: technical SEO (crawlability, indexation, speed, structured data), content quality (relevance, depth, duplication), authority (link profile, anchor text, competitive gaps) and AI search readiness (entity clarity, structured data, content format). Each section includes prioritised recommendations.' },
  { q: 'How is your audit different from automated tools?', a: 'Automated tools flag issues. Our audits explain what each issue means for your specific business, prioritise by commercial impact and provide the reasoning needed to get internal buy-in. A technical finding is useful; a strategic recommendation with business context is actionable.' },
  { q: 'What format does the audit take?', a: 'A structured audit document with an executive summary, section-by-section findings with severity ratings, prioritised action list and, where relevant, implementation specifications for your development team.' },
]

export default function SEOAuditsPage() {
  return (
    <>
      <ServiceHero
        label="SEO Audits"
        heading="Know Exactly What's Holding Your SEO Back."
        sub="A comprehensive SEO audit gives you a clear picture of your current technical health, content quality, authority gaps and AI search readiness — with prioritised actions that connect to business outcomes."
        primaryCTA={{ label: 'Request an SEO Audit', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'SEO Audits' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Audit Coverage</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Four Pillars, One Complete Picture</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon:'⚙️', title:'Technical SEO Audit', items:['Crawlability & indexation','Core Web Vitals & speed','Structured data & schema','URL structure & canonicalisation','JavaScript rendering','Mobile usability'] },
              { icon:'📝', title:'Content Audit', items:['Topical coverage gaps','Content quality assessment','Thin & duplicate content','On-page optimisation','Internal linking structure','Content vs keyword mapping'] },
              { icon:'🔗', title:'Authority Audit', items:['Backlink profile analysis','Toxic link identification','Anchor text distribution','Competitor link gap','Digital PR opportunities','Unlinked brand mentions'] },
              { icon:'🤖', title:'AI Search Readiness', items:['Entity clarity & accuracy','Structured data for AI','Featured snippet ownership','GEO & AEO opportunities','Brand AI mention accuracy','AI search content gaps'] },
            ].map(({ icon, title, items }) => (
              <div key={title} className="p-7 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
                <ul className="flex flex-col gap-2">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-blue-500 text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ items={FAQS} heading="SEO Audit Questions" />
      <CTABand
        heading="Start With a Clear Picture."
        sub="A thorough SEO audit is the fastest way to understand where you are and what will actually move the needle."
        primary={{ label: 'Request an SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
