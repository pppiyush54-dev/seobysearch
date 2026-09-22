import Link from 'next/link'
import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'Enterprise SEO Services – Organic Growth at Scale',
  description: 'Enterprise SEO for large websites, multi-location businesses and international organisations. Technical governance, content operations, stakeholder reporting and scalable SEO systems.',
  path: '/services/enterprise-seo/',
})

const FAQS = [
  { q: 'What makes enterprise SEO different?', a: 'Enterprise SEO involves greater technical complexity, larger content operations, multiple stakeholders, international targeting, governance frameworks and the need for scalable systems rather than page-by-page tactics.' },
  { q: 'How do you report to multiple stakeholders?', a: 'We create reporting frameworks tailored to different audiences — executive dashboards showing commercial outcomes, technical reports for dev teams, and content performance reports for marketing. All connected to business metrics, not just SEO activity.' },
  { q: 'Can you work alongside our internal marketing or development team?', a: 'Yes. We operate as a specialist SEO partner alongside internal teams, providing strategy, specifications and governance while your teams execute. We adapt to your existing processes and tools.' },
]

export default function EnterpriseSEOPage() {
  return (
    <>
      <ServiceHero
        label="Enterprise SEO"
        heading="Enterprise SEO Without Enterprise Complexity."
        sub="Large websites need rigorous technical governance, scalable content systems and stakeholder-ready reporting — without getting lost in agency jargon and monthly activity reports that say nothing about business outcomes."
        primaryCTA={{ label: 'Talk to an Enterprise SEO Strategist', href: '/contact/' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'Enterprise SEO' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Enterprise Capabilities</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Built for Scale, Complexity and Results</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🏗️','Technical Governance','SEO standards, templates and review processes that scale across large teams and thousands of URLs.'],
              ['📝','Content Operations','Content planning, brief systems, editorial calendars and quality frameworks at scale.'],
              ['🌍','International SEO','Multi-country, multi-language targeting with hreflang, regional content and international architecture.'],
              ['📊','Executive Reporting','C-suite-ready dashboards connecting SEO activity to revenue, pipeline and commercial outcomes.'],
              ['🔄','Migration Management','Risk-managed site migrations, platform changes and domain consolidations at enterprise scale.'],
              ['⚙️','SEO Automation','Automating repetitive SEO tasks — metadata generation, internal linking, sitemap management.'],
              ['🤝','Stakeholder Management','Clear communication frameworks for dev, content, marketing and leadership stakeholders.'],
              ['🔗','Internal Linking at Scale','Programmatic internal linking strategies for sites with thousands of pages and deep hierarchies.'],
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
      {/* Process */}
      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Enterprise SEO Process</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-0 items-stretch">
            {['Discover','Diagnose','Prioritise','Execute','Measure','Scale'].map((step,i)=>(
              <div key={step} className="flex-1 relative">
                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center h-full mx-1">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mx-auto mb-3">{i+1}</div>
                  <h4 className="font-bold text-gray-900 text-sm">{step}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ items={FAQS} heading="Enterprise SEO Questions" />
      <CTABand
        heading="Ready to Scale Your Enterprise SEO?"
        sub="Let's discuss your organisation's search visibility challenges and build a scalable strategy."
        primary={{ label: 'Talk to an Enterprise SEO Strategist', href: '/contact/' }}
        secondary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
      />
    </>
  )
}
