import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Naam is verplicht').max(30, 'Naam mag maximaal 30 tekens bevatten'),
  email: z.string().trim().min(1, 'E-mail is verplicht').email('Voer een geldig e-mailadres in'),
  phone: z.string().trim().min(1, 'Telefoon is verplicht').max(30, 'Telefoon mag maximaal 30 tekens bevatten'),
  subject: z.string().trim().min(1, 'Onderwerp is verplicht').max(120, 'Onderwerp mag maximaal 120 tekens bevatten'),
  message: z.string().trim().min(1, 'Boodschap is verplicht').max(1000, 'Boodschap mag maximaal 1000 tekens bevatten'),
  recaptchaToken: z.string().min(1, 'Captcha is verplicht'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
