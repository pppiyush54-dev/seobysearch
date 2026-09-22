/**
 * Shared SEO metadata builder
 * Usage: export const metadata = buildMeta({ title, description, path })
 */
export function buildMeta({ title, description, path = '/' }) {
  const base = 'https://seobysearch.com'
  const fullTitle = `${title} | SEO By Search`
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(base),
    alternates: { canonical: `${base}${path}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `${base}${path}`,
      siteName: 'SEO By Search',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  }
}

export const SITE_NAME = 'SEO By Search'
export const SITE_URL  = 'https://seobysearch.com'

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SEO By Search',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'AI-first SEO and organic growth partner helping businesses grow visibility across traditional and AI-powered search.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: 'English',
    email: 'hello@seobysearch.com',
  },
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SEO By Search',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/insights/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}
