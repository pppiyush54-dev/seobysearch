'use client'
import { useState } from 'react'

const STEPS = [
  { label: 'Website', fields: ['website', 'industry'] },
  { label: 'Goals', fields: ['primaryGoal', 'timeline'] },
  { label: 'Details', fields: ['name', 'email', 'company', 'phone'] },
  { label: 'Confirm', fields: [] },
]

const INDUSTRIES = ['Ecommerce','SaaS / Technology','Healthcare','Finance','Legal','Education','Hospitality','Real Estate','Manufacturing','Professional Services','Local Business','Other']
const GOALS = ['Increase organic traffic','Generate more leads','Rank for specific keywords','Improve local visibility','Recover from traffic drop','Launch a new website','Enter a new market','Other']
const TIMELINES = ['As soon as possible','Within 1 month','1–3 months','3+ months']

export default function FreeSEOAuditPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ website:'', industry:'', primaryGoal:'', timeline:'', name:'', email:'', company:'', phone:'' })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))
  const submit = e => { e.preventDefault(); setDone(true) }

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Audit Request Received!</h1>
        <p className="text-gray-600 mb-8">We'll review your website within 1 business day and send you a personalised SEO assessment with the most impactful opportunities we find.</p>
        <a href="/" className="btn-primary py-4 px-8 text-base">Back to Home</a>
      </div>
    </div>
  )

  return (
    <>
      <section className="bg-gradient-to-br from-[#08111F] to-[#1a2744] pt-36 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label text-blue-300">Free SEO Audit</span>
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">Get Your Free SEO Audit</h1>
          <p className="text-xl text-blue-200">A personalised audit of your website's SEO health, opportunities and the specific steps that will move the needle for your business.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {/* Progress */}
          <div className="flex items-center mb-12">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-1 mx-2 rounded transition-colors ${i < step ? 'bg-green-400' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={submit}>
            {step === 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Your Website</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL *</label>
                  <input required value={form.website} onChange={e => set('website', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-blue-500" placeholder="https://yourwebsite.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {INDUSTRIES.map(ind => (
                      <button type="button" key={ind} onClick={() => set('industry', ind)} className={`p-3 rounded-xl border text-sm font-medium text-left transition-colors ${form.industry === ind ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-200'}`}>{ind}</button>
                    ))}
                  </div>
                </div>
                <button type="button" onClick={next} disabled={!form.website || !form.industry} className="btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">Next: Your Goals →</button>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Your SEO Goals</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Goal *</label>
                  <div className="flex flex-col gap-3">
                    {GOALS.map(g => (
                      <button type="button" key={g} onClick={() => set('primaryGoal', g)} className={`p-4 rounded-xl border text-sm font-medium text-left transition-colors ${form.primaryGoal === g ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-200'}`}>{g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMELINES.map(t => (
                      <button type="button" key={t} onClick={() => set('timeline', t)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${form.timeline === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-200'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={back} className="btn-secondary flex-1 py-4">← Back</button>
                  <button type="button" onClick={next} disabled={!form.primaryGoal} className="btn-primary flex-1 py-4 disabled:opacity-50">Next: Contact Details →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Your Contact Details</h2>
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
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="+91 or +971..." />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={back} className="btn-secondary flex-1 py-4">← Back</button>
                  <button type="button" onClick={next} disabled={!form.name || !form.email || !form.company} className="btn-primary flex-1 py-4 disabled:opacity-50">Review Request →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Confirm Your Audit Request</h2>
                <div className="p-6 rounded-2xl border border-gray-100 bg-[#F7F8FC]">
                  {[
                    ['Website', form.website], ['Industry', form.industry], ['Goal', form.primaryGoal],
                    ['Timeline', form.timeline || 'Not specified'], ['Name', form.name], ['Company', form.company], ['Email', form.email],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="text-sm font-semibold text-gray-500">{label}</span>
                      <span className="text-sm text-gray-900 font-medium max-w-xs text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">By submitting this form, you agree that SEO By Search may contact you about your SEO audit. We won't spam you or share your details.</p>
                <div className="flex gap-4">
                  <button type="button" onClick={back} className="btn-secondary flex-1 py-4">← Edit</button>
                  <button type="submit" className="btn-primary flex-1 py-4 text-base">Submit Audit Request 🚀</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
