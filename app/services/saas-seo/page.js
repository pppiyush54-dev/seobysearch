import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'SaaS SEO Services – Organic Growth for Software Companies',
  description: 'SaaS SEO strategy covering product-led SEO, topical authority, competitor displacement and demo-request conversion. Built for B2B and B2C SaaS companies competing for organic growth.',
  path: '/services/saas-seo/',
})

const FAQS = [
  { q: 'What makes SaaS SEO different?', a: 'SaaS SEO targets both broad informational traffic and high-intent commercial queries (comparisons, alternatives, reviews). The goal is typically free trial signups or demo requests, not e-commerce sales. Product-led growth companies often integrate SEO with in-product discovery.' },
  { q: 'How do you approach competitor displacement for SaaS?', a: 'We map the keywords where your competitors rank and you don\'t — particularly comparison, alternatives and review queries where buyer intent is highest. We then build the content and authority signals needed to displace those rankings systematically.' },
  { q: 'How important is topical authority for SaaS SEO?', a: 'Critical. SaaS companies typically compete in knowledge-intensive categories where comprehensive topic coverage signals expertise. Building topical authority across your core solution area creates a content moat that is very hard for competitors to replicate quickly.' },
]

export default function SaaSEOPage() {
  return (
    <>
      <ServiceHero
        label="SaaS SEO"
        heading="Organic Growth That Scales With Your Product."
        sub="SaaS SEO isn't just blog traffic. It's systematic topical authority, competitor displacement, high-intent comparison ranking and product-led discovery — all driving signups, trials and demos."
        primaryCTA={{ label: 'Build My SaaS SEO Strategy', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'SaaS SEO' }]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">SaaS SEO Services</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">SEO Built for the SaaS Growth Model</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🎯','Product-Led SEO','Integrate SEO with your product: free tools, calculators, templates and in-product discovery pathways.'],
              ['🏆','Topical Authority','Build comprehensive topic coverage that signals deep expertise in your solution category.'],
              ['⚔️','Competitor Displacement','Rank on "[Competitor] alternatives", "[Competitor] vs [You]" and high-intent comparison queries.'],
              ['✍️','Bottom-of-Funnel Content','Comparison, review and use-case content targeting buyers actively evaluating solutions.'],
              ['🔍','Keyword Research','Map the full buying journey — from problem awareness to vendor comparison — with prioritised keyword targets.'],
              ['⚙️','Technical SEO','App subdomain handling, crawlability, JavaScript SEO and performance for SaaS architectures.'],
              ['📊','Pipeline Reporting','Connect organic traffic to trials, demos and pipeline — not just clicks and impressions.'],
              ['🤖','AI SEO for SaaS','Appear in AI-generated tool recommendations and category answers from ChatGPT, Gemini and Perplexity.'],
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
      <FAQ items={FAQS} heading="SaaS SEO Questions" />
      <CTABand
        heading="Ready to Make SEO a Growth Channel?"
        sub="Let's audit your SaaS SEO and identify the fastest routes to organic growth."
        primary={{ label: 'Build My SaaS SEO Strategy', href: '/#audit' }}
        secondary={{ label: 'Talk to a SaaS SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
