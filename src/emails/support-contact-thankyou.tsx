import { Text } from '@react-email/components';

import { MainLayout } from './components/main-layout';

export default function SupportContactThankYouEmail() {
  return (
    <MainLayout title="Thank you for contacting us" preview="Bedankt voor je bericht aan de Wonderkamer">
      <Text>Hello there,</Text>
      <Text>How nice to hear from you!</Text>
      <Text>We will get back to you as soon as possible.</Text>
    </MainLayout>
  );
}
