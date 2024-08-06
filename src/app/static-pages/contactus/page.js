import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/Header";
export default function Contact() {
    return (
      <Container sx={{ mt: 2 }}>
        <Header />
        
        <Box style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
          <Typography variant="h3" gutterBottom>Contact Us</Typography>
          <p>
            For any queries,
          </p>
          <p>
            <b>Phone: +91 87549 68346</b>
          </p>
          <p>
            <b>Email: crews@bigfoot.land </b>
          </p>
        </Box>
    </Container>
    );
  }