import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";
export default function TermsAndConditions() {
  return (
    <Container sx={{ mt: 2 }}>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h3" gutterBottom>Terms and Conditions</Typography>
        <Typography variant="body1" paragraph>
          Welcome to Bigfoot Clothing, a division of Boredom Technologies LLP, dedicated to providing you with custom-designed clothing that reflects your unique style. By accessing our website, mobile application, or social media platforms ("the Services"), you agree to be bound by these Terms and Conditions. Please read them carefully.
        </Typography>
        <Typography variant="body1" paragraph><strong>1. Acceptance of Terms</strong> By using the Services provided by Bigfoot Clothing, you agree to these Terms and Conditions. If you do not agree to these terms, please do not use our Services.</Typography>
        <Typography variant="body1" paragraph><strong>2. Custom Orders</strong> Given the bespoke nature of our products, all sales are final. Our team works closely with you to ensure that your custom clothing meets your specifications. However, we encourage you to review your design carefully before finalizing your order.</Typography>
        <Typography variant="body1" paragraph><strong>3. Privacy and Personal Information</strong> Your privacy is important to us. Our Privacy Policy, which is part of these Terms, describes how we collect, use, and protect your personal information. By using our Services, you consent to our data practices as described in the Privacy Policy.</Typography>
        <Typography variant="body1" paragraph><strong>4. Intellectual Property</strong> All content on our platforms, including but not limited to designs, text, graphics, logos, and images, is owned by Boredom Technologies LLP and is protected by copyright and intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.</Typography>
        <Typography variant="body1" paragraph><strong>5. User Conduct</strong> You agree to use our Services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of Bigfoot Clothing. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Services.</Typography>
        <Typography variant="body1" paragraph><strong>6. Links to Third-Party Sites</strong> Our Services may contain links to third-party websites or services that are not owned or controlled by Bigfoot Clothing. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</Typography>
        <Typography variant="body1" paragraph><strong>7. Changes to Terms</strong> We reserve the right to modify these Terms and Conditions at any time. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.</Typography>
        <Typography variant="body1" paragraph><strong>8. Governing Law</strong> These Terms and Conditions are governed by the laws of the jurisdiction where Boredom Technologies LLP is registered, without regard to its conflict of law provisions.</Typography>
        <Typography variant="body1" paragraph><strong>9. Contact Us</strong> If you have any questions about these Terms, please contact us at the provided customer service contact details.</Typography>
        <Typography variant="body1" paragraph><strong>10. Disclaimer</strong> We strive to ensure that information on our Services is accurate and up-to-date. However, we do not warrant the accuracy or completeness of the information provided. We may make changes to the content at any time without notice.</Typography>
        <Typography variant="body1" paragraph><strong>11. Limitation of Liability</strong> In no event shall Bigfoot Clothing, Boredom Technologies LLP, or its affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Services.</Typography>
        <Typography variant="body1" paragraph><strong>12. User Content</strong> You may be able to submit content to our platforms. By submitting content, you grant Bigfoot Clothing a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and display such content in connection with the Services.</Typography>
        <Typography variant="body1" paragraph><strong>13. Termination</strong> We may terminate or suspend access to our Services immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms and Conditions.</Typography>
        <Typography variant="body1" paragraph><strong>14. Acknowledgment</strong> By using our Services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.</Typography>
      </Box>
    </Container>
  );
}
