'use client';

import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) {
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setIsReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.onload = () => window.grecaptcha?.ready(() => setIsReady(true));
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const execute = useCallback(async (action: string): Promise<string> => {
    if (!SITE_KEY || !window.grecaptcha) {
      throw new Error('reCAPTCHA is not ready');
    }

    return window.grecaptcha.execute(SITE_KEY, { action });
  }, []);

  return { isReady: isReady && Boolean(SITE_KEY), execute };
}
