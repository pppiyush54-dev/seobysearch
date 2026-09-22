import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'Privacy Policy – SEO By Search',
  description: 'Privacy policy for SEO By Search. How we collect, use and protect personal data.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: [Date]</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">This privacy policy explains how SEO By Search ("we", "us", "our") collects, uses and protects personal data when you use our website seobysearch.com or engage our services.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">We collect information you provide directly, including: name, email address, company name, phone number, and website URL when you submit forms on our site. We may also collect usage data including pages visited, time on site and referring sources via analytics tools.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">We use your information to respond to enquiries, provide SEO audit and strategy services, send communications you have requested, and improve our website and services. We do not sell your personal data to third parties.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Data Storage and Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">We store data securely and implement appropriate technical and organisational measures to protect it. We retain data only as long as necessary for the purposes described in this policy.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Depending on your location, you may have rights to access, correct, delete or restrict processing of your personal data. To exercise these rights, contact us at hello@seobysearch.com.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">We use cookies for analytics and functionality. See our <a href="/cookies/" className="text-blue-600 hover:underline">Cookie Policy</a> for details.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">For privacy enquiries, contact us at <a href="mailto:hello@seobysearch.com" className="text-blue-600 hover:underline">hello@seobysearch.com</a>. This policy will be updated as our practices evolve. Material changes will be notified on this page.</p>
        </div>
      </section>
    </div>
  )
}
