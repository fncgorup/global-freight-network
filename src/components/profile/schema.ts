import * as z from "zod";

export const profileFormSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  bio: z.string().optional(),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;