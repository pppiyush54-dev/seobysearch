'use client'
import { useState } from 'react'
import { buildMeta } from '../../lib/seo'

// Note: metadata export from client components requires a separate layout or server wrapper
// For this page we set it in the parent layout — here we provide the form UI

const SERVICES = [
  'Technical SEO','AI SEO / GEO / AEO','Local SEO','Ecommerce SEO',
  'Enterprise SEO','International SEO','SEO Audit','Strategy Consultation','Other',
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', website:'', service:'', budget:'', message:'' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">Contact Us</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">Let's Talk About Your Organic Growth.</h1>
          <p className="text-xl text-gray-600 max-w-xl">Tell us about your business and goals. We'll come back with an honest assessment and a clear picture of what's possible.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Send Us a Message</h2>
              {sent ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
                  <span className="text-4xl mb-4 block">✅</span>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Message Received</h3>
                  <p className="text-gray-600">We'll review your enquiry and get back to you within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input required name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Company *</label>
                      <input required name="company" value={form.company} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="+91 or +971..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL *</label>
                    <input required name="website" value={form.website} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="https://yourwebsite.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Service Interested In</label>
                      <select name="service" value={form.service} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white">
                        <option value="">Select a service</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Budget</label>
                      <select name="budget" value={form.budget} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white">
                        <option value="">Select a range</option>
                        <option>Under ₹50,000 / month</option>
                        <option>₹50,000–₹1,50,000 / month</option>
                        <option>₹1,50,000–₹5,00,000 / month</option>
                        <option>₹5,00,000+ / month</option>
                        <option>Let's discuss</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tell Us About Your Goals</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="What are you trying to achieve? What challenges are you facing?" />
                  </div>
                  <button type="submit" className="btn-primary py-4 text-base">Send Message →</button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Other Ways to Reach Us</h2>
                <div className="flex flex-col gap-5">
                  {[
                    ['📧','Email','hello@seobysearch.com','mailto:hello@seobysearch.com'],
                    ['🌐','Website','seobysearch.com','https://seobysearch.com'],
                  ].map(([icon, label, value, href]) => (
                    <div key={label} className="flex gap-4 p-5 rounded-xl border border-gray-100">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                        <a href={href} className="text-blue-600 font-semibold hover:underline">{value}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-7 rounded-2xl bg-gradient-to-br from-[#08111F] to-[#1a2744] text-white">
                <h3 className="font-bold text-lg mb-4">What Happens After You Contact Us</h3>
                <div className="flex flex-col gap-4">
                  {[
                    ['1','We review your enquiry','Within 1 business day we\'ll review your website and goals.'],
                    ['2','Initial consultation','We\'ll schedule a 30-minute call to understand your situation better.'],
                    ['3','Tailored proposal','We\'ll provide a specific strategy proposal with clear scope and investment.'],
                    ['4','Your decision','No pressure, no auto-renewals. You decide if it\'s the right fit.'],
                  ].map(([num, step, desc]) => (
                    <div key={step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">{num}</div>
                      <div>
                        <p className="font-semibold text-sm mb-0.5">{step}</p>
                        <p className="text-xs text-blue-200 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
