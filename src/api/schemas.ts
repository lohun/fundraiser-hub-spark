import { z } from "zod";

export const alumniSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  graduationYear: z.number(),
  degree: z.string(),
  company: z.string(),
  role: z.string(),
  fundingStatus: z.enum(["active", "potential", "contacted", "committed", "inactive"]),
  totalContributed: z.number(),
  lastContactDate: z.string(),
  location: z.string(),
});

export type Alumni = z.infer<typeof alumniSchema>;

export const alumniFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "active", "potential", "contacted", "committed", "inactive"]).optional(),
  yearRange: z.tuple([z.number(), z.number()]).optional(),
});

export type AlumniFilter = z.infer<typeof alumniFilterSchema>;

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  targetAmount: z.number(),
  raisedAmount: z.number(),
  status: z.enum(["active", "completed", "planning"]),
  alumniCount: z.number(),
  startDate: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
