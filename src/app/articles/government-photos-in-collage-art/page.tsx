// src/app/articles/government-photos-in-collage-art/page.tsx
import { ArticleLayout } from '@/components/ArticleLayout'
import type { Metadata } from 'next'

const article = {
  author: 'Dan Kercher',
  date: '',
  title: 'Government Photos in Collage Art',
  description:
    'Exploring how artists reuse public domain government photography to create collage art.',
}

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
}

export default function Page(props: any) {
  return (
    <ArticleLayout article={article} {...props}>
      <p>
        Coming soon — an exploration of how collage artists make creative use of
        public domain government photography, examining what this practice means
        for authorship, originality, and the accessibility of visual culture.
      </p>
    </ArticleLayout>
  )
}
