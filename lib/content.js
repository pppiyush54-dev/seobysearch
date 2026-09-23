import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')
const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors')

function readMarkdownDir(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'))
}

// Minimal markdown -> HTML (headings, bold, italic, links, paragraphs, lists)
// Kept dependency-free so `next export` never needs a remote fetch during build.
export function markdownToHtml(md = '') {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  let html = ''
  let inList = false
  const inline = (s) =>
    s
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) { if (inList) { html += '</ul>'; inList = false }; continue }
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      if (inList) { html += '</ul>'; inList = false }
      const level = h[1].length + 1 // h1 reserved for page title
      html += `<h${level}>${inline(h[2])}</h${level}>`
      continue
    }
    if (/^-\s+/.test(line)) {
      if (!inList) { html += '<ul>'; inList = true }
      html += `<li>${inline(line.replace(/^-\s+/, ''))}</li>`
      continue
    }
    if (inList) { html += '</ul>'; inList = false }
    html += `<p>${inline(line)}</p>`
  }
  if (inList) html += '</ul>'
  return html
}

export function getAllBlogPosts() {
  return readMarkdownDir(BLOG_DIR)
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
      return { slug, ...data, content }
    })
    .filter(p => p.draft !== true)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

export function getBlogPost(slug) {
  const file = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { slug, ...data, content }
}

export function getAllAuthors() {
  return readMarkdownDir(AUTHORS_DIR).map(file => {
    const slug = file.replace(/\.md$/, '')
    const { data } = matter(fs.readFileSync(path.join(AUTHORS_DIR, file), 'utf8'))
    return { slug, ...data }
  })
}

export function getAuthor(slug) {
  if (!slug) return null
  const file = path.join(AUTHORS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf8'))
  return { slug, ...data }
}

export function getAllCustomPages() {
  return readMarkdownDir(PAGES_DIR).map(file => {
    const slug = file.replace(/\.md$/, '')
    const { data, content } = matter(fs.readFileSync(path.join(PAGES_DIR, file), 'utf8'))
    return { slug, ...data, content }
  })
}

export function getCustomPage(slug) {
  const file = path.join(PAGES_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { slug, ...data, content }
}
