import Link from 'next/link'

export default function ServiceHero({ label, heading, sub, primaryCTA, breadcrumbs = [] }) {
  return (
    <section className="bg-gradient-to-br from-[#F0F4FF] to-[#F7F8FC] pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {i === breadcrumbs.length - 1
                  ? <span className="text-gray-900 font-medium">{b.label}</span>
                  : <Link href={b.href} className="hover:text-blue-600 transition-colors">{b.label}</Link>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="max-w-3xl">
          {label && <span className="section-label">{label}</span>}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {heading}
          </h1>
          {sub && <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">{sub}</p>}
          {primaryCTA && (
            <Link href={primaryCTA.href} className="btn-primary text-base py-4 px-8">
              {primaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
