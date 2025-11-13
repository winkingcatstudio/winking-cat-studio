// src/app/articles/insights-from-the-development-of-a-workflow-orchestrator/page.tsx
import Image from 'next/image'
import { ArticleLayout } from '@/components/ArticleLayout'
import academicRadiology from './insightsFromDevelopment.png'
import type { Metadata } from 'next'

const article = {
  author: 'Dan Kercher',
  date: '2025-11-11',
  title: 'Insights from the Development of a Workflow Orchestrator',
  description:
    'Divided attention poses substantial practical problems that radiology departments need to take seriously.',
}

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
}

export default function Page(props: any) {
  return (
    <ArticleLayout article={article} {...props}>
      <p>
        Divided attention poses substantial practical problems that radiology
        departments need to take seriously. If a person must pay attention to
        multiple things at once, a challenge often referred to as multi-tasking,
        they are usually switching rapidly back and forth between different tasks,
        and the result is that each area tends to suffer. For radiologists, this
        is a matter of real concern as they need to monitor multiple worklists,
        which poses increasing cognitive burden as each additional worklist is
        added to the equation.
      </p>

      <Image
        src={academicRadiology}
        alt="Radiology workflow illustration"
        width={800}
        height={600}
        unoptimized
      />

      <h2 style={{ marginTop: '0.25rem' }}>
        <a
          href="https://www.academicradiology.org/article/S1076-6332(25)01028-1/abstract"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the full article
        </a>
      </h2>
    </ArticleLayout>
  )
}
