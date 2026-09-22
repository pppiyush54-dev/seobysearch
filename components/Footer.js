import Link from 'next/link'

const FOOTER_LINKS = {
  Services: [
    ['Technical SEO', '/services/technical-seo/'],
    ['AI SEO', '/services/ai-seo/'],
    ['GEO', '/ai-search/geo/'],
    ['AEO', '/ai-search/aeo/'],
    ['Enterprise SEO', '/services/enterprise-seo/'],
    ['Ecommerce SEO', '/services/ecommerce-seo/'],
    ['Local SEO', '/services/local-seo/'],
    ['International SEO', '/services/international-seo/'],
  ],
  Industries: [
    ['SaaS & Technology', '/industries/'],
    ['Finance & Fintech', '/industries/'],
    ['Healthcare', '/industries/'],
    ['Ecommerce', '/industries/'],
    ['Real Estate', '/industries/'],
    ['B2B', '/industries/'],
  ],
  Resources: [
    ['Insights', '/insights/'],
    ['SEO Glossary', '/insights/'],
    ['Case Studies', '/case-studies/'],
    ['FAQs', '/#faq'],
    ['Free SEO Audit', '/#audit'],
  ],
  Company: [
    ['About', '/about/'],
    ['Contact', '/contact/'],
    ['Privacy Policy', '/privacy/'],
    ['Terms & Conditions', '/terms/'],
    ['Cookie Policy', '/cookies/'],
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="2"/>
                  <line x1="12" y1="12" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-extrabold text-[1.05rem] tracking-tight">
                SEO<span className="text-blue-500">By</span>Search
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
              AI-first SEO and organic growth partner. Helping businesses grow search visibility across Google and AI-powered discovery.
            </p>
            <div className="mt-6 flex gap-3">
              {/* Social placeholders */}
              {['in','tw','fb'].map(s=>(
                <a key={s} href="#" className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold hover:bg-white/15 hover:text-white transition-colors uppercase">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col}>
              <h5 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-5">{col}</h5>
              <ul className="flex flex-col gap-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/7 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} SEOBySearch.com · All rights reserved.</p>
          <div className="flex gap-6">
            {[['Privacy','/privacy/'],['Terms','/terms/'],['Cookies','/cookies/']].map(([l,h])=>(
              <Link key={l} href={h} className="text-xs text-white/25 hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
