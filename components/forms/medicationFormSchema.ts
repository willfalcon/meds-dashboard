import * as z from 'zod';

export const medicationFormSchema = z.object({
  name: z.string().min(2),
  dose: z.coerce.number().multipleOf(0.001).min(0.001),
  morning: z.boolean(),
  night: z.boolean(),
  asNeeded: z.boolean(),
});
