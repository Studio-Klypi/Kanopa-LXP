import { z } from 'zod';

export const createOrganizationSchema = z.object({
  // step 1
  name: z.string(),
  alias: z.string().regex(/^[a-z0-9-]+$/),
  type: z.enum(['of', 'company', 'freelance']),
  // step 2
  logo: z.file().optional(),
  color: z.hex(),
  // step 3
  businessName: z.string(),
  siret: z.string(),
  activityNumber: z.string().optional(),
  country: z.string().max(4),
  qualiopiCertified: z.boolean().optional(),
  // step 4
  plan: z.string().optional(),
});
export type CreateOrganizationPayload = z.infer<typeof createOrganizationSchema>;
