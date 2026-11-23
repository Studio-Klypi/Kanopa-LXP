import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email(),
});
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
