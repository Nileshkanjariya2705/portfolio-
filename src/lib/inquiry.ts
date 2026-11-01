import { z } from "zod";

export const projectTypes = [
  "SaaS product",
  "Custom web application",
  "Backend & API development",
  "Marketplace or booking platform",
  "AI & automation",
  "Third-party integrations",
  "Something else",
] as const;
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(100),
  email: z.email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(150).optional().default(""),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  budget: z
    .enum([
      "",
      "Let's discuss",
      "Under ₹50,000",
      "₹50,000–₹1,50,000",
      "₹1,50,000–₹5,00,000",
      "₹5,00,000+",
      "USD / other currency",
    ])
    .optional()
    .default(""),
  details: z
    .string()
    .trim()
    .min(30, "Tell me a little more—at least 30 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().finite(),
});
export type Inquiry = z.infer<typeof inquirySchema>;

export function inquiryText(data: Inquiry) {
  return `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not specified"}\nProject: ${data.projectType}\nBudget: ${data.budget || "Let's discuss"}\n\n${data.details}`;
}
