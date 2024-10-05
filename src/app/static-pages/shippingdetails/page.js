import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";
export default function ShippingInformation() {
  return (
    <Container sx={{ mt: 2 }}>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h3" gutterBottom>Shipping Information</Typography>
        <Typography variant="body1" paragraph>
          We're thrilled you've chosen Bigfoot, and we're eager for you to experience the quality and adventure our products bring. We're committed to delivering your order swiftly, backed by our dedicated courier network, to ensure you get your items safely and as soon as possible.
        </Typography>
        <Typography variant="body1" paragraph>Here's how it works:</Typography>
        <ul style={{ paddingLeft: '20px' }}>
          <Typography component="li" variant="body1"><strong>After your order is confirmed</strong>, we'll dispatch it within 2-4 business days.</Typography>
          <Typography component="li" variant="body1"><strong>Once dispatched</strong>, expect your Bigfoot items to journey to your doorstep within 4-7 business days, depending on your location.</Typography>
          <Typography component="li" variant="body1">Stay informed about your order's journey! You'll receive a tracking link via email or WhatsApp shortly after your order is dispatched.</Typography>
          <Typography component="li" variant="body1">For updates, we'll reach out through Email, SMS, or WhatsApp. And remember, the tracking link will be shared with you via email or WhatsApp as soon as your order is on its way.</Typography>
          <Typography component="li" variant="body1">Should you have any questions or concerns about your order's status, our support team is here to help at <Link href="mailto:crew@bigfoot.land">crew@bigfoot.land</Link>.</Typography>
        </ul>
        <Typography variant="body1" paragraph>
          Please note, our current expeditions are limited to domestic destinations, as international shipping is not available at this time. Thank you for your understanding.
        </Typography>
        <Typography variant="body1" paragraph>
          Embrace the adventure,<br />
          <strong>The Bigfoot Team</strong>
        </Typography>
      </Box>
    </Container>
  );
}
