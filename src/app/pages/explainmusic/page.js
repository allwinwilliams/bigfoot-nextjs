import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";

export default function ExplainMusic() {
    return (
      <Container sx={{ mt: 2 }}>
        <Header />
        <Box style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
          <Typography variant="h3" gutterBottom>We want to explain our designs here</Typography>
          <p>
            <b>We are thrilled to finish our product for our public launch. Thank you for supporting us.</b>
          </p>
          <p>
            However we are still building the site. You can contact us at crew@bigfoot.land and we can have a call to explain.
          </p>
          
          <p>
            <b>For more, contact crew@bigfoot.land or + 91 814753 6059 </b>
          </p>
        </Box>
    </Container>
    );
  }