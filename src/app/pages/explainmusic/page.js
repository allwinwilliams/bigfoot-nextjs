import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/Header";

export default function ExplainMusic() {
    return (
      <Container sx={{ mt: 2 }}>
        <Header />
        
        <Box style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
          <Typography variant="h3" gutterBottom>Explain Designs here</Typography>
          <p>
            Explain All Designs Across Here
          </p>
          <p>
            <b>Series of images and short text for every design</b>
          </p>
          <p>
            <b>For more, contact crews@bigfoot.land </b>
          </p>
        </Box>
    </Container>
    );
  }