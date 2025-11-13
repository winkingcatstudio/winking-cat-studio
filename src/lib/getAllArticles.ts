// src/lib/getAllArticles.ts
import fs from 'fs'
import path from 'path'
import vm from 'vm'

export type ArticleWithSlug = {
  slug: string
  title: string
  date: string // ISO
  description: string
  author?: string
}

function toDateOnly(d: Date) {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function findArticleFileInDir(dir: string): string | null {
  const candidates = [
    'page.mdx',
    'page.md',
    'index.mdx',
    'index.md',
    'page.tsx',
    'page.ts',
    'index.tsx',
    'index.ts',
  ]
  for (const c of candidates) {
    const p = path.join(dir, c)
    if (fs.existsSync(p)) return p
  }
  if (!fs.existsSync(dir)) return null
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const lower = f.toLowerCase()
    if (lower.endsWith('.mdx') || lower.endsWith('.md') || lower.endsWith('.tsx') || lower.endsWith('.ts')) {
      return path.join(dir, f)
    }
  }
  return null
}

/**
 * Match either:
 * - export const NAME = { ... }
 * - const NAME = { ... }
 * - let/var variants too
 *
 * Captures the object literal in group 1
 */
function makeExportOrConstRegex(name: string) {
  return new RegExp(
    '(?:export\\s+)?(?:const|let|var)\\s+' +
      name +
      '(?:\\s*:\\s*[^=]+)?\\s*=\\s*({[\\s\\S]*?})\\s*(?:;|$)',
    'm'
  )
}

function evalObjectLiteral(objText: string, context: Record<string, any> = {}) {
  try {
    const script = new vm.Script('(' + objText + ')')
    const ctx = vm.createContext(Object.assign(Object.create(null), context))
    return script.runInContext(ctx, { timeout: 100 })
  } catch {
    return null
  }
}

function extractObjectFromFile(fileContent: string, name: string, evalContext: Record<string, any> = {}) {
  const re = makeExportOrConstRegex(name)
  const m = fileContent.match(re)
  if (!m) return null
  const objText = m[1]
  return evalObjectLiteral(objText, evalContext)
}

/**
 * Filesystem-only loader: reliable & warning-free (no import.meta usage)
 */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const out: ArticleWithSlug[] = []
  const today = toDateOnly(new Date())

  const articlesDir = path.join(process.cwd(), 'src/app/articles')
  if (!fs.existsSync(articlesDir)) return []

  const entries = fs.readdirSync(articlesDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    const articleDir = path.join(articlesDir, slug)
    const articlePath = findArticleFileInDir(articleDir)
    if (!articlePath) continue

    const fileContent = fs.readFileSync(articlePath, 'utf8')

    // extract article (const/let/var, exported or not)
    const extractedArticle = extractObjectFromFile(fileContent, 'article', {}) || null

    // extract metadata with article in context so metadata can reference article.*
    const extractedMetadata =
      extractObjectFromFile(fileContent, 'metadata', extractedArticle ? { article: extractedArticle } : {}) || null

    const merged = Object.assign({}, extractedMetadata || {}, extractedArticle || {})

    const title = merged?.title ?? merged?.name
    const dateRaw = merged?.date ?? merged?.published ?? merged?.pubDate
    const description = merged?.description ?? merged?.summary ?? ''

    if (!title || !dateRaw) continue
    const date = new Date(String(dateRaw))
    if (isNaN(date.getTime())) continue
    if (toDateOnly(date) > today) continue

    out.push({
      slug,
      title: String(title),
      date: date.toISOString(),
      description: String(description ?? ''),
      author: merged?.author,
    })
  }

  out.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return out
}
