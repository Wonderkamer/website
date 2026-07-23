'use client';

import { useEffect, useRef, useState } from 'react';

export function VersionFooterButton({ version, gitSha }: { version: string; gitSha?: string }) {
  const [showExtended, setShowExtended] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const toggle = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setShowExtended(false);
      return;
    }

    setShowExtended(true);
    timeoutRef.current = setTimeout(() => {
      setShowExtended(false);
      timeoutRef.current = null;
    }, 8000);
  };

  return (
    <button type="button" className="ms-5 text-sm text-gray-500 hover:text-gray-900" onClick={toggle}>
      v{version}
      {showExtended && gitSha ? `+${gitSha}` : ''}
    </button>
  );
}
