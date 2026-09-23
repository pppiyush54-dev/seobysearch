import { getAllBlogPosts, getBlogPost, markdownToHtml, getAuthor } from '../../../lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const SITE_URL = 'https://seobysearch.com'

export function generateStaticParams() {
  return getAllBlogPosts().map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  const seo = post.seo || {}
  const title = seo.seoTitle || post.title
  const description = seo.metaDescription || post.description
  const canonical = seo.canonicalUrl || `${SITE_URL}/blog/${post.slug}/`
  const ogImage = seo.ogImage || post.coverImage

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

export default function BlogPost({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const seo = post.seo || {}
  const html = markdownToHtml(post.content)
  const author = getAuthor(post.author) // null if post.author isn't a valid authors/ slug
  const authorName = author?.name || post.author || 'SEO By Search Team'
  const canonical = seo.canonicalUrl || `${SITE_URL}/blog/${post.slug}/`
  const dateModified = post.reviewedDate || post.date

  const schemaType = post.schemaType || 'BlogPosting' // BlogPosting | HowTo | Review

  const baseSchema = {
    headline: post.title,
    description: seo.metaDescription || post.description,
    image: seo.ogImage || post.coverImage || undefined,
    url: canonical,
    datePublished: post.date ? new Date(post.date).toISOString() : undefined,
    dateModified: dateModified ? new Date(dateModified).toISOString() : undefined,
    author: author
      ? { '@type': 'Person', name: author.name, url: `${SITE_URL}/blog/author/${author.slug}/`, jobTitle: author.jobTitle }
      : { '@type': 'Organization', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'SEO By Search',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  let jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', ...baseSchema }

  if (schemaType === 'HowTo' && Array.isArray(post.howToSteps) && post.howToSteps.length > 0) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.title,
      description: seo.metaDescription || post.description,
      image: seo.ogImage || post.coverImage || undefined,
      step: post.howToSteps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.stepTitle,
        text: s.stepText,
      })),
    }
  }

  if (schemaType === 'Review' && post.reviewItemName) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: { '@type': 'Thing', name: post.reviewItemName },
      reviewRating: post.reviewRating ? {
        '@type': 'Rating',
        ratingValue: post.reviewRating,
        bestRating: '5',
      } : undefined,
      author: baseSchema.author,
      reviewBody: seo.metaDescription || post.description,
      datePublished: baseSchema.datePublished,
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  }

  const faqJsonLd = Array.isArray(post.faq) && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  return (
    <article className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div className="max-w-3xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          <Link href="/blog/" className="hover:underline">Blog</Link>
          {' / '}
          <span className="text-gray-600">{post.title}</span>
        </nav>
        <p className="text-xs text-gray-400 mb-3">
          {post.date && new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {` · ${authorName}`}
          {post.reviewedDate && (
            <> · Updated {new Date(post.reviewedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</>
          )}
        </p>

        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">{post.title}</h1>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full rounded-2xl mb-8 border border-gray-100" />
        )}

        {Array.isArray(post.keyTakeaways) && post.keyTakeaways.length > 0 && (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Key Takeaways</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {post.keyTakeaways.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        )}

        <div
          className="prose max-w-none text-gray-700 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {Array.isArray(post.faq) && post.faq.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {post.faq.map((item, i) => (
                <div key={i}>
                  <p className="font-semibold text-gray-900 mb-1">{item.question}</p>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {post.relatedService && (
          <div className="mt-10 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <Link href={post.relatedService} className="font-semibold text-blue-600 hover:underline">
              See how our related service can help →
            </Link>
          </div>
        )}

        {author && (
          <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 items-start">
            {author.photo && (
              <img src={author.photo} alt={author.name} className="w-14 h-14 rounded-full object-cover" />
            )}
            <div>
              <Link href={`/blog/author/${author.slug}/`} className="font-bold text-gray-900 hover:underline">{author.name}</Link>
              {author.jobTitle && <p className="text-sm text-gray-500 mb-2">{author.jobTitle}</p>}
              {author.bio && <p className="text-sm text-gray-600">{author.bio}</p>}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
