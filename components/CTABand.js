import Link from 'next/link'

export default function CTABand({
  heading = "Your Customers Are Already Searching.",
  sub = "Let's find where your business can be more visible — and build the strategy to get there.",
  primary = { label: "Get My Free AI SEO Audit", href: "/#audit" },
  secondary = { label: "Book a Strategy Call", href: "/contact/" }
}) {
  return (
    <section className="bg-gradient-to-br from-[#08111F] to-[#0D2045] py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{heading}</h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">{sub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={primary.href} className="btn-primary text-base py-4 px-8">{primary.label}</Link>
          <Link href={secondary.href} className="btn-ghost text-base py-4 px-8">{secondary.label}</Link>
        </div>
      </div>
    </section>
  )
}
