import { Body, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wonderkamer.com';

export function MainLayout({ title, preview, children }: { title: string; preview?: string; children: React.ReactNode }) {
  return (
    <Html lang="nl">
      <Head>
        <title>{title}</title>
      </Head>
      {preview ? <Preview>{preview}</Preview> : null}
      <Body style={{ margin: 0, padding: 0, width: '100%', fontFamily: 'sans-serif', backgroundColor: '#ffe607' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
          <Section style={{ backgroundColor: '#000000', color: '#ffffff', padding: '48px 24px', textAlign: 'left', borderRadius: 8 }}>
            <Img src={`${SITE_URL}/email-assets/wonderkamer-logo.png`} alt="Wonderkamer" height={32} style={{ marginBottom: 16 }} />

            <Img src={`${SITE_URL}/email-assets/divider.png`} alt="" style={{ width: '100%', margin: '32px 0' }} />

            {children}

            <Img src={`${SITE_URL}/email-assets/divider.png`} alt="" style={{ width: '100%', margin: '32px 0' }} />

            <Text style={{ margin: '0 0 16px' }}>
              Have a <span style={{ fontStyle: 'italic', color: '#ffe607' }}>Wonderful</span> day!
            </Text>
          </Section>

          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12, marginTop: 48 }}>
            Powered by ♡ <a href={SITE_URL} style={{ color: '#000000' }}>wonderkamer.com</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
