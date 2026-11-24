import { z } from 'zod';

export const resetPasswordSchema = z.object({
  new: z.string().min(12),
  confirm: z.string().min(12),
  logout: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.confirm !== data.new)
    ctx.addIssue({
      path: ['confirm'],
      code: 'custom',
    });
});
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
