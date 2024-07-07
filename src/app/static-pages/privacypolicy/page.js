import { Container, Box, Typography, Link } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container sx={{ mt: 2 }}>
      <Box 
        sx={{
          paddingY: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none'
        }}
        component={Link}
        href={'/'}
      >
        <img
          src='/logo.png'
          alt='Bigfoot Logo'
          style={{ width: 48, marginBottom: 8 }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Bigfoot Clothing
        </Typography>
        <Typography variant="body1" gutterBottom>
          Conceptual Luxury Casuals
        </Typography>
      </Box>
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h3" gutterBottom>Privacy Policy</Typography>
        <Typography variant="body1" paragraph>
          <strong>Introduction</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          At Bigfoot Clothing, we respect your privacy and are committed to safeguarding your personal data. This Privacy Policy outlines our practices concerning the collection, use, and protection of your personal information in compliance with Indian laws and international best practices.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Information Collection and Use</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          We collect personal information such as your name, contact details, age, and preferences like favorite music and sports teams to offer you personalized products and enhance your shopping experience. Your data is used strictly for purposes such as order processing, customer service, and tailored promotions, and is collected with your explicit consent.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Sensitive Personal Data</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          We recognize the importance of additional safeguards for sensitive personal data. If we ever need to collect such information, we will do so with your explicit consent and ensure it is used only for the intended purpose, with heightened security measures.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Data Storage and Transfer</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          Your personal data is stored securely on servers located in India, adhering to data localization requirements. Should we need to transfer data internationally, we will take appropriate measures to ensure your information is protected in accordance with Indian law and international agreements.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>User Rights</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, correct, or delete your personal information held by us. You can also opt-out of receiving promotional communications at any time. For any such requests or concerns, please contact our Data Protection Officer at <Link href="mailto:crew@bigfoot.com">crew@bigfoot.com</Link>.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Grievance Redressal</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          We have appointed a Grievance Officer to address any concerns or complaints regarding your personal data. You can reach out to our Grievance Officer at <Link href="mailto:crew@bigfoot.com">crew@bigfoot.com</Link>. We are committed to resolving any issues in a timely and efficient manner.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Data Breach Notification</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          In the unlikely event of a data breach, we will promptly notify affected individuals and relevant authorities, detailing the nature of the breach and the steps we are taking to address it.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Changes to This Policy</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy to reflect changes in our practices or legal obligations. We encourage you to review this policy periodically. Any significant changes will be communicated to you through our website or directly via email.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Consent</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          By using Bigfoot Clothing's services, you consent to the collection, use, and sharing of your personal information as described in this policy. If you do not agree with these terms, please do not use our services.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Contact Us</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions about this Privacy Policy or our data protection practices, please contact us at +91 99005 36059.
        </Typography>
      </Box>
    </Container>
  );
}
