import { z } from 'zod';

export const documentTypeSchema = z.enum(['CC', 'CE', 'NIT', 'PASSPORT']);

export const documentNumberSchema = z
  .string()
  .min(5, 'Document number must be at least 5 characters')
  .regex(/^[A-Za-z0-9]+$/, 'Document number can only contain letters and numbers');

export const lookupFormSchema = z.object({
  documentType: documentTypeSchema,
  documentNumber: documentNumberSchema,
});

export type LookupFormData = z.infer<typeof lookupFormSchema>;
