import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const dosis = localFont({
  variable: '--font-dosis',
  src: [
    { path: './fonts/dosis/Dosis-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: './fonts/dosis/Dosis-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/dosis/Dosis-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/dosis/Dosis-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/dosis/Dosis-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/dosis/Dosis-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  title: 'Wonderkamer',
  description: 'Werkplek voor zelfstandigen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dosis.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
