import Link from 'next/link'
import { getAllBlogPosts } from '../../lib/content'

export const metadata = {
  title: 'Blog & Insights',
  description: 'SEO, AI search, and organic growth insights from the SEO By Search team.',
  alternates: { canonical: 'https://seobysearch.com/blog/' },
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="section-label">Blog</span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-10">Insights & Updates</h1>
        {posts.length === 0 && (
          <p className="text-gray-500">No posts yet — publish your first one from the admin panel.</p>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-card-lg hover:-translate-y-1 transition-all"
            >
              {post.date && (
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              {post.description && <p className="text-sm text-gray-500">{post.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
