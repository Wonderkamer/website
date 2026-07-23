import { Column, Row, Text } from '@react-email/components';

import { MainLayout } from './components/main-layout';

type SupportContactEmailProps = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ borderTop: '1px solid #333333', padding: '12px 0' }}>
      <Column style={{ width: '30%', fontSize: 14, fontWeight: 600, verticalAlign: 'top' }}>{label}</Column>
      <Column style={{ fontSize: 14, verticalAlign: 'top' }}>{value}</Column>
    </Row>
  );
}

export default function SupportContactEmail({ name, email, phone, subject, message }: SupportContactEmailProps) {
  return (
    <MainLayout title="Incoming contact request" preview={`Nieuw contactverzoek van ${name}`}>
      <Text style={{ fontSize: 24, fontWeight: 600, margin: '0 0 24px' }}>Incoming contact request</Text>
      <Text>Hello there,</Text>
      <Text>
        We&apos;ve received a contact request on <span style={{ color: '#ffe607' }}>wonderkamer.com</span>
      </Text>

      <Field label="Subject" value={subject} />
      <Field label="Message" value={message} />
      <Field label="From" value={name} />
      <Field label="Email" value={email} />
      <Field label="Phone" value={phone} />
    </MainLayout>
  );
}

SupportContactEmail.PreviewProps = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+31 6 12345678',
  subject: 'Vraag over lidmaatschap',
  message: 'Hoi, ik ben benieuwd naar de mogelijkheden voor een Flex1 lidmaatschap.',
} satisfies SupportContactEmailProps;
