import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'Cookie Policy – SEO By Search',
  description: 'Cookie policy for seobysearch.com. How we use cookies and how to manage them.',
  path: '/cookies/',
})

export default function CookiesPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-gray-500">Last updated: [Date]</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-600 leading-relaxed mb-6">This cookie policy explains how SEO By Search uses cookies and similar technologies on seobysearch.com.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and understand how you interact with the site.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cookies We Use</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F7F8FC]">
                  <th className="text-left p-4 font-bold text-gray-900 border border-gray-100">Category</th>
                  <th className="text-left p-4 font-bold text-gray-900 border border-gray-100">Purpose</th>
                  <th className="text-left p-4 font-bold text-gray-900 border border-gray-100">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Essential', 'Required for the website to function correctly', 'Session cookies, security tokens'],
                  ['Analytics', 'Help us understand how visitors use the site', 'Google Analytics, page view tracking'],
                  ['Functional', 'Remember your preferences and settings', 'Language preferences, form state'],
                ].map(([cat, purpose, examples]) => (
                  <tr key={cat} className="border-b border-gray-100">
                    <td className="p-4 font-semibold text-gray-900 border border-gray-100">{cat}</td>
                    <td className="p-4 text-gray-600 border border-gray-100">{purpose}</td>
                    <td className="p-4 text-gray-500 border border-gray-100">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Managing Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">You can control and delete cookies through your browser settings. Disabling cookies may affect website functionality. Most browsers allow you to: see what cookies have been set, delete cookies, block cookies from specific sites, and block third-party cookies.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">Cookie enquiries: <a href="mailto:hello@seobysearch.com" className="text-blue-600 hover:underline">hello@seobysearch.com</a></p>
        </div>
      </section>
    </div>
  )
}
