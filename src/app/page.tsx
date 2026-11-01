import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  Plug,
  Server,
  Sparkles,
  Store,
  Terminal,
  Workflow,
} from "lucide-react";
import { InteractiveArt, Reveal } from "@/components/motion";
import { SystemArt } from "@/components/system-art";
import { ProjectGallery } from "@/components/project-gallery";
import { ContactForm } from "@/components/contact-form";
import { person, services, skillGroups, steps } from "@/lib/content";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const serviceIcons = {
  panels: PanelsTopLeft,
  layers: Layers3,
  terminal: Terminal,
  database: Database,
  store: Store,
  sparkles: Sparkles,
  workflow: Workflow,
  plug: Plug,
};
const skillIcons = [Code2, Server, Database, Sparkles, Plug, CheckCheck];

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${siteUrl}/#nilesh`,
            name: person.name,
            url: siteUrl,
            jobTitle:
              "Freelance Full Stack Developer & Digital Product Development Partner",
            description:
              "SaaS platforms, custom web applications, backend engineering, and AI-powered automation.",
            email: person.email,
            sameAs: [person.github, person.linkedin],
            homeLocation: {
              "@type": "Place",
              name: "Ahmedabad, Gujarat, India",
            },
            knowsAbout: [
              "Full Stack Development",
              "SaaS",
              "Next.js",
              "NestJS",
              "Agentic AI",
              "Business Automation",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-main">
            <Reveal className="hero-content">
              <div className="eyebrow hero-eyebrow">
                <span className="availability-dot" /> INDEPENDENT DEVELOPER.
                YOUR PRODUCT PARTNER.
              </div>
              <h1>
                <span className="hero-title-line">
                  <span>I build digital</span>
                </span>{" "}
                <span className="hero-title-line">
                  <span>
                    <span className="hero-blue">products</span> that
                  </span>
                </span>{" "}
                <span className="hero-title-line">
                  <span>
                    move you{" "}
                    <span className="forward-word">
                      forward
                      <svg viewBox="0 0 320 20" aria-hidden="true">
                        <path d="M3 15C79 2 223 0 315 8" />
                      </svg>
                      .
                    </span>
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                From SaaS platforms to AI-powered solutions, I turn ambitious
                ideas into reliable digital products. Thoughtfully designed.
                Built from end to end.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="button button-blue">
                  Let’s build your product <ArrowUpRight size={18} />
                </a>
                <a href="#projects" className="text-link">
                  Explore my work <ArrowDownRight size={17} />
                </a>
              </div>
              <div className="hero-signoff">
                <span className="mini-monogram">NK</span>
                <div>
                  <strong>Nilesh Kanjariya</strong>
                  <span>Full Stack & Agentic AI Developer</span>
                </div>
                <span className="signoff-divider" />
                <span className="hero-location">
                  <MapPin size={14} /> Ahmedabad, India
                </span>
              </div>
            </Reveal>
            <Reveal className="hero-art-wrap" delay={0.12}>
              <InteractiveArt>
                <SystemArt />
              </InteractiveArt>
            </Reveal>
          </div>
          <div className="hero-bottom">
            <span>BUSINESS THINKING. ENGINEERING CRAFT.</span>
            <a href="#services">
              A little further down <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </section>

      <div className="tech-ribbon">
        <div
          className="container tech-ribbon-inner"
          role="region"
          aria-label="Technology toolkit"
          tabIndex={0}
        >
          <span className="ribbon-label">
            THE TOOLS BEHIND
            <br />
            <strong>the possibilities.</strong>
          </span>
          <span className="tech-logo react-logo">
            <svg viewBox="-12 -12 24 24" aria-hidden="true">
              <circle r="1.5" />
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
            React
          </span>
          <span className="tech-logo next-logo">
            NEXT<span>.js</span>
          </span>
          <span className="tech-logo">
            <span className="ts-icon">TS</span>TypeScript
          </span>
          <span className="tech-logo nest-logo">
            <Braces />
            NestJS
          </span>
          <span className="tech-logo">
            <Database />
            PostgreSQL
          </span>
          <span className="tech-logo">
            <Sparkles />
            Agentic AI
          </span>
        </div>
      </div>

      <section id="services" className="section services-section">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <div className="eyebrow">
                <span className="section-index">01 /</span> WHAT I CAN HELP YOU
                BUILD
              </div>
              <h2>
                Your vision.
                <br />
                The right <span className="serif-word">solution.</span>
              </h2>
            </div>
            <p>
              Great software starts with understanding your business. I bring
              the technical depth to take your idea from the first conversation
              to a working product.
            </p>
          </Reveal>
          <div className="services-grid">
            {services.map((service, i) => {
              const Icon =
                serviceIcons[service.icon as keyof typeof serviceIcons];
              return (
                <Reveal
                  key={service.title}
                  delay={(i % 4) * 0.04}
                  className={`service-card ${i === 5 ? "service-highlight" : ""}`}
                >
                  <div className="service-top">
                    <span className="service-icon">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <span className="service-number">0{i + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">{service.tags}</div>
                  <a
                    href="#contact"
                    className="service-link"
                    aria-label={`Discuss ${service.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </Reveal>
              );
            })}
          </div>
          <div className="section-afterthought">
            <span>
              <span className="tiny-dot" /> One development partner. The full
              product journey.
            </span>
            <a className="text-link" href="#contact">
              Let’s talk about your idea <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="section work-section">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <div className="eyebrow">
                <span className="section-index">02 /</span> SELECTED WORK
              </div>
              <h2>
                Real problems.
                <br />
                <span className="serif-word">Thoughtful</span> products.
              </h2>
            </div>
            <p>
              A selection of platforms and experiences I’ve helped build.
              Different industries. One focus: software that serves a purpose.
            </p>
          </Reveal>
          <ProjectGallery />
        </div>
      </section>

      <section className="section stack-section" id="stack">
        <div className="container">
          <Reveal className="section-heading stack-heading">
            <div className="eyebrow">
              <span className="section-index">03 /</span> THE TECHNOLOGY TOOLKIT
            </div>
            <h2>
              The full stack.
              <br />
              And the <span className="serif-word">bigger picture.</span>
            </h2>
            <p>The right tools for your product, chosen for what they solve.</p>
          </Reveal>
          <div className="stack-grid">
            {skillGroups.map((group, i) => {
              const Icon = skillIcons[i];
              return (
                <Reveal
                  key={group.title}
                  className="stack-group"
                  delay={(i % 3) * 0.04}
                >
                  <div className="stack-title">
                    <Icon size={20} />
                    <h3>{group.title}</h3>
                    <span>0{i + 1}</span>
                  </div>
                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid">
          <Reveal className="about-art">
            <div className="about-art-top">
              <span>THE PERSON BEHIND THE CODE</span>
              <ArrowUpRight size={20} />
            </div>
            <div className="giant-monogram">
              N<span>K</span>
              <i aria-hidden="true" />
            </div>
            <div className="about-art-bottom">
              <span>
                <MapPin size={13} /> Ahmedabad, Gujarat
              </span>
              <span>IDEAS → REALITY</span>
            </div>
            <div className="about-art-ring" />
          </Reveal>
          <Reveal className="about-copy">
            <div className="eyebrow">
              <span className="section-index">04 /</span> A LITTLE ABOUT ME
            </div>
            <h2>
              A developer.
              <br />A thinker. <span className="serif-word">Your partner.</span>
            </h2>
            <p>
              I’m Nilesh, a full stack developer who cares about what happens
              beyond the code. I build practical software that solves real
              business problems.
            </p>
            <p>
              From coaching SaaS and property platforms to B2B marketplaces and
              travel experiences, I connect the pieces: interfaces, backend
              architecture, databases, integrations, and AI-powered automation.
            </p>
            <p>
              My approach is simple: understand your business first, then build
              something reliable, maintainable, and ready for what comes next.
            </p>
            <div className="about-values">
              <span>
                <Check size={15} /> Business-first thinking
              </span>
              <span>
                <Check size={15} /> End-to-end ownership
              </span>
              <span>
                <Check size={15} /> Maintainable architecture
              </span>
              <span>
                <Check size={15} /> Practical AI & automation
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="philosophy-band">
        <div className="container">
          <Braces size={26} />
          <p>
            Understand the problem. Design the solution.
            <br />
            <strong>Build it right. Scale it with confidence.</strong>
          </p>
          <span>THE WAY I BUILD</span>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <div className="eyebrow">
                <span className="section-index">05 /</span> FROM FIRST HELLO TO
                LAUNCH
              </div>
              <h2>
                A clear process.
                <br />A shared <span className="serif-word">direction.</span>
              </h2>
            </div>
            <p>
              You bring the vision. We work through the details together, with a
              clear plan and thoughtful decisions at every step.
            </p>
          </Reveal>
          <div className="process-grid">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                className="process-step"
                delay={(i % 3) * 0.05}
              >
                <div className="step-number">
                  <span>0{i + 1}</span>
                  <ArrowRight size={17} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-copy">
            <div className="eyebrow">
              <span className="section-index">06 /</span> YOUR NEXT CHAPTER
              STARTS HERE
            </div>
            <h2>
              Have an idea?
              <br />
              Let’s make it
              <br />
              <span className="serif-word">something great.</span>
              <ArrowDownRight className="contact-heading-arrow" />
            </h2>
            <p>
              Launching a SaaS product? Automating your operations? Looking for
              a development partner? Tell me what you’re thinking.
            </p>
            <a className="contact-email" href={`mailto:${person.email}`}>
              {person.email}
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-links">
              <a href={`tel:${person.phone.replaceAll(" ", "")}`}>
                <Phone size={15} />
                {person.phone}
              </a>
              <span>
                <Globe2 size={15} /> Ahmedabad, India · Working globally
              </span>
            </div>
            <div className="contact-socials">
              <a href={person.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> GitHub <ArrowUpRight size={13} />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="contact-note">
              <Mail size={17} />
              <p>
                Prefer a conversation?
                <br />
                <strong>A simple email is a great place to start.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
