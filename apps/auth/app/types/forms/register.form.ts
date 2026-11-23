import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(12),
  invitationCode: z.string().optional(),
  accept: z.boolean(),
});
export type RegisterPayload = z.infer<typeof registerSchema>;
