import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./design.css";
import "./animations.css";

const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 800",
});
const inter = localFont({
  src: "../../public/fonts/inter.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "400 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nilesh Kanjariya — Full Stack Developer & Product Partner",
    template: "%s | Nilesh Kanjariya",
  },
  description:
    "Freelance full stack developer in Ahmedabad building SaaS platforms, custom web applications, reliable backends, and practical AI solutions. Let's build your next digital product.",
  applicationName: "Nilesh Kanjariya Portfolio",
  authors: [{ name: "Nilesh Kanjariya" }],
  keywords: [
    "Nilesh Kanjariya",
    "Freelance Full Stack Developer",
    "SaaS development",
    "Next.js developer",
    "NestJS developer",
    "AI automation",
    "Ahmedabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nilesh Kanjariya",
    title: "Ideas into products. Built with purpose.",
    description:
      "Full stack development, SaaS platforms & practical AI. Your idea deserves a thoughtful technical partner.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilesh Kanjariya — Developer & Product Partner",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navigation />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
