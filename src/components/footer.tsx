import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { person } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/#home" className="footer-wordmark">
            Let’s build what’s <span>next.</span>
            <ArrowUpRight />
          </Link>
          <div className="footer-socials">
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nilesh on GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nilesh on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${person.email}`} aria-label="Email Nilesh">
              <ArrowUpRight size={22} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nilesh Kanjariya</p>
          <div className="footer-links">
            <Link href="/#services">Services</Link>
            <Link href="/#projects">Work</Link>
            <Link href="/#contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <p>Designed with purpose. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
