// src/lib/articles.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import vm from 'vm'

export type Article = {
  title: string
  description: string
  author?: string
  date: string
}

export type ArticleWithSlug = Article & { slug: string }

function findArticleFileInDir(dir: string): string | null {
  const candidates = [
    'page.mdx', 'page.md', 'index.mdx', 'index.md',
    'page.tsx', 'page.ts', 'index.tsx', 'index.ts',
  ]
  for (const c of candidates) {
    const p = path.join(dir, c)
    if (fs.existsSync(p)) return p
  }

  // fallback: first file with supported extension
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const lower = f.toLowerCase()
    if (lower.endsWith('.mdx') || lower.endsWith('.md') || lower.endsWith('.tsx') || lower.endsWith('.ts')) {
      return path.join(dir, f)
    }
  }
  return null
}

function makeExportRegex(name: string) {
  return new RegExp(
    'export\\s+const\\s+' +
      name +
      '(?:\\s*:\\s*[^=]+)?\\s*=\\s*({[\\s\\S]*?})\\s*(?:;|$)',
    'm'
  )
}

function evalObjectLiteral(objText: string, context: Record<string, any> = {}) {
  try {
    const script = new vm.Script('(' + objText + ')')
    const ctx = vm.createContext(Object.assign({}, context))
    return script.runInContext(ctx, { timeout: 100 })
  } catch (err) {
    // swallow parse errors gracefully
    // console.warn('[articles] evalObjectLiteral failed:', (err as Error).message)
    return null
  }
}

function extractExportedObject(fileContent: string, name: string, evalContext: Record<string, any> = {}) {
  const re = makeExportRegex(name)
  const m = fileContent.match(re)
  if (!m) return null
  const objText = m[1]
  return evalObjectLiteral(objText, evalContext)
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const articlesDir = path.join(process.cwd(), 'src/app/articles')
  if (!fs.existsSync(articlesDir)) return []

  const entries = fs.readdirSync(articlesDir, { withFileTypes: true })
  const articles: ArticleWithSlug[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    const articleDir = path.join(articlesDir, slug)
    const articlePath = findArticleFileInDir(articleDir)
    if (!articlePath) {
      // no file found - skip
      continue
    }

    const fileContent = fs.readFileSync(articlePath, 'utf8')

    // 1) YAML frontmatter
    const fm = matter(fileContent)
    const front = fm?.data && Object.keys(fm.data).length ? fm.data : null

    // 2) exported constants in the file (article, metadata)
    const exportedArticle = extractExportedObject(fileContent, 'article')
    const exportedMetadata = extractExportedObject(fileContent, 'metadata', exportedArticle ? { article: exportedArticle } : {})

    // merge them: frontmatter <- metadata <- article (article overrides)
    const merged = Object.assign({}, front || {}, exportedMetadata || {}, exportedArticle || {})

    const title = merged?.title ?? merged?.name
    const description = merged?.description ?? merged?.desc ?? merged?.summary
    const dateStr = merged?.date ?? merged?.published ?? merged?.pubDate

    // Skip if no date or empty
    if (!dateStr || String(dateStr).trim() === '') {
      // skip (you wanted undated to not show)
      continue
    }

    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      // invalid date - skip
      continue
    }

    // Skip if in future (date-only comparison)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dOnly = new Date(date)
    dOnly.setHours(0, 0, 0, 0)
    if (dOnly > today) continue

    if (title && description) {
      articles.push({
        slug,
        title,
        date: date.toISOString(),
        description,
      })
    } else {
      // skip if required fields missing
      continue
    }
  }

  // sort newest first
  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return articles
}
