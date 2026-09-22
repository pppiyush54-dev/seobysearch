import Link from 'next/link'
import ServiceHero from '../../../components/ServiceHero'
import CTABand from '../../../components/CTABand'
import FAQ from '../../../components/FAQ'
import { buildMeta } from '../../../lib/seo'

export const metadata = buildMeta({
  title: 'Ecommerce SEO Services – Turn Product Searches Into Revenue',
  description: 'Ecommerce SEO services covering category pages, product optimisation, faceted navigation, product schema, merchant visibility and AI shopping discovery. Get a free ecommerce SEO audit.',
  path: '/services/ecommerce-seo/',
})

const FAQS = [
  { q: 'What is the most important area to focus on for ecommerce SEO?', a: 'Category pages typically generate the most commercial organic traffic. Strong category page SEO — optimised headings, content, internal linking and faceted navigation handling — usually delivers the fastest return. Product pages matter for transactional intent and long-tail discovery.' },
  { q: 'How do you handle faceted navigation for ecommerce?', a: 'Faceted navigation (filter URLs) requires careful canonicalisation, robots.txt management and crawl budget optimisation to avoid creating thousands of duplicate or thin pages that waste crawl resource and dilute rankings.' },
  { q: 'Do you help with product schema?', a: 'Yes. We implement Product, Offer, AggregateRating and Review schema where eligible. Correct product schema can enable rich results in Google Shopping and standard search, improving click-through rates.' },
  { q: 'Can you help with Google Merchant Centre and Shopping?', a: 'We can advise on product data feed optimisation, structured data eligibility and free product listings through Google Merchant Centre as part of a broader ecommerce SEO strategy.' },
]

export default function EcommerceSEOPage() {
  return (
    <>
      <ServiceHero
        label="Ecommerce SEO"
        heading="Turn Product Searches Into Revenue Opportunities."
        sub="Ecommerce SEO is not just about ranking product pages. It is about building a commercial organic machine — category authority, product discoverability, technical health and AI shopping visibility working together."
        primaryCTA={{ label: 'Get Your Ecommerce SEO Audit', href: '/#audit' }}
        breadcrumbs={[{ label: 'Services', href: '/services/' }, { label: 'Ecommerce SEO' }]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="section-label">What We Cover</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Ecommerce SEO That Drives Revenue</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['🗂️','Category Page SEO','Strategic keyword targeting, content optimisation and internal linking for commercial category pages.'],
              ['📦','Product Page Optimisation','Titles, descriptions, unique content, user-generated content integration and structured data.'],
              ['🔍','Transactional Keyword Research','Find the commercial queries that drive buyers, not just browsers, and map them to revenue-generating pages.'],
              ['🏷️','Product Schema','Product, Offer, AggregateRating and Review schema for rich results and merchant visibility.'],
              ['🔗','Internal Linking','Scalable internal linking systems that pass authority efficiently across thousands of product URLs.'],
              ['⚙️','Faceted Navigation','Prevent thin-page and crawl budget issues caused by filter URL proliferation.'],
              ['🛒','Merchant Visibility','Free product listings, Google Merchant Centre eligibility and Shopping SEO.'],
              ['🤖','AI Shopping Visibility','Position products for AI-powered shopping discovery and conversational purchase intent.'],
              ['📊','Conversion Optimisation','Landing page improvements that convert organic visitors into buyers.'],
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

      <section className="py-16 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
          {[
            ['Category Authority','Establish category-level topical authority that flows down to product pages.'],
            ['Technical Health','Crawlability, indexation and performance across large product catalogues.'],
            ['Scalable Systems','SEO templates, internal linking logic and content systems that scale with your catalogue.'],
          ].map(([title,desc])=>(
            <div key={title} className="bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQ items={FAQS} heading="Ecommerce SEO Questions" />
      <CTABand
        heading="Ready to Grow Your Organic Revenue?"
        sub="Let's audit your ecommerce website and identify the fastest routes to organic growth."
        primary={{ label: 'Get Your Ecommerce SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Speak to an Ecommerce SEO Specialist', href: '/contact/' }}
      />
    </>
  )
}
