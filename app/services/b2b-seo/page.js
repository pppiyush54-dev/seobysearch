import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'B2B SEO Services – Pipeline & Demand Generation Through Organic Search',
  description: 'B2B SEO strategy built for long consideration cycles, multiple stakeholders and pipeline-focused outcomes. Technical SEO, content strategy and authority building for B2B businesses.',
  path: '/services/b2b-seo/',
})

export default function B2BSEOPage() {
  return (
    <>
      <ServiceHero
        label="B2B SEO"
        heading="SEO That Generates Pipeline, Not Just Traffic."
        sub="B2B buyers research extensively before engaging. B2B SEO positions your brand as the authoritative answer at every stage of that research journey — from problem awareness to vendor evaluation."
        primaryCTA={{ label: 'Build My B2B SEO Strategy', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'B2B SEO' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">B2B SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Built for Long Consideration Cycles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🎯','Demand Generation SEO','Capture early-stage problem-aware buyers researching challenges your solution addresses.'],
              ['🏆','Thought Leadership','Build authoritative content that positions your brand as the trusted expert in your category.'],
              ['📋','Lead Qualification','Content and landing pages that attract the right companies and roles, not just traffic volume.'],
              ['🔗','Authority Building','Earn coverage and links from the industry publications your target buyers actually read.'],
              ['⚙️','Technical SEO','Performance, crawlability and structured data for B2B websites with complex information architectures.'],
              ['📊','Pipeline Attribution','Connect organic search activity to qualified leads, opportunities and closed deals.'],
              ['✍️','Decision-Stage Content','RFP guides, case studies, ROI calculators and comparison content for bottom-funnel buyers.'],
              ['🤖','B2B AI Visibility','Appear in AI-generated answers when buyers ask tools like ChatGPT about solutions in your category.'],
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
      <CTABand
        heading="Ready to Turn Search Into a Pipeline Channel?"
        sub="Let's build the B2B SEO strategy that drives qualified pipeline from organic search."
        primary={{ label: 'Build My B2B SEO Strategy', href: '/#audit' }}
        secondary={{ label: 'Talk to a B2B SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
