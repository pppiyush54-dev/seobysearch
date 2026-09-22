import { getAllBlogPosts, getBlogPost, markdownToHtml } from '../../../lib/content'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllBlogPosts().map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://seobysearch.com/blog/${post.slug}/` },
  }
}

export default function BlogPost({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  const html = markdownToHtml(post.content)

  return (
    <article className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        {post.date && (
          <p className="text-xs text-gray-400 mb-3">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {post.author ? ` · ${post.author}` : ''}
          </p>
        )}
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">{post.title}</h1>
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full rounded-2xl mb-8 border border-gray-100" />
        )}
        <div
          className="prose max-w-none text-gray-700 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-blue-600 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  )
}
