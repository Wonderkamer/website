import { beforeEach, describe, expect, it, vi } from 'vitest';

const verifyRecaptchaToken = vi.fn();
const sendContactEmails = vi.fn();

vi.mock('@/lib/recaptcha', () => ({ verifyRecaptchaToken }));
vi.mock('@/lib/brevo', () => ({ sendContactEmails }));

const validPayload = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '0612345678',
  subject: 'Vraag over lidmaatschap',
  message: 'Hallo, ik heb een vraag.',
  recaptchaToken: 'test-token',
};

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/support/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/support/contact', () => {
  beforeEach(() => {
    verifyRecaptchaToken.mockReset();
    sendContactEmails.mockReset();
  });

  it('returns 400 for an invalid payload', async () => {
    const { POST } = await import('./route');
    const response = await POST(makeRequest({ name: '' }));
    expect(response.status).toBe(400);
    expect(verifyRecaptchaToken).not.toHaveBeenCalled();
  });

  it('returns 403 when recaptcha verification fails', async () => {
    verifyRecaptchaToken.mockResolvedValue({ ok: false, score: 0.1 });
    const { POST } = await import('./route');
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(403);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it('sends contact emails and returns 202 on success', async () => {
    verifyRecaptchaToken.mockResolvedValue({ ok: true, score: 0.9 });
    sendContactEmails.mockResolvedValue(undefined);

    const { POST } = await import('./route');
    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(202);
    expect(sendContactEmails).toHaveBeenCalledTimes(1);
    expect(sendContactEmails).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0612345678',
      subject: 'Vraag over lidmaatschap',
      message: 'Hallo, ik heb een vraag.',
    });
  });

  it('returns 502 when sending emails fails', async () => {
    verifyRecaptchaToken.mockResolvedValue({ ok: true, score: 0.9 });
    sendContactEmails.mockRejectedValue(new Error('boom'));

    const { POST } = await import('./route');
    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(502);
  });
});
