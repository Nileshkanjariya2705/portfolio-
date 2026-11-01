import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>This page isn’t in the plan.</h1>
      <p>Let’s get you back to the work, the ideas, and what comes next.</p>
      <Link href="/" className="button button-blue">
        Back to the portfolio <ArrowUpRight size={17} />
      </Link>
    </main>
  );
}
