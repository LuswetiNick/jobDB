import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name must be at least 1 character long"),
  location: z.string().min(1, "Company location must be defined"),
  about: z.string().min(10, "Please provide information about your company"),
  logo: z.string().min(1, "Please provide your company logo"),
  website: z.string().url("Please provide a valid company URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(1, "Pleas upload your resume"),
});
