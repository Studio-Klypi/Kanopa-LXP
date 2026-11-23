import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(12),
  keep: z.boolean().optional(),
});
export type LoginPayload = z.infer<typeof loginSchema>;
