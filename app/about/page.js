import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'About SEO By Search – The SEO Agency Built for AI-Era Growth',
  description: 'SEO By Search is an SEO consultancy specialising in technical SEO, AI search optimisation (GEO, AEO, LLM SEO), and organic growth strategy for businesses across India, UAE, UK, USA and globally.',
  path: '/about/',
})

const VALUES = [
  { icon: '🔍', title: 'Evidence Over Opinion', desc: 'Every recommendation is backed by data, testing and first-principles reasoning — not industry hearsay or generic best practices.' },
  { icon: '🔮', title: 'Future-Ready Strategy', desc: 'We track the evolution of search and AI constantly, so our clients are positioned for where search is going — not just where it is today.' },
  { icon: '📊', title: 'Commercial Transparency', desc: 'We report on business outcomes — traffic, leads, pipeline — not just rankings and impressions. Our clients always know what they\'re getting.' },
  { icon: '🤝', title: 'Partnership Not Agency', desc: 'We work as a true strategic partner, embedded in your commercial goals, not a vendor delivering monthly activity reports.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">About Us</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-3xl">SEO Built for Search. AI Built for Growth.</h1>
          <p className="text-xl text-gray-600 max-w-2xl">SEO By Search is an SEO consultancy that combines deep technical expertise with forward-thinking AI search strategy — helping businesses grow organic visibility across every search surface that matters.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Our Mission</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Organic Growth That Compounds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Search is the most powerful customer acquisition channel for businesses that get it right. Done well, SEO compounds — every piece of content, every technical improvement, every authority signal builds on the last, creating a growing moat that paid channels cannot replicate.</p>
              <p className="text-gray-600 leading-relaxed mb-4">We were founded to help businesses build that kind of organic growth — rigorous, systematic, commercially focused, and built for how search actually works today, including the rapid rise of AI-generated search results.</p>
              <p className="text-gray-600 leading-relaxed">We work with SMBs, ecommerce businesses, SaaS companies, enterprise organisations and local businesses across India, UAE, UK, USA and globally — wherever qualified organic traffic creates commercial value.</p>
            </div>
            <div className="bg-gradient-to-br from-[#08111F] to-[#1a2744] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">What Makes Us Different</h3>
              <div className="flex flex-col gap-5">
                {[
                  ['AI-First Positioning', 'We integrate GEO, AEO and LLM SEO into every strategy — not as add-ons, but as core disciplines.'],
                  ['Technical Depth', 'We go deeper than most agencies on technical SEO — crawlability, JavaScript rendering, structured data and Core Web Vitals.'],
                  ['Commercial Focus', 'Every strategy is built around your commercial goals, not SEO vanity metrics. Revenue, leads and pipeline are the scorecards.'],
                  ['Transparent Reporting', 'No jargon, no activity reports disguised as results. Clear reporting on what moved and what it means.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <span className="text-blue-400 font-bold text-lg flex-shrink-0">→</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                      <p className="text-xs text-blue-200 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="section-label">Our Values</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">What Drives the Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="p-7 rounded-xl border border-gray-100 bg-white hover:border-blue-200 transition-all">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="section-label">Markets We Serve</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-10">Global Reach, Local Expertise</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ['🇮🇳','India'],['🇦🇪','UAE & GCC'],['🇬🇧','United Kingdom'],['🇺🇸','United States'],['🇪🇺','Europe'],['🌐','Global'],
            ].map(([flag, market]) => (
              <div key={market} className="p-5 rounded-xl border border-gray-100 bg-[#F7F8FC]">
                <span className="text-3xl mb-2 block">{flag}</span>
                <p className="font-bold text-gray-900 text-sm">{market}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Work With an SEO Partner That Gets Results."
        sub="Let's talk about your organic growth goals and how we can help you achieve them."
        primary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to Us', href: '/contact/' }}
      />
    </>
  )
}
