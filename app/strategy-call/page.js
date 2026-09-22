'use client'
import { useState } from 'react'

export default function StrategyCallPage() {
  const [form, setForm] = useState({ name:'', company:'', email:'', website:'', message:'' })
  const [sent, setSent] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <>
      <section className="bg-gradient-to-br from-[#08111F] to-[#1a2744] pt-36 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label text-blue-300">Strategy Call</span>
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">Book a Free 30-Minute Strategy Call</h1>
          <p className="text-xl text-blue-200">A focused conversation about your SEO goals, current challenges and the approach that makes sense for your business. No pitch, no pressure.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">What We'll Cover</h2>
              <div className="flex flex-col gap-5 mb-10">
                {[
                  ['🔍','Your current SEO situation','Where you are now — traffic, rankings, technical health — and what\'s holding you back.'],
                  ['🎯','Your growth goals','What success looks like for your business and the timeframe you\'re working to.'],
                  ['🗺️','Potential approach','An honest picture of what a focused SEO strategy for your situation might look like.'],
                  ['❓','Your questions','Time to ask anything you want about SEO, our approach, timelines or what to expect.'],
                ].map(([icon,title,desc]) => (
                  <div key={title} className="flex gap-4 p-5 rounded-xl border border-gray-100">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-[#F7F8FC] border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">What This Call Is Not</h3>
                <ul className="flex flex-col gap-2">
                  {[
                    'A sales pitch masquerading as advice',
                    'A commitment or obligation to work with us',
                    'A way to get free consultancy hours (we respect your time and ours)',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Request Your Strategy Call</h2>
              {sent ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
                  <span className="text-4xl mb-4 block">📅</span>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Call Request Submitted!</h3>
                  <p className="text-gray-600">We'll reach out within 1 business day to schedule your strategy call at a time that works for you.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                      <input required value={form.company} onChange={e => set('company', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="Company name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL *</label>
                    <input required value={form.website} onChange={e => set('website', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="https://yourwebsite.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What Would You Like to Discuss?</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none" placeholder="Briefly describe your current situation and what you're hoping to achieve..." />
                  </div>
                  <button type="submit" className="btn-primary py-4 text-base">Request Strategy Call →</button>
                  <p className="text-xs text-gray-400 text-center">We'll respond within 1 business day to schedule your call.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
