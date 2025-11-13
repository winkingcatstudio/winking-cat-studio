import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-6">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Skills',
  description:
    'Technologies and principles I use to design, build, and deliver great software.',
}

export default function Skills() {
  return (
    <SimpleLayout
      title="Skills and tools I use to design, build, and deliver great software."
      intro="I'm a full-stack developer and designer, who bridges technical depth with creative problem-solving. Here's a look at the core technologies and principles I use in my work."
    >
      <div className="space-y-20">
        {/* --- Programming --- */}
        <ToolsSection title="Programming">
          <Tool title="Programming and Markup Languages">
            {`I'm fluent in Python, Ruby, JavaScript, C#, and SQL, with solid
            command of front-end markup like HTML and CSS. I focus on writing
            clean, maintainable, and well-documented code that emphasizes
            clarity and long-term scalability.`}
          </Tool>
          <Tool title="Web Technologies">
            {`My recent work has centered around modern web stacks, React,
            Next.js, and Node, along with backend frameworks like Ruby on Rails
            and Express. I build full-stack applications that are fast,
            accessible, and resilient.`}
          </Tool>
          <Tool title="Databases">
            {`I've worked extensively with relational and NoSQL databases,
            including MSSQL and MongoDB, and I use tools like SQLAlchemy and
            Mongoose for database modeling and query optimization. For building
            data-driven applications and performing analysis, I leverage pandas
            and NumPy.`}
          </Tool>
          <Tool title="Principles">
            {`I follow SOLID and DRY principles, prioritize clear documentation,
            and believe that readable code is the best long-term investment in
            any project.`}
          </Tool>
        </ToolsSection>

        {/* --- Development Tools --- */}
        <ToolsSection title="Development Tools">
          <Tool title="Agile">
            {`As a Scrum Master, I've led standups, sprint planning, reviews, and
            retrospectives to keep teams aligned and productive. I value agile
            as a mindset, focused on iteration, transparency, and continuous
            improvement.`}
          </Tool>
          <Tool title="Linux">
            {`I'm highly comfortable in Linux environments, especially
            Debian-based distributions. Besides on-the-job experience, I host
            many applications on a home server for experimentation and learning.`}
          </Tool>
          <Tool title="Source Control">
            {`I rely heavily on Git and GitHub for version control, including
            managing branches, automation with GitHub Actions, and handling
            deployment workflows.`}
          </Tool>
          <Tool title="DevOps">
            {`I've set up and maintained production environments using tools like
            Nginx, Puppet, Nagios, and Capistrano, ensuring smooth deployments
            and reliable uptime.`}
          </Tool>
        </ToolsSection>

        {/* --- Design --- */}
        <ToolsSection title="Design">
          <Tool title="Adobe InDesign">
            {`I use InDesign for layout design and publishing, from marketing
            materials to books and digital PDFs, with an eye for visual
            hierarchy and readability.`}
          </Tool>
          <Tool title="Adobe Photoshop">
            {`Photoshop remains my go-to for detailed image editing, mockups, and
            preparing assets for both print and digital media.`}
          </Tool>
          <Tool title="Typesetting">
            {`With a background in history and publishing, I have a strong
            appreciation for clean, creative, and stylish typesetting, adapting
            my approach to fit the needs of each project while enhancing
            readability and visual impact.`}
          </Tool>
          <Tool title="Digital Art">
            {`I enjoy creating digital art and concept sketches that inform my
            game and interface design work, blending creativity with usability.`}
          </Tool>
        </ToolsSection>

        {/* --- Soft Skills --- */}
        <ToolsSection title="Soft Skills">
          <Tool title="Problem Solving">
            {`I approach challenges analytically and creatively, breaking complex
            problems into actionable steps and iterating toward the best
            solution. My degree in history and philosophy taught me how to think
            critically and consider multiple perspectives when solving problems.`}
          </Tool>
          <Tool title="Written Communication">
            {`I write with clarity and empathy, from technical documentation to
            user-facing content. My academic background, combined with
            experience in client-facing support, ensures that I communicate
            complex ideas effectively and make collaboration smoother.`}
          </Tool>
          <Tool title="User Experience">
            {`My approach to UX is practical and user-first. Whether designing an
            app or a game, I focus on making interactions intuitive and
            delightful. Years of technical support have sharpened my ability to
            anticipate user needs and reduce friction.`}
          </Tool>
          <Tool title="Project Management">
            {`I've managed projects from concept to release, balancing creative
            vision with technical feasibility and keeping stakeholders aligned
            at every step. For example, I led the retirement of 400,000 alumni
            email accounts and the migration of service ticket platforms for
            eight teams handling over 150,000 tickets per year.`}
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
