"use client";

import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Bigfoot
      </Typography>
      <Typography variant="body1" gutterBottom>
        Conceptual Luxury Casuals
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" component={Link} href="/product">
          Go to Product Page
        </Button>
      </Box>
    </Container>
  );
}
