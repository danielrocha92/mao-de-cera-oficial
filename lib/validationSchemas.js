import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome não pode exceder 50 caracteres'),
  email: z.string()
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phone: z.string()
    .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .optional()
    .or(z.literal('')), // Allows empty string for optional phone
  address: z.string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .max(100, 'Endereço não pode exceder 100 caracteres')
    .optional()
    .or(z.literal('')), // Allows empty string for optional address
});
