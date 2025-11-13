import { type Metadata } from 'next'

import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch about software development, tabletop games, or to contact Dan directly.',
}

function ContactSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Section title={title}>
      <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </Section>
  )
}

function Newsletter() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified of project updates by joining the Dice Cats newsletter.
      </p>
      <div className="mt-6 flex items-center">
        <Button
          href="https://eepurl.com/jrKZyc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none"
        >
          Join the Dice Cats newsletter
        </Button>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <SimpleLayout
      title="Get in touch"
      intro="Whether you're reaching out about software development, tabletop game design, or just want to say hello, here's how to contact me."
    >
      <div className="space-y-20">
        {/* --- Winking Cat Studio --- */}
        <ContactSection title="Winking Cat Studio">
          <p>
            For software development projects, web applications, or creative
            collaborations with Winking Cat Studio, email{' '}
            <a
              href="mailto:winkingcatstudio@gmail.com"
              className="font-medium text-zinc-900 underline dark:text-zinc-100"
            >
              winkingcatstudio@gmail.com
            </a>
            .
          </p>
        </ContactSection>

        {/* --- Dice Cats --- */}
        <ContactSection title="Dice Cats">
          <p>
            For inquiries related to Dice Cats, including tabletop games,
            collaborations, or wholesale opportunities, email{' '}
            <a
              href="mailto:dicecatscontact@gmail.com"
              className="font-medium text-zinc-900 underline dark:text-zinc-100"
            >
              dicecatscontact@gmail.com
            </a>
            .
          </p>
        </ContactSection>

        {/* --- Personal Contact --- */}
        <ContactSection title="Personal">
          <p>
            To contact me directly about anything else, email{' '}
            <a
              href="mailto:dankercher@gmail.com"
              className="font-medium text-zinc-900 underline dark:text-zinc-100"
            >
              dankercher@gmail.com
            </a>
            .
          </p>
        </ContactSection>

        {/* --- Newsletter --- */}
        <Newsletter />
      </div>
    </SimpleLayout>
  )
}
