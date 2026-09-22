import { getAllCustomPages, getCustomPage, markdownToHtml } from '../../../lib/content'
import { notFound } from 'next/navigation'

// New pages created from the admin panel ("Pages" collection) render here,
// at /site-pages/<slug>/. The site's existing built-in pages (About, FAQ, Services, etc.)
// are separate hand-built routes and are not affected by this.

export function generateStaticParams() {
  return getAllCustomPages().map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const page = getCustomPage(params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://seobysearch.com/site-pages/${page.slug}/` },
  }
}

export default function CustomPage({ params }) {
  const page = getCustomPage(params.slug)
  if (!page) notFound()
  const html = markdownToHtml(page.content)

  return (
    <article className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">{page.title}</h1>
        <div
          className="prose max-w-none text-gray-700 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  )
}
