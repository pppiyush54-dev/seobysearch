import Link from 'next/link'
import CTABand from '../../components/CTABand'
import { buildMeta } from '../../lib/seo'
import { getAllBlogPosts } from '../../lib/content'

export const metadata = buildMeta({
  title: 'SEO Insights – AI Search, Technical SEO & Organic Growth Strategy',
  description: 'Practical SEO insights on technical SEO, AI search (GEO, AEO, LLM SEO), content strategy and organic growth. Guides, analysis and commentary from SEO By Search.',
  path: '/insights/',
})

function estimateReadTime(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export default function InsightsPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <section className="bg-gradient-to-br from-[#EEF4FF] to-[#F7F8FC] pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label">Insights</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 max-w-2xl">SEO Thinking for the AI Era.</h1>
          <p className="text-xl text-gray-600 max-w-xl">Practical guides, strategic analysis and clear thinking on technical SEO, AI search and organic growth — without the filler.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="p-8 rounded-xl border border-gray-100 bg-[#F7F8FC] text-center">
              <p className="text-gray-500">New articles are on the way — check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const category = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'Insights'
                const excerpt = post.description || post.seo?.metaDescription || ''
                const dateLabel = post.date
                  ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : null
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card-lg transition-all group block"
                  >
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 block">{category}</span>
                    <h2 className="font-bold text-gray-900 mb-3 text-base leading-snug group-hover:text-blue-600 transition-colors">{post.title}</h2>
                    {excerpt && <p className="text-sm text-gray-500 leading-relaxed mb-4">{excerpt}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{dateLabel || estimateReadTime(post.content)}</span>
                      <span className="text-blue-600 text-xs font-semibold">Read more →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <CTABand
        heading="Want SEO Insights Specific to Your Business?"
        sub="A free audit is worth more than a hundred general guides — it tells you exactly what to fix."
        primary={{ label: 'Get a Free SEO Audit', href: '/#audit' }}
        secondary={{ label: 'Talk to an SEO Expert', href: '/contact/' }}
      />
    </>
  )
}
