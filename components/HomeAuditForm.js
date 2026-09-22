'use client'

export default function HomeAuditForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault() }}>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Website URL *</label>
        <input type="url" placeholder="https://yourwebsite.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" required/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Name *</label>
          <input type="text" placeholder="Full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" required/>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Work Email *</label>
          <input type="email" placeholder="you@company.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" required/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business Type</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white">
            <option>Select type…</option>
            {['B2B','B2C','Ecommerce','SaaS','Local Business','Enterprise'].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Primary Market</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-white">
            <option>Select market…</option>
            {['India','UAE / GCC','UK','USA','Europe','Global'].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company</label>
        <input type="text" placeholder="Company name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 text-sm transition-colors mt-1">
        Generate My Free Audit →
      </button>
      <p className="text-[0.7rem] text-gray-400 text-center leading-relaxed">By submitting you agree to our Privacy Policy. We don't sell your data.</p>
    </form>
  )
}
