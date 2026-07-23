import { BrevoClient } from '@getbrevo/brevo';
import { render } from '@react-email/render';

import SupportContactEmail from '@/emails/support-contact';
import SupportContactThankYouEmail from '@/emails/support-contact-thankyou';

const SENDER = { email: 'no-reply@wonderkamer.com', name: 'De Wonderkamer' };
const NOTIFICATION_RECIPIENT = { email: 'hallo@wonderkamer.com', name: 'De Wonderkamer' };
const MONITOR_BCC = { email: 'monitor@bushbaby.nl', name: 'De Wonderkamer (Website)' };

export type ContactSubmission = {
  name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
};

function getClient(): BrevoClient {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured');
  }

  return new BrevoClient({ apiKey });
}

export async function sendContactEmails(contact: ContactSubmission): Promise<void> {
  const client = getClient();

  const notificationHtml = await render(
    <SupportContactEmail name={contact.name} email={contact.email ?? ''} phone={contact.phone} subject={contact.subject} message={contact.message} />,
  );

  await client.transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [NOTIFICATION_RECIPIENT],
    bcc: [MONITOR_BCC],
    replyTo: contact.email ? { email: contact.email, name: contact.name } : undefined,
    subject: `Contact request from the website: ${contact.subject}`,
    htmlContent: notificationHtml,
  });

  if (!contact.email) {
    return;
  }

  const thankYouHtml = await render(<SupportContactThankYouEmail />);

  await client.transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: contact.email, name: contact.name }],
    bcc: [MONITOR_BCC],
    subject: 'Contact request received',
    htmlContent: thankYouHtml,
  });
}
