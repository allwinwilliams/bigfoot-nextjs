import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";
export default function ReturnsPolicy() {
  return (
    <Container sx={{ mt: 2 }}>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h3" gutterBottom>Return Policy</Typography>
        <Typography variant="body1" paragraph>
          At Bigfoot, we specialize in crafting custom-designed clothing that reflects the unique style and preferences of each of our customers. Our dedication to delivering personalized, on-demand fashion is what sets us apart. Due to the bespoke nature of our offerings, our return policy is tailored to ensure both clarity and customer satisfaction.
        </Typography>
        <Typography variant="h5" gutterBottom>Refunds Policy:</Typography>
        <Typography variant="body1" paragraph>
          Given the custom design of our clothing, we generally do not offer refunds. Each piece is carefully crafted to meet individual specifications, making it a unique item for the customer who ordered it.
        </Typography>
        <Typography variant="h5" gutterBottom>Exceptions - Defective or Incorrect Orders:</Typography>
        <Typography variant="body1" paragraph>
          We are committed to the quality of our products and the accuracy of our order fulfillment. If a product arrives defective, damaged, or significantly different from what was depicted on our website, we acknowledge the need to rectify the situation. In these instances, customers will be eligible for a full refund. This commitment is our way of ensuring trust and satisfaction with our brand.
        </Typography>
        <Typography variant="h5" gutterBottom>Procedure for Reporting Issues:</Typography>
        <Typography variant="body1" paragraph><strong>Immediate Notification:</strong> Please contact us within 48 hours of receiving a product if it is defective, damaged, or not as ordered. Prompt communication is essential for a swift resolution.</Typography>
        <Typography variant="body1" paragraph><strong>Proof of Issue:</strong> To assist in our assessment, we may ask for photographic evidence of the defect or discrepancy. This aids our quality control efforts and validates the claim.</Typography>
        <Typography variant="body1" paragraph><strong>Return Authorization:</strong> Following the confirmation of the issue, we will provide instructions for returning the defective or incorrect item. Please do not return any items without our prior consent to ensure the process is handled efficiently.</Typography>
        <Typography variant="h5" gutterBottom>Special Considerations:</Typography>
        <Typography variant="body1" paragraph>
          While our policy typically does not permit refunds except in the cases mentioned above, we understand that unique situations may arise. If you believe your situation requires special attention, please reach out to us at <Link href="mailto:crew@bigfoot.com">crew@bigfoot.com</Link>. We will consider each request on an individual basis, though we cannot guarantee a refund in every instance.
        </Typography>
        <Typography variant="h5" gutterBottom>Contact Information:</Typography>
        <Typography variant="body1" paragraph>
          For inquiries or to report a problem, please get in touch with our customer service team at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: <Link href="mailto:crew@bigfoot.com">crew@bigfoot.com</Link><br />
          Phone: +91 99005 36059
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for understanding our return policy. At Bigfoot, we are passionate about providing high-quality, tailor-made apparel that truly represents each customer's personal style and preferences.
        </Typography>
      </Box>
    </Container>
  );
}
