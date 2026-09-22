import Link from 'next/link'
import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'Technical SEO Services – Fix the Foundation, Unlock Organic Growth',
  description: 'Expert technical SEO services covering crawlability, Core Web Vitals, site architecture, JavaScript SEO, structured data and international hreflang. Get a free technical SEO audit.',
  path: '/services/technical-seo/',
})

const FAQS = [
  { q: 'What does a technical SEO audit cover?', a: 'A technical SEO audit examines crawlability, indexation, site architecture, internal linking, page speed, Core Web Vitals, JavaScript rendering, canonical tags, redirects, structured data, mobile usability, hreflang and more. We produce a prioritised recommendations list tied to commercial impact.' },
  { q: 'How long does technical SEO take to show results?', a: 'Many technical fixes — crawl errors, indexation issues, redirect chains, duplicate content — can show measurable improvement within 4–8 weeks. Performance improvements like Core Web Vitals may show signal improvements over 8–16 weeks as Google re-crawls and reassesses pages.' },
  { q: 'Do you fix JavaScript SEO issues?', a: 'Yes. We audit JavaScript rendering, identify content that is not being indexed correctly, review client-side rendering issues and recommend server-side or static rendering approaches where relevant.' },
  { q: 'Can you help with an SEO migration?', a: 'Yes. We provide pre-migration technical planning, redirect mapping, canonicalisation strategy, monitoring setup and post-migration recovery audits to protect organic traffic during and after site migrations.' },
]

export default function TechnicalSEOPage() {
  return (
    <>
      <ServiceHero
        label="Technical SEO"
        heading="Fix the Foundation. Unlock Organic Growth."
        sub="Technical SEO issues silently prevent Google from properly crawling, understanding and ranking your website. We identify and fix them — systematically and with clear commercial priorities."
        primaryCTA={{ label: 'Get a Technical SEO Audit', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'Technical SEO' }]}
      />

      {/* What we cover */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">What We Cover</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Comprehensive Technical SEO Coverage</h2>
            <p className="text-gray-600">Every technical layer that affects how search engines find, crawl, understand and rank your website.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🔍','Crawlability & Indexation','Robots.txt, XML sitemaps, crawl budget, noindex issues, crawl errors and blocked resources.'],
              ['🏗️','Site Architecture','URL structure, hierarchy, internal linking strategy and orphan page identification.'],
              ['⚡','Core Web Vitals','LCP, INP, CLS measurement and actionable improvements for real-world performance.'],
              ['📄','Structured Data','Schema markup implementation for Organisation, Article, FAQ, Product, LocalBusiness and more.'],
              ['🔗','Canonicalisation','Duplicate content resolution, canonical tag strategy and pagination handling.'],
              ['🔄','Redirects','301 redirect chains, redirect loops, broken links and redirect mapping.'],
              ['📱','Mobile SEO','Mobile-first indexing readiness, viewport configuration, touch targets and usability.'],
              ['💻','JavaScript SEO','Client-side rendering audit, hydration issues, content indexability and rendering budget.'],
              ['🌍','International Hreflang','Country and language targeting, hreflang implementation and international architecture.'],
              ['🔁','Duplicate Content','Thin content, parameter handling, faceted navigation and content canonicalisation.'],
              ['📊','Log File Analysis','Server log analysis to understand actual Googlebot crawl behaviour and prioritisation.'],
              ['🔒','HTTPS & Security','SSL configuration, mixed content, HSTS and security header checks.'],
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
      <section className="py-24 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="section-label">Our Process</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">How We Approach Technical SEO</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['01','Audit','Comprehensive crawl, log analysis, manual checks and competitive benchmarking.'],
              ['02','Prioritise','Issues ranked by search impact, implementation effort and commercial opportunity.'],
              ['03','Fix','Clear technical specifications for your development team, or direct implementation.'],
              ['04','Monitor','Ongoing crawl monitoring, Core Web Vitals tracking and indexation alerts.'],
            ].map(([num,title,desc])=>(
              <div key={num} className="p-7 rounded-2xl bg-white border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-5">{num}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migrations callout */}
      <section className="py-16 bg-[#08111F]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Planning a Website Migration?</h3>
            <p className="text-white/55 max-w-xl">A poorly managed migration can destroy years of SEO progress. We provide pre-migration planning, redirect mapping, monitoring setup and post-migration recovery audits.</p>
          </div>
          <Link href="/#audit" className="btn-ghost flex-shrink-0">Discuss Your Migration →</Link>
        </div>
      </section>

      <FAQ items={FAQS} heading="Technical SEO Questions" />
      <CTABand
        heading="Your Website Has Technical Issues Holding It Back."
        sub="Let's find them, prioritise them and fix them — with a clear plan and commercial focus."
        primary={{ label: 'Get a Technical SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to a Technical SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
