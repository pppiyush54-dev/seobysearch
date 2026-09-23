import { getAllBlogPosts, getAllAuthors } from '../lib/content'

export default function sitemap() {
  const baseUrl = 'https://seobysearch.com'
  const now = new Date().toISOString()

  const blogRoutes = getAllBlogPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: post.reviewedDate || post.date || now,
  }))

  const authorRoutes = getAllAuthors().map(author => ({
    url: `${baseUrl}/blog/author/${author.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.4,
    lastModified: now,
  }))

  const routes = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/technical-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/ai-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/local-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/ecommerce-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/enterprise-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/international-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/saas-seo/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/b2b-seo/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/real-estate-seo/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/seo-migrations/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/seo-audits/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ai-search/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ai-search/geo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-search/aeo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-search/llm-seo/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/case-studies/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/free-seo-audit/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/strategy-call/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/glossary/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies/`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [...routes, ...blogRoutes, ...authorRoutes].map(route => ({
    lastModified: now,
    ...route,
  }))
}
