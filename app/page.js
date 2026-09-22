import Link from 'next/link'
import CTABand from '../components/CTABand'
import FAQ from '../components/FAQ'
import HomeAuditForm from '../components/HomeAuditForm'
import { ORGANIZATION_SCHEMA } from '../lib/seo'

export const metadata = {
  title: 'SEO By Search – AI-First SEO & Organic Growth Partner',
  description: 'SEOBySearch helps businesses grow organic traffic, qualified leads and search visibility across Google, ChatGPT, Gemini and the AI-powered search ecosystem. Get a free AI SEO audit.',
  alternates: { canonical: 'https://seobysearch.com/' },
}

const FAQS = [
  { q: 'What is AI SEO?', a: 'AI SEO refers to optimising your website and digital information ecosystem so that AI-powered search systems — Google AI Overviews, ChatGPT, Gemini, Perplexity — can better understand, interpret and represent your brand. It builds on traditional SEO with entity optimisation, semantic content structure and factual consistency.' },
  { q: 'Can SEO improve visibility in ChatGPT or Gemini?', a: 'There is no direct mechanism to instruct AI systems to mention your brand. However, improving the quality, authority, consistency and accessibility of your information — through strong content, structured data, entity signals and authoritative coverage — can influence how AI systems understand and represent your business. That is what GEO and AEO strategy focuses on.' },
  { q: 'What is GEO (Generative Engine Optimization)?', a: 'GEO improves how useful, understandable and authoritative your information is for generative search experiences — where AI systems synthesise answers rather than ranking pages. It involves content structure, direct answers, factual clarity, entity consistency and topical authority.' },
  { q: 'How long does SEO take?', a: 'Early technical and on-page improvements can show results within 4–12 weeks. Meaningful organic traffic and lead growth typically develops over 3–9 months, depending on website authority, competition and content volume. We set realistic expectations from day one.' },
  { q: 'Do you guarantee rankings?', a: "No. Search performance depends on many variables — Google's algorithm, competitor activity, demand shifts — that no agency controls. We guarantee a clear strategy, transparent work and honest reporting." },
  { q: 'Do you work with international businesses?', a: 'Yes. We work with businesses across India, UAE, UK, USA, Europe and GCC. International SEO including hreflang, country targeting and regional content strategy is a core service.' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#F4F7FD] to-white pt-36 pb-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-blue-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-blue-600 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/>
              AI-First SEO & Organic Growth
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              Get Found on Search.<br/>
              <span className="text-blue-600">Get Chosen by AI.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
              SEOBySearch helps businesses grow organic traffic, qualified leads and search visibility across Google and the AI-powered search ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="#audit" className="btn-primary text-base py-4 px-8">Get Your Free AI SEO Audit</Link>
              <Link href="/contact/" className="btn-secondary text-base py-4 px-8">Book a Strategy Call</Link>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              No long-term lock-in. No black-hat shortcuts. Just a clear growth roadmap.
            </p>
          </div>
          {/* Network SVG */}
          <div className="hidden lg:flex justify-center" aria-hidden="true">
            <svg viewBox="0 0 460 460" className="w-full max-w-[440px]" fill="none">
              <circle cx="230" cy="230" r="52" fill="#246BFE" fillOpacity="0.1"/>
              <circle cx="230" cy="230" r="36" fill="#246BFE" fillOpacity="0.18"/>
              <circle cx="230" cy="230" r="24" fill="#246BFE"/>
              <text x="230" y="225" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter">YOUR</text>
              <text x="230" y="237" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter">BRAND</text>
              <circle cx="230" cy="230" r="105" stroke="#246BFE" strokeWidth="1" strokeDasharray="4 6" opacity="0.2"/>
              <circle cx="230" cy="230" r="165" stroke="#6C63FF" strokeWidth="1" strokeDasharray="3 8" opacity="0.12"/>
              {[
                [230,125,'Google\nSearch'],[340,158,'AI\nOverview'],[358,275,'Chat\nGPT'],
                [230,335,'Local\nSearch'],[102,275,'Perplexity'],[120,158,'Gemini']
              ].map(([cx,cy,label],i)=>(
                <g key={i}>
                  <line x1="230" y1="230" x2={cx} y2={cy} stroke="#246BFE" strokeWidth="1.5" opacity="0.3"/>
                  <circle cx={cx} cy={cy} r="22" fill="white" stroke="#E0E8FF" strokeWidth="1.5"/>
                  {label.split('\n').map((l,li)=>(
                    <text key={li} x={cx} y={cy-3+(li*12)} textAnchor="middle" fill="#246BFE" fontSize="7" fontWeight="700" fontFamily="Inter">{l}</text>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY STRIP ── */}
      <section className="py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-gray-400 mb-8 tracking-wide">Built Around the Search Journey, Not Just Rankings.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ['⚙️','Technical SEO'],['🤖','AI Search'],['✍️','Content Strategy'],
              ['📍','Local SEO'],['🛒','Ecommerce SEO'],['📊','Analytics'],
            ].map(([icon,label])=>(
              <div key={label} className="flex flex-col items-center gap-3 py-5 px-3 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-card transition-all">
                <span className="text-2xl">{icon}</span>
                <span className="text-[0.8rem] font-semibold text-gray-600 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="section-label">The Search Landscape</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">Search Has Changed.<br/>Has Your SEO Strategy?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Traditional SEO alone is no longer enough. Businesses now compete for visibility across organic results, AI-generated answers, featured snippets, maps, local results, shopping, video and conversational search.</p>
            <p className="text-gray-600 leading-relaxed">Customers are finding answers directly inside AI systems before they ever click a result. Your brand needs to be discoverable — and trusted — across all of those surfaces.</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="p-6 rounded-2xl border border-gray-200 opacity-60">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Old Search Model</p>
              <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
                {['Keywords','→','Rankings','→','Clicks'].map((t,i)=>(
                  <span key={i} className={t==='→'?'text-gray-400':`bg-gray-100 rounded-lg px-3 py-1.5 text-gray-700`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/40">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Modern Search Model</p>
              <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
                {['Intent','→','Content','→','Entities','→','Authority','→','AI','→','Trust','→','Conversion'].map((t,i)=>(
                  <span key={i} className={t==='→'?'text-blue-300':`bg-blue-100 rounded-lg px-2.5 py-1 text-blue-700`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROP ── */}
      <section className="py-24 bg-[#F7F8FC]" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">Core Value Proposition</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">One Strategy. Every Search Surface.</h2>
            <p className="text-gray-600">We connect traditional search visibility with the AI discovery ecosystem — and connect both to measurable business growth.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['01','Search Visibility','Improve organic visibility across the queries your customers actually use to find businesses like yours.'],
              ['02','AI Search Visibility','Prepare your content and digital signals for AI-powered discovery across Gemini, ChatGPT, Perplexity and AI Overviews.'],
              ['03','Technical Foundation','Improve crawlability, indexation, site architecture, performance and structured data before scaling content.'],
              ['04','Content Authority','Build topic clusters and content that answers real customer questions and establishes topical authority.'],
              ['05','Conversion Growth','Turn organic traffic into enquiries, calls, demos and sales with conversion-focused landing page strategy.'],
              ['06','Measurement','Connect SEO activity with meaningful business metrics — not just rankings, but leads and revenue.'],
            ].map(([num,title,desc])=>(
              <div key={num} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all group">
                <div className="text-4xl font-black text-blue-100 mb-5 leading-none">{num}</div>
                <h3 className="font-bold text-gray-900 mb-2.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="section-label">Services</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Organic Growth Across Every Channel</h2>
            <p className="text-gray-600">From technical foundations to AI-search visibility — every service connects to one goal: qualified organic growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              ['⚙️','Technical SEO','Crawlability, indexation, Core Web Vitals & architecture.','/services/technical-seo/'],
              ['🤖','AI SEO','Optimise for AI-powered search discovery and representation.','/services/ai-seo/'],
              ['📍','Local SEO','Maps, Google Business Profile & local landing pages.','/services/local-seo/'],
              ['🛒','Ecommerce SEO','Category pages, product schema & transactional growth.','/services/ecommerce-seo/'],
              ['🏢','Enterprise SEO','Large websites, multi-location & stakeholder reporting.','/services/enterprise-seo/'],
              ['🌍','International SEO','Hreflang, country targeting & regional content strategy.','/services/international-seo/'],
              ['🧠','GEO','Generative Engine Optimization for AI-generated answers.','/ai-search/geo/'],
              ['💬','AEO','Answer Engine Optimization for direct-answer visibility.','/ai-search/aeo/'],
            ].map(([icon,title,desc,href])=>(
              <Link key={href} href={href} className="p-6 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-card transition-all block group">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h4 className="font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services/" className="btn-secondary">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ── AI DARK SECTION ── */}
      <section className="bg-[#08111F] py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/8 rounded-full px-4 py-1.5 mb-6">AI Search Services</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-5">Make Your Brand Easier for AI to Understand.</h2>
            <p className="text-white/55 leading-relaxed mb-8">Search engines increasingly use sophisticated systems to understand entities, relationships, context, intent, authority and factual consistency. We help businesses build an information ecosystem that is easier for both humans and AI systems to interpret.</p>
            <Link href="/services/ai-seo/" className="btn-ghost">Explore AI Search Services →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['🏷️','Entity Optimization','Build a consistent, well-structured brand entity ecosystem.'],
              ['🕸️','Semantic SEO','Topic coverage, semantic relationships & content clusters.'],
              ['📋','Structured Data','Schema markup for richer search & AI understanding.'],
              ['🧠','GEO','Optimise for AI-generated answer environments.'],
              ['💬','AEO','Be the answer to direct and conversational queries.'],
              ['📡','AI Monitoring','Track brand visibility across AI-powered search surfaces.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="p-5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-all">
                <span className="text-xl mb-2.5 block">{icon}</span>
                <h4 className="text-white/90 font-semibold text-sm mb-1">{title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-24 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label">Industries</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">SEO Built for Your Industry</h2>
            <p className="text-gray-600">Different industries face different search challenges. Our strategies are shaped by sector, competition and commercial model.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              ['💻','SaaS & Technology'],['💰','Finance & Fintech'],['🏥','Healthcare'],
              ['🛒','Ecommerce'],['🏠','Real Estate'],['🎓','Education'],
              ['🤝','Professional Services'],['🏢','B2B'],['⚖️','Legal'],
              ['🏨','Hospitality'],['📍','Local Businesses'],['🌐','International Brands'],
            ].map(([icon,label])=>(
              <Link key={label} href="/industries/" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all">
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-semibold text-gray-800">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="section-label">Methodology</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">How We Build Your Organic Growth</h2>
            <p className="text-gray-600">A clear, repeatable process that connects research to results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['01','Understand','Business goals, target audience, competitive landscape and current search position.'],
              ['02','Audit','Technical health, content coverage, authority signals and AI search readiness.'],
              ['03','Strategise','A custom organic growth roadmap tied to commercial objectives.'],
              ['04','Build','Content, technical improvements, authority assets and structured data.'],
              ['05','Optimise','Continuously improve based on data, algorithm changes and performance.'],
              ['06','Report','Show what changed, why it changed and what comes next. Every month.'],
            ].map(([num,title,desc])=>(
              <div key={num} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card transition-all">
                <div className="w-12 h-12 rounded-2xl border-2 border-blue-200 text-blue-600 font-extrabold text-lg flex items-center justify-center flex-shrink-0">{num}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="#audit" className="btn-primary text-base py-4 px-8">Build My SEO Roadmap</Link>
          </div>
        </div>
      </section>

      {/* ── FREE AUDIT FORM ── */}
      <section className="py-24 bg-gradient-to-br from-[#08111F] to-[#0D2045]" id="audit">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/8 rounded-full px-4 py-1.5 mb-6">Free AI SEO Audit</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-5">Get Your Free AI SEO Audit</h2>
            <p className="text-white/55 mb-8 leading-relaxed">We'll assess your website's organic search health, technical foundations, content coverage and AI search readiness — then share a clear growth roadmap.</p>
            <ul className="flex flex-col gap-3">
              {[
                'Technical SEO health assessment',
                'AI search readiness review',
                'Content gap analysis',
                'Competitor visibility comparison',
                'Prioritised growth recommendations',
                'Delivered within 3–5 business days',
              ].map(item=>(
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-1.5">Start Your Free Audit</h3>
            <p className="text-sm text-gray-500 mb-6">Takes about 90 seconds. No card required.</p>
            <HomeAuditForm />
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-24 bg-[#F7F8FC]" id="case-studies">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-lg">
              <span className="section-label">Case Studies</span>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Results That Speak for Themselves</h2>
            </div>
            <Link href="/case-studies/" className="btn-secondary">All Case Studies →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { industry: 'Ecommerce', title: '[Client Name]', metrics: [['[Result]','Organic Traffic'],['[Result]','Organic Revenue']], tags: ['Technical SEO','Content'] },
              { industry: 'B2B SaaS', title: '[Client Name]', metrics: [['[Result]','Qualified Leads'],['[Result]','Keyword Growth']], tags: ['AI SEO','Content Clusters'] },
              { industry: 'Local Services', title: '[Client Name]', metrics: [['[Result]','Local Visibility'],['[Result]','Enquiries']], tags: ['Local SEO','GBP'] },
            ].map((cs,i)=>(
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-lg hover:-translate-y-1 transition-all">
                <div className="p-7 bg-gradient-to-br from-[#08111F] to-[#0D2045]">
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">{cs.industry}</p>
                  <h3 className="text-white font-bold text-lg">{cs.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex gap-6 mb-4">
                    {cs.metrics.map(([v,l])=>(
                      <div key={l}><div className="text-2xl font-black text-blue-600">{v}</div><div className="text-xs text-gray-400">{l}</div></div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {cs.tags.map(t=><span key={t} className="bg-gray-100 rounded-lg px-3 py-1 text-xs font-semibold text-gray-600">{t}</span>)}
                  </div>
                  <p className="text-xs text-gray-400 italic mt-4 bg-gray-50 rounded-xl p-3">Verified case study added once results are confirmed.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPORTING ── */}
      <section className="py-24 bg-[#08111F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/8 rounded-full px-4 py-1.5 mb-5">Transparent Reporting</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Know What Your SEO Is Actually Doing.</h2>
            <p className="text-white/50">We don't report activity just to fill a dashboard. We report business progress — clearly, honestly, every month.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['📈','Organic Traffic','Total organic visitors and qualified traffic by landing page and segment.'],
              ['🎯','Conversions & Leads','Enquiries, form submissions, calls and attributed revenue where trackable.'],
              ['📊','Keyword Movement','Ranking changes for commercial intent queries — not vanity metrics.'],
              ['⚙️','Technical Progress','Issues resolved, improvements deployed and crawl health over time.'],
              ['🤖','AI Visibility','Brand mentions and citation observations across AI search surfaces.'],
              ['📅','Next Month Plan','Clear priorities, rationale and expected impact — so you know what comes next.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="p-6 rounded-2xl bg-white/4 border border-white/8 hover:bg-white/7 transition-all">
                <span className="text-2xl mb-4 block">{icon}</span>
                <h4 className="text-white/90 font-semibold mb-2">{title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="section-label">Why SEOBySearch</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">SEO Is the Engine.<br/>Strategy Is the Driver.</h2>
            <p className="text-gray-600">Technical depth, AI-search awareness and commercial focus — without the generic agency playbook.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['🤖','AI-Aware','Built for both traditional organic search and the AI-powered discovery ecosystem — not a feature we added last year.'],
              ['📈','Business-Focused','SEO connected to the metrics that matter: leads, pipeline, revenue and organic growth.'],
              ['⚙️','Technical','Strong foundations before scaling content. We fix what is broken before building what is new.'],
              ['📋','Transparent','Clear priorities, honest reporting and consistent communication — no vague dashboards or empty promises.'],
            ].map(([icon,title,desc])=>(
              <div key={title} className="p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card transition-all text-center">
                <span className="text-4xl mb-5 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section className="py-24 bg-[#F7F8FC]" id="insights">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="section-label">Insights</span>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">SEO & AI Search Knowledge</h2>
            </div>
            <Link href="/insights/" className="btn-secondary">All Insights →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['🤖','AI SEO','What is Generative Engine Optimization (GEO) and Why Does It Matter?','8 min read'],
              ['⚙️','Technical SEO','Core Web Vitals: What Still Matters and What to Prioritise','6 min read'],
              ['📊','Strategy','How to Measure SEO ROI: A Framework for Business Leaders','10 min read'],
            ].map(([icon,cat,title,time])=>(
              <Link key={title} href="/insights/" className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-lg hover:-translate-y-1 transition-all block">
                <div className="h-44 bg-gradient-to-br from-[#08111F] to-[#1a3a6b] flex items-center justify-center text-5xl">{icon}</div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{cat}</p>
                  <h3 className="font-bold text-gray-900 mb-3 leading-snug">{title}</h3>
                  <p className="text-xs text-gray-400">{time} · [Date]</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={FAQS} />
      <CTABand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
    </>
  )
}
