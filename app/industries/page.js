import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'SEO for Every Industry – Sector-Specific Search Strategy',
  description: 'SEO services tailored to your industry. We work with ecommerce, SaaS, healthcare, finance, legal, education, hospitality, real estate, manufacturing and professional services businesses.',
  path: '/industries/',
})

const INDUSTRIES = [
  { icon: '🛒', title: 'Ecommerce', desc: 'Category page authority, product schema, faceted navigation and AI shopping discovery for online retailers.', href: '/services/ecommerce-seo/' },
  { icon: '💻', title: 'SaaS & Technology', desc: 'Product-led SEO, competitor displacement, topical authority and demo-request conversion optimisation.', href: '/services/' },
  { icon: '🏥', title: 'Healthcare & Medical', desc: 'YMYL-compliant medical content, local practice SEO and patient acquisition strategy.', href: '/services/' },
  { icon: '💰', title: 'Finance & Insurance', desc: 'Trust-signal SEO, regulatory-compliant content and competitive financial keyword strategies.', href: '/services/' },
  { icon: '⚖️', title: 'Legal & Professional', desc: 'Practice area SEO, local visibility and authoritative content for law firms and professional services.', href: '/services/' },
  { icon: '🎓', title: 'Education', desc: 'Course and programme SEO, institutional authority and student recruitment organic strategy.', href: '/services/' },
  { icon: '🏨', title: 'Hospitality & Travel', desc: 'Hotel and destination SEO, Google Hotels visibility and travel discovery content.', href: '/services/' },
  { icon: '🏗️', title: 'Real Estate', desc: 'Property SEO, local area targeting, Google Business Profile and listing page optimisation.', href: '/services/' },
  { icon: '🏭', title: 'Manufacturing & B2B', desc: 'Long-cycle B2B SEO, technical content, RFQ pipeline and industry-specific keyword strategies.', href: '/services/' },
  { icon: '🍽️', title: 'Food & Restaurants', desc: 'Local SEO, Google Business Profile, menu schema and near-me search visibility for food businesses.', href: '/services/local-seo/' },
  { icon: '💄', title: 'Beauty & Wellness', desc: 'Salon, clinic and product SEO for beauty brands competing in high-intent local and national search.', href: '/services/' },
  { icon: '🌍', title: 'International Business', desc: 'Multi-market SEO, hreflang implementation and global organic visibility programmes.', href: '/services/international-seo/' },
]

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">Industries</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">SEO That Understands Your Industry.</h1>
          <p className="text-xl text-gray-600 max-w-xl mb-8">Every sector has different search behaviour, competitive dynamics and content requirements. We build strategies around your industry's specific reality — not generic SEO playbooks.</p>
          <Link href="/#audit" className="btn-primary text-base py-4 px-8">Get a Free Industry SEO Audit</Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map(({ icon, title, desc, href }) => (
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

      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Don't See Your Industry?</h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">We work with businesses in many sectors. If your industry isn't listed, get in touch — we'll give you an honest assessment of whether we're the right fit.</p>
          <Link href="/contact/" className="btn-primary py-4 px-8 text-base">Talk to Us</Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
