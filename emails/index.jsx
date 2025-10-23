import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const KoalaWelcomeEmail = ({
  userFirstname = "Valued Customer",
  doctorname = "your doctor",
  date = "an upcoming date",
  time = "a scheduled time",
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your appointment with {doctorname} is confirmed.</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.svg`}
          width="170"
          height="50"
          alt="Medcare"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Your appointment with <strong>Dr. {doctorname}</strong> has been confirmed for:
        </Text>
        <Text style={paragraph}>
          📅 <strong>{date}</strong>
          <br />
          ⏰ <strong>{time}</strong>
        </Text>
        <Text style={paragraph}>
          If you have any questions or need to reschedule, please contact our support team.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://localhost:3000">
            View Appointment
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Medcare Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

// Add your styles here (as in your original file)
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px' };
const logo = { margin: '0 auto' };
const paragraph = { fontSize: '16px', lineHeight: '26px' };
const btnContainer = { textAlign: 'center' };
const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
};
const hr = { borderColor: '#cccccc', margin: '20px 0' };
const footer = { color: '#8898aa', fontSize: '12px' };
