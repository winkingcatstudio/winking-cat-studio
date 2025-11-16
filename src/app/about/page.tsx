import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
const portraitImage = '/images/winkingcatlogo-white-on-black.png'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-indigo-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: `Hi! I'm Dan Kercher. I develop software and design tabletop games.`,
}

export default function About() {
  const startYear = 2019
  const currentYear = new Date().getFullYear()
  const projectManagementYears = currentYear - startYear

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              width={400} 
              height={400} 
              className="rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              unoptimized
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {`Hi! I'm Dan. I develop software and design tabletop games.`}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              {`I started Winking Cat Studio as a way to organize my
              personal, academic, and professional projects. Feel free to check
              some of them out on my projects page.`}
            </p>
            <p>
              {`I have a strong background in object-oriented programming and
              software design principles, and I enjoy programming in a variety of
              languages including Python, Ruby, C#, TypeScript, JavaScript, and
              more. Feel free to browse other areas of interest on my skills
              page.`}
            </p>
            <p>
              {`My coding skills are supplemented with over 8 years of experience
              in IT support and {projectManagementYears} years of experience in
              project management. In addition to a degree in computer science, I
              also have degrees in history and philosophy. During my free time,
              I enjoy tabletop gaming with friends and spending time with my
              partner and our pets.`}
            </p>
            <p>
              {`Outside of software development, I'm the founder of Dice Cats LLC. We're a
              small independent publisher specializing in tabletop roleplaying
              games. Our newest game, SEWER SCUM, releases in early 2026. It's a
              pulp-fueled plunge into dystopian 1980s NYC inspired by '80s
              action movies and comics. Learn more about it on my projects page.`}
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/winkingcatstudio"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/dankercher/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:dankercher@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              dankercher@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
