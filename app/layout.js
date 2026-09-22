import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from '../lib/seo'

export const metadata = {
  title: { default: 'SEO By Search – AI-First SEO & Organic Growth Partner', template: '%s | SEO By Search' },
  description: 'SEOBySearch helps businesses grow organic traffic, qualified leads and search visibility across Google and the AI-powered search ecosystem.',
  metadataBase: new URL('https://seobysearch.com'),
  openGraph: { siteName: 'SEO By Search', type: 'website' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: '' }, // Add Google Search Console ID here
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      </head>
      <body className="text-gray-900 bg-white antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
