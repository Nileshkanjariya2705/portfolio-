"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { inquirySchema, projectTypes, inquiryText } from "@/lib/inquiry";
import { person } from "@/lib/content";
import Link from "next/link";

export function ContactForm() {
  const startedAt = useRef(0);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setErrors({});
    setStatus("");
    setDraft("");
    const fields = Object.fromEntries(new FormData(form));
    const result = inquirySchema.safeParse({
      ...fields,
      startedAt: startedAt.current || Date.now(),
    });
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues)
        nextErrors[String(issue.path[0])] ??= issue.message;
      setErrors(nextErrors);
      (
        form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement
      )?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();
      if (data.code === "EMAIL_NOT_CONFIGURED") {
        setDraft(
          `mailto:${person.email}?subject=${encodeURIComponent(`Project inquiry: ${result.data.projectType}`)}&body=${encodeURIComponent(inquiryText(result.data))}`,
        );
        setStatus(
          "Your inquiry is ready. Use the button below to open it in your email app, then send it. It has not been sent yet.",
        );
      } else if (!response.ok) {
        setStatus(
          data.error ||
            "Your inquiry could not be sent. Please try again or email me directly.",
        );
      } else {
        setSent(true);
        form.reset();
        startedAt.current = Date.now();
      }
    } catch {
      setStatus(
        "We couldn’t connect. Your message is still here—please try again or email me directly.",
      );
    } finally {
      setPending(false);
    }
  }

  const error = (name: string) =>
    errors[name] && (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    );
  if (sent)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={38} />
        <h3>Your idea is on its way.</h3>
        <p>
          Thanks for reaching out. I’ll review your project details and get back
          to you by email.
        </p>
        <button
          className="button button-outline"
          onClick={() => {
            setSent(false);
            setStatus("");
          }}
        >
          Send another inquiry <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      onFocusCapture={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
    >
      <div className="form-heading">
        <h3>Tell me what you have in mind.</h3>
        <span>
          Let’s make it happen <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="form-grid">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            minLength={2}
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {error("name")}
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {error("email")}
        </label>
        <label>
          Company <small>(optional)</small>
          <input
            name="company"
            autoComplete="organization"
            placeholder="Your company or startup"
            maxLength={150}
          />
        </label>
        <label>
          Project type <span>*</span>
          <select
            name="projectType"
            required
            defaultValue=""
            aria-invalid={!!errors.projectType}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
          >
            <option value="" disabled>
              What are we building?
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {error("projectType")}
        </label>
        <label className="full-width">
          Estimated budget <small>(optional)</small>
          <select name="budget" defaultValue="">
            <option value="">Let’s find the right fit</option>
            {[
              "Let's discuss",
              "Under ₹50,000",
              "₹50,000–₹1,50,000",
              "₹1,50,000–₹5,00,000",
              "₹5,00,000+",
              "USD / other currency",
            ].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="full-width">
          A little about your project <span>*</span>
          <textarea
            name="details"
            placeholder="What’s your idea? Tell me about your goals, the problem you’re solving, and anything else I should know…"
            rows={4}
            required
            minLength={30}
            maxLength={5000}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
          />
          {error("details")}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status && (
        <p
          className={`form-status ${draft ? "draft-status" : ""}`}
          role="status"
        >
          {status}
        </p>
      )}
      {draft && (
        <a href={draft} className="button button-outline email-draft">
          <Mail size={16} /> Open inquiry in email app{" "}
          <ArrowUpRight size={16} />
        </a>
      )}
      <div className="form-bottom">
        <p>
          Your details stay private.
          <br />
          By submitting, you agree to the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <button className="button button-blue" type="submit" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle size={16} className="spin" /> Sending…
            </>
          ) : (
            <>
              Send project inquiry <ArrowUpRight size={17} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
