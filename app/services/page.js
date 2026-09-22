import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO Services – Organic Growth Across Every Channel',
  description: 'Comprehensive SEO services including technical SEO, AI SEO, local SEO, ecommerce SEO, enterprise SEO and international SEO. Built for businesses that want qualified organic growth.',
  path: '/services/',
})

const ALL_SERVICES = [
  { icon:'⚙️', title:'Technical SEO', desc:'Crawlability, indexation, Core Web Vitals, site architecture, structured data and JavaScript SEO.', href:'/services/technical-seo/' },
  { icon:'🤖', title:'AI SEO', desc:'Entity optimisation, semantic SEO, structured data and AI search readiness strategy.', href:'/services/ai-seo/' },
  { icon:'📍', title:'Local SEO', desc:'Google Business Profile, maps, local citations, reviews and local landing pages.', href:'/services/local-seo/' },
  { icon:'🛒', title:'Ecommerce SEO', desc:'Category pages, product schema, faceted navigation and AI shopping visibility.', href:'/services/ecommerce-seo/' },
  { icon:'🏢', title:'Enterprise SEO', desc:'Large websites, technical governance, content operations and stakeholder reporting.', href:'/services/enterprise-seo/' },
  { icon:'🌍', title:'International SEO', desc:'Hreflang, country targeting, regional content and multi-market SEO programmes.', href:'/services/international-seo/' },
  { icon:'🧠', title:'GEO', desc:'Generative Engine Optimization for AI-generated answer environments.', href:'/ai-search/geo/' },
  { icon:'💬', title:'AEO', desc:'Answer Engine Optimization for featured snippets and direct-answer visibility.', href:'/ai-search/aeo/' },
  { icon:'💻', title:'SaaS SEO', desc:'Product-led SEO, topical authority building and competitor displacement for SaaS businesses.', href:'/services/saas-seo/' },
  { icon:'🤝', title:'B2B SEO', desc:'Demand generation, pipeline SEO and long-consideration-cycle content strategy.', href:'/services/b2b-seo/' },
  { icon:'🔄', title:'SEO Migrations', desc:'Risk-managed migrations protecting organic traffic during platform changes or redesigns.', href:'/services/seo-migrations/' },
  { icon:'🔍', title:'SEO Audits', desc:'Comprehensive technical, content and authority audits with prioritised recommendations.', href:'/services/seo-audits/' },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">All Services</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">Organic Growth Across Every Search Surface</h1>
          <p className="text-xl text-gray-600 max-w-xl mb-8">From technical foundations to AI-search visibility — every service connects to one goal: qualified organic growth for your business.</p>
          <Link href="/#audit" className="btn-primary text-base py-4 px-8">Get a Free SEO Audit</Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map(({icon,title,desc,href})=>(
              <Link key={title} href={href} className="p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all block group">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h2 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                <span className="text-blue-600 text-xs font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}
