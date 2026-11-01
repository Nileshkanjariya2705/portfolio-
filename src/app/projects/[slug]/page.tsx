import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectPreview } from "@/components/project-preview";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} — A project by Nilesh Kanjariya`,
      description: project.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="case-page">
      <div className="container">
        <Link href="/#projects" className="back-link">
          <ArrowLeft size={14} /> Back to selected work
        </Link>
        <div className="case-topline">
          <span className="eyebrow">{project.category} / CASE STUDY</span>
          <span className="case-number">PROJECT {project.number} / 04</span>
        </div>
        <h1>{project.name}</h1>
        <p className="case-subtitle">{project.label}</p>
        <p className="case-intro">{project.description}</p>
        <div className="case-actions">
          {project.live ? (
            <a
              className="button button-blue"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live website <ArrowUpRight size={16} />
            </a>
          ) : (
            <span>A public project URL has not been provided.</span>
          )}
          <a className="button button-outline" href="/#contact">
            Discuss a similar project <ArrowUpRight size={16} />
          </a>
        </div>
        <ProjectPreview project={project} large />
        {!project.image && (
          <p className="case-preview-note">
            The visual above is an illustrative interface concept based on the
            supplied project description, rather than a screenshot of the
            delivered application.
          </p>
        )}
        <div className="case-body">
          <div className="case-story">
            <section>
              <h2>The business need</h2>
              <p>{project.purpose}</p>
            </section>
            <section>
              <h2>The solution</h2>
              <p>{project.solution}</p>
            </section>
            <section>
              <h2>What’s inside</h2>
              <ul className="case-feature-list">
                {project.features.map((f) => (
                  <li key={f}>
                    <Check size={14} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>My contribution</h2>
              <p>{project.contribution}</p>
            </section>
          </div>
          <aside className="case-sidebar">
            <h2>Built with</h2>
            <div className="skill-tags">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="case-role">
              <span>FOCUS</span>
              <p>{project.category.replaceAll(" / ", " · ")}</p>
            </div>
            <p className="case-note">
              A public source-code repository has not been provided for this
              project.
            </p>
          </aside>
        </div>
        <div className="case-bottom-cta">
          <div>
            <h2>Your idea could be next.</h2>
            <p>Let’s talk about the product you want to bring to life.</p>
          </div>
          <Link href="/#contact" className="button button-blue">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="case-next">
          <span>THERE’S MORE TO EXPLORE</span>
          <Link href={`/projects/${next.slug}`}>
            {next.name}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
