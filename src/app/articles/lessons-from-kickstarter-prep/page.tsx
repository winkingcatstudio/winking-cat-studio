// src/app/articles/lessons-from-kickstarter-prep/page.tsx
import { ArticleLayout } from '@/components/ArticleLayout'
import type { Metadata } from 'next'

const article = {
  author: 'Dan Kercher',
  date: '',
  title: 'Lessons from Kickstarter Prep',
  description:
    'Key takeaways and lessons learned from preparing a tabletop Kickstarter campaign.',
}

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
}

export default function Page(props: any) {
  return (
    <ArticleLayout article={article} {...props}>
      <p>
        Coming soon — an in-depth look at what I learned while preparing and
        planning a Kickstarter campaign for a tabletop game. I’ll cover
        budgeting, timelines, community building, and how to avoid the most
        common pitfalls.
      </p>
    </ArticleLayout>
  )
}
