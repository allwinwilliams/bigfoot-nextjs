import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/Header";

export default function About() {
    return (
        <Container sx={{ mt: 4 }}>
            <Header />

            <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem', textAlign: 'center' }}>
                    About Bigfoot
                </Typography>

                <Box mb={6}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        Our Philosophy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Bigfoot is built on the belief that fashion is a powerful tool for self-expression. We aim to provide more than just clothing; 
                        we offer a platform for creativity and individuality. Our customizable T-shirts and lifestyle accessories are designed 
                        to let you showcase your unique style, whether it’s through a song that speaks to you, an AI-generated design, or a fun emoji.
                    </Typography>
                    <Box mt={2}>
                        <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bigfoot Philosophy" style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                </Box>

                <Box mb={6}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        How It Started
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Bigfoot was founded in the vibrant city of Bengaluru, India, by three cross-disciplinary designers with diverse industry experience. 
                        With backgrounds in design, technology, and user experience, our founders came together with a shared vision to bridge the gap between 
                        fashion and individuality. What began as a simple idea has grown into a brand that seamlessly blends style with personal expression.
                    </Typography>
                    <Box mt={2}>
                        <img src="https://images.unsplash.com/photo-1545128485-c400e7702796?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bigfoot Founders" style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                </Box>

                <Box mb={6}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        A tool for creative expression and exploration
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At Bigfoot, we put you in the designer's seat. Our platform lets you customize your T-shirts and accessories with a wide range of options. 
                        Whether you’re integrating a song that’s meaningful to you, choosing from AI-generated designs, or adding a playful emoji, every product 
                        is made to order and crafted to reflect your personality.
                    </Typography>
                    <Box mt={2}>
                        {/* Placeholder for Image */}
                        <img src="https://images.unsplash.com/photo-1452802447250-470a88ac82bc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bigfoot Customization" style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}