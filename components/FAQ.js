'use client'
import { useState } from 'react'

export default function FAQ({ items, heading = "Frequently Asked Questions" }) {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">{heading}</h2>
        <div className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <div key={i} className="py-1">
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-5 text-left gap-4 group"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-[0.975rem]">{item.q}</span>
                <span className={`text-blue-600 text-xl flex-shrink-0 transition-transform duration-200 ${open===i?'rotate-45':''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open===i?'max-h-96':'max-h-0'}`}>
                <p className="pb-5 text-gray-600 leading-relaxed text-[0.925rem]">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  )
}
