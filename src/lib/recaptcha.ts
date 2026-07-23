const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;
const EXPECTED_ACTION = 'contact';

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

export async function verifyRecaptchaToken(token: string): Promise<{ ok: boolean; score?: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  const result = (await response.json()) as RecaptchaVerifyResponse;

  const ok = result.success === true && (result.score ?? 0) >= MIN_SCORE && result.action === EXPECTED_ACTION;

  return { ok, score: result.score };
}
