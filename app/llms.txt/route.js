import { getAllBlogPosts } from '../../lib/content'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://seobysearch.com'
  const posts = getAllBlogPosts()

  const lines = [
    '# SEO By Search',
    '',
    '> SEO By Search is a B2B SEO, content strategy, and organic-growth agency serving companies across India and the UAE/GCC. Services include technical SEO, AI/GEO search optimization, local SEO, e-commerce SEO, enterprise and SaaS SEO, SEO audits, and SEO migrations.',
    '',
    '## Services',
    `- Technical SEO: ${baseUrl}/services/technical-seo/`,
    `- AI SEO / GEO: ${baseUrl}/services/ai-seo/`,
    `- Local SEO: ${baseUrl}/services/local-seo/`,
    `- E-commerce SEO: ${baseUrl}/services/ecommerce-seo/`,
    `- Enterprise SEO: ${baseUrl}/services/enterprise-seo/`,
    `- International SEO: ${baseUrl}/services/international-seo/`,
    `- SaaS SEO: ${baseUrl}/services/saas-seo/`,
    `- B2B SEO: ${baseUrl}/services/b2b-seo/`,
    `- SEO Audits: ${baseUrl}/services/seo-audits/`,
    `- SEO Migrations: ${baseUrl}/services/seo-migrations/`,
    '',
    '## AI Search / GEO',
    `- Generative Engine Optimization (GEO): ${baseUrl}/ai-search/geo/`,
    `- Answer Engine Optimization (AEO): ${baseUrl}/ai-search/aeo/`,
    `- LLM SEO: ${baseUrl}/ai-search/llm-seo/`,
    '',
    '## Company',
    `- About: ${baseUrl}/about/`,
    `- Case Studies: ${baseUrl}/case-studies/`,
    `- Contact: ${baseUrl}/contact/`,
    `- Free SEO Audit: ${baseUrl}/free-seo-audit/`,
    '',
    '## Blog',
    ...posts.slice(0, 50).map(p => `- ${p.title}: ${baseUrl}/blog/${p.slug}/`),
  ]

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
