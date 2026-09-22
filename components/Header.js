'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SERVICES = [
  { label: 'Technical SEO', href: '/services/technical-seo/' },
  { label: 'AI SEO', href: '/services/ai-seo/' },
  { label: 'Local SEO', href: '/services/local-seo/' },
  { label: 'Ecommerce SEO', href: '/services/ecommerce-seo/' },
  { label: 'Enterprise SEO', href: '/services/enterprise-seo/' },
  { label: 'International SEO', href: '/services/international-seo/' },
]

const AI_ITEMS = [
  { label: 'GEO – Generative Engine Optimization', href: '/ai-search/geo/' },
  { label: 'AEO – Answer Engine Optimization', href: '/ai-search/aeo/' },
  { label: 'All AI Search Services', href: '/services/ai-seo/' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16 gap-6" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="2"/>
                  <line x1="12" y1="12" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-extrabold text-[1.05rem] tracking-tight text-gray-900">
                SEO<span className="text-blue-600">By</span>Search
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {/* Services dropdown */}
              <li className="relative" onMouseEnter={()=>setOpenDrop('svc')} onMouseLeave={()=>setOpenDrop(null)}>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  Services <span className="text-[10px] opacity-60">▾</span>
                </button>
                {openDrop==='svc' && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-card-lg border border-gray-100 p-2 z-50">
                    {SERVICES.map(s=>(
                      <Link key={s.href} href={s.href} className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        {s.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link href="/services/" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
                        All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              {/* AI Search dropdown */}
              <li className="relative" onMouseEnter={()=>setOpenDrop('ai')} onMouseLeave={()=>setOpenDrop(null)}>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  AI Search <span className="text-[10px] opacity-60">▾</span>
                </button>
                {openDrop==='ai' && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-card-lg border border-gray-100 p-2 z-50">
                    {AI_ITEMS.map(s=>(
                      <Link key={s.href} href={s.href} className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li><Link href="/industries/" className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Industries</Link></li>
              <li><Link href="/case-studies/" className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Case Studies</Link></li>
              <li><Link href="/insights/" className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Insights</Link></li>
              <li><Link href="/about/" className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">About</Link></li>
              <li><Link href="/contact/" className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Contact</Link></li>
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact/" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Talk to Us</Link>
              <Link href="/#audit" className="btn-primary text-sm py-2.5 px-5">Free SEO Audit</Link>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={()=>setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileOpen?'rotate-45 translate-y-2':''}`}/>
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileOpen?'opacity-0':''}`}/>
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileOpen?'-rotate-45 -translate-y-2':''}`}/>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white pt-16 overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Services</p>
            {SERVICES.map(s=>(
              <Link key={s.href} href={s.href} onClick={()=>setMobileOpen(false)} className="py-3 px-4 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">{s.label}</Link>
            ))}
            <div className="border-t border-gray-100 my-3"/>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">AI Search</p>
            {AI_ITEMS.map(s=>(
              <Link key={s.href} href={s.href} onClick={()=>setMobileOpen(false)} className="py-3 px-4 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">{s.label}</Link>
            ))}
            <div className="border-t border-gray-100 my-3"/>
            {[['Industries','/industries/'],['Case Studies','/case-studies/'],['Insights','/insights/'],['About','/about/'],['Contact','/contact/']].map(([l,h])=>(
              <Link key={h} href={h} onClick={()=>setMobileOpen(false)} className="py-3 px-4 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors">{l}</Link>
            ))}
            <div className="mt-4">
              <Link href="/#audit" onClick={()=>setMobileOpen(false)} className="btn-primary w-full justify-center text-base py-4">Free SEO Audit</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
