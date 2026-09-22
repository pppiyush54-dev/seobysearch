import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO Case Studies – Organic Growth Results',
  description: 'SEO case studies showing organic traffic growth, ranking improvements and lead generation results across technical SEO, AI SEO, local SEO and ecommerce SEO engagements.',
  path: '/case-studies/',
})

const PLACEHOLDERS = [
  {
    industry: 'Ecommerce',
    title: '[Client Name] – Ecommerce SEO Case Study',
    result: '+[X]% Organic Revenue',
    duration: '[X] months',
    services: ['Technical SEO', 'Category SEO', 'Product Schema'],
    summary: 'How we helped a [sector] ecommerce brand grow organic revenue by [X]% through category page authority building, technical SEO and product schema implementation.',
  },
  {
    industry: 'SaaS',
    title: '[Client Name] – SaaS SEO Case Study',
    result: '+[X]% Organic Signups',
    duration: '[X] months',
    services: ['Technical SEO', 'Content Strategy', 'Competitor Displacement'],
    summary: 'How we helped a B2B SaaS platform grow organic trial signups by [X]% through topical authority building and competitor keyword displacement.',
  },
  {
    industry: 'Local Business',
    title: '[Client Name] – Local SEO Case Study',
    result: '+[X]% Map Pack Visibility',
    duration: '[X] months',
    services: ['Local SEO', 'Google Business Profile', 'Local Citations'],
    summary: 'How we helped a multi-location [sector] business dominate local map pack results and increase footfall-driving organic visits by [X]%.',
  },
  {
    industry: 'Enterprise',
    title: '[Client Name] – Enterprise SEO Case Study',
    result: '+[X]% Organic Pipeline',
    duration: '[X] months',
    services: ['Technical SEO', 'Enterprise SEO', 'International SEO'],
    summary: 'How we built a scalable SEO programme for a large [sector] organisation, recovering [X]% of organic traffic following a site migration and expanding internationally.',
  },
  {
    industry: 'International',
    title: '[Client Name] – International SEO Case Study',
    result: '[X] New Market Expansions',
    duration: '[X] months',
    services: ['International SEO', 'Hreflang', 'Regional Content'],
    summary: 'How we helped a [sector] business expand organic visibility across [X] new international markets through hreflang implementation and localised content.',
  },
  {
    industry: 'AI SEO',
    title: '[Client Name] – GEO & AEO Case Study',
    result: '+[X]% AI Search Mentions',
    duration: '[X] months',
    services: ['GEO', 'AEO', 'Entity Optimisation'],
    summary: 'How we increased a [sector] brand\'s presence in AI-generated answers by [X]% through entity optimisation, structured content and authority building.',
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">Case Studies</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">Organic Growth in Action.</h1>
          <p className="text-xl text-gray-600 max-w-xl mb-8">Real results from real SEO engagements. We build strategies around commercial outcomes — here's what that looks like in practice.</p>
          <Link href="/#audit" className="btn-primary text-base py-4 px-8">Get a Free SEO Audit</Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 p-5 rounded-xl border border-amber-100 bg-amber-50">
            <p className="text-amber-800 text-sm"><strong>Note:</strong> Case study details are currently under client confidentiality review. Full published case studies will be added once client approval is confirmed. Contact us directly to request specific case studies relevant to your industry.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDERS.map(({ industry, title, result, duration, services, summary }) => (
              <div key={title} className="p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 block">{industry}</span>
                <h2 className="font-bold text-gray-900 mb-3 text-base leading-snug">{title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">{result}</span>
                  <span className="text-xs text-gray-400">{duration}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{summary}</p>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <span key={s} className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Ready to Become a Case Study?"
        sub="Let's build the organic growth strategy that delivers results worth sharing."
        primary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an SEO Strategist', href: '/contact/' }}
      />
    </>
  )
}
