import { getAllAuthors, getAuthor, getAllBlogPosts } from '../../../../lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const SITE_URL = 'https://seobysearch.com'

export function generateStaticParams() {
  return getAllAuthors().map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const author = getAuthor(params.slug)
  if (!author) return {}
  const canonical = `${SITE_URL}/blog/author/${author.slug}/`
  return {
    title: `${author.name} — Author Profile`,
    description: author.bio,
    alternates: { canonical },
  }
}

export default function AuthorPage({ params }) {
  const author = getAuthor(params.slug)
  if (!author) notFound()

  const posts = getAllBlogPosts().filter(p => p.author === author.slug)
  const canonical = `${SITE_URL}/blog/author/${author.slug}/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.bio,
      url: canonical,
      image: author.photo || undefined,
      knowsAbout: author.knowsAbout || undefined,
      sameAs: [author.linkedin, author.twitter].filter(Boolean),
    },
  }

  return (
    <section className="py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-5 items-center mb-8">
          {author.photo && (
            <img src={author.photo} alt={author.name} className="w-20 h-20 rounded-full object-cover" />
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{author.name}</h1>
            {author.jobTitle && <p className="text-gray-500">{author.jobTitle}</p>}
          </div>
        </div>

        {author.bio && <p className="text-gray-700 mb-6 leading-relaxed">{author.bio}</p>}

        {Array.isArray(author.credentials) && author.credentials.length > 0 && (
          <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-1">
            {author.credentials.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        )}

        <div className="flex gap-4 mb-10">
          {author.linkedin && <a href={author.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>}
          {author.twitter && <a href={author.twitter} className="text-blue-600 hover:underline">X / Twitter</a>}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Articles by {author.name}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-card-lg hover:-translate-y-1 transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
              {post.description && <p className="text-sm text-gray-500">{post.description}</p>}
            </Link>
          ))}
          {posts.length === 0 && <p className="text-gray-500">No published articles yet.</p>}
        </div>
      </div>
    </section>
  )
}
