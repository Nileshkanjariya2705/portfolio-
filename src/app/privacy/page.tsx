import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How project inquiries sent through Nilesh Kanjariya's portfolio are handled.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main id="main" className="container prose-page">
      <Link href="/#contact" className="back-link">
        <ArrowLeft size={14} /> Back to contact
      </Link>
      <h1>
        A little clarity
        <br />
        about your privacy.
      </h1>
      <p>
        This portfolio belongs to Nilesh Kanjariya. The contact form is here to
        help us discuss your project.
      </p>
      <h2>What you share</h2>
      <p>
        The form asks for your name, email, project type, and project details.
        Your company and budget are optional. Please avoid sharing passwords,
        financial account information, or confidential material in an initial
        inquiry.
      </p>
      <h2>How inquiries are used</h2>
      <p>
        When direct delivery is configured, your inquiry is sent by email
        through Resend and used to respond to you and discuss potential work. If
        direct delivery is unavailable, the form offers an email draft that you
        choose to send through your own email app. A draft is not a sent
        inquiry.
      </p>
      <h2>Technical information</h2>
      <p>
        The hosting provider may process standard connection information, such
        as your IP address, for operating and protecting the site. The form uses
        a hidden spam field, timing checks, and a temporary request limit. This
        site does not include advertising trackers or analytics scripts. Your
        browser can save a local preference for whether decorative animations
        are paused. This preference stays on your device and contains no contact
        or project information.
      </p>
      <h2>Retention and your choices</h2>
      <p>
        Project correspondence is kept in email as needed for the conversation
        and related business records. To ask about, correct, or request removal
        of your inquiry, contact{" "}
        <a href={`mailto:${person.email}`}>{person.email}</a>.
      </p>
      <h2>External websites</h2>
      <p>
        Project and social links open external services with their own privacy
        practices.
      </p>
    </main>
  );
}
