import { buildMeta } from '../../lib/seo'

export const metadata = buildMeta({
  title: 'Terms & Conditions – SEO By Search',
  description: 'Terms and conditions for SEO By Search services and website use.',
  path: '/terms/',
})

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-gray-500">Last updated: [Date]</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-600 leading-relaxed mb-6">These terms govern your use of seobysearch.com and any engagement with SEO By Search services. By accessing our website or using our services, you accept these terms.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">SEO By Search provides SEO consultancy, strategy and implementation services. Specific deliverables, timelines and fees are agreed in individual service agreements. We do not guarantee specific search engine rankings or results.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed mb-4">All website content — text, graphics, designs and code — is the intellectual property of SEO By Search unless otherwise stated. Strategy documents, reports and deliverables produced for clients under paid engagements transfer ownership on full payment.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-4">SEO By Search is not liable for indirect, consequential or incidental losses arising from the use of our website or services. Our liability for direct losses is limited to fees paid in the relevant engagement period.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Governing Law</h2>
          <p className="text-gray-600 leading-relaxed mb-4">These terms are governed by applicable law. Disputes shall be resolved through good-faith negotiation or, where necessary, through appropriate legal channels.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Changes</h2>
          <p className="text-gray-600 leading-relaxed mb-4">We may update these terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">Questions about these terms: <a href="mailto:hello@seobysearch.com" className="text-blue-600 hover:underline">hello@seobysearch.com</a></p>
        </div>
      </section>
    </div>
  )
}
