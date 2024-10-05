"use client";

import { Container, Box, Typography, Paper, Grid, Button, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";
import ProductStaticContent from '@/components/ProductStaticContent'
import CreateIcon from '@mui/icons-material/Create';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrintIcon from '@mui/icons-material/Print';

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
                        <video 
                            src="/gallery/motto.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            style={{ width: '100%', borderRadius: '8px' }} 
                        />
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

            <ProductStaticContent/>
            {/* <HorizontalScrollSection /> */}
            
            <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 8, mt: 24 }}>
                <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16,
                    zIndex: 0,
                }}
                >
                
                <source src="https://videos.pexels.com/video-files/4669695/4669695-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <Paper elevation={4} sx={{
                padding: {md: 10, xs: 4},
                borderRadius: 4,
                mt: 4,
                boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 0,
                }}>
                <Grid container spacing={4} alignItems="righ" style={{zIndex: 999}}>
                    <Grid item xs={12} md={6} sx={{zIndex: 1000}}>
                    <img
                        src="/landing-page/song-banner.png"
                        alt="Custom T-shirt"
                        style={{ 
                        width: '550px',
                        borderRadius: '16px',
                        // position: 'absolute',
                        bottom: '-60px', left: '-40px'  
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}
                    sx={{padding: 4}}>
                    <Typography
                        variant="h4"
                        sx={{
                        fontWeight: 'bold',
                        my: 2,
                        }}
                    >
                        Customise with Music.< br/>
                        Choose from millions.
                    </Typography>
                    <Typography variant="subtitle2"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                        Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
                    </Typography>
                    
                    <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    href="/product/song-tshirt" 
                    startIcon={<CreateIcon />}
                    sx={{ 
                        mt: 4, 
                        padding: 2, 
                        fontWeight: 'bold', 
                        fontFamily: 'Inter', 
                        textTransform: 'none',
                        background: 'linear-gradient(45deg, #AD26FF 20%, #FF26CF 80%)',
                        backgroundSize: '400% 400%',
                        animation: 'backgroundMovement 4s ease infinite',  
                        borderRadius: 4,
                        width: '100%'
                    }} 
                    >
                    Craft with Music
                    </Button>
                    </Grid>
                </Grid>
                </Paper>        
            </Box>    

            <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 8, marginTop: 8 }}>
                <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16,
                    zIndex: 0,
                }}
                >
                <source src="https://videos.pexels.com/video-files/18069235/18069235-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <Paper elevation={4} sx={{
                padding: {md: 8, xs: 4},
                paddingBottom: 1,
                borderRadius: 4,
                mt: 4,
                boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
                // color: 'white',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                zIndex: 1,
                }}>
                <Grid container spacing={4} alignItems="center" style={{zIndex: 999}}>
                    <Grid item xs={12} md={6}
                    sx={{paddingX: 4}}>
                    <Typography
                        variant="h4"
                        sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        }}
                    >
                        Draw with a prompt.<br/>
                        Be imaginative.
                    </Typography>
                    <Typography variant="subtitle2"
                    sx={{
                        color: 'rgba(0, 0, 0, 0.8)'
                    }}>
                        Imagine anything. Make it alive with a simple prompt.
                    </Typography>
                    
                    <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    href="/product/prompt-generated-tshirt" 
                    startIcon={<CreateIcon />}
                    sx={{ 
                        mt: 4, 
                        padding: 2, 
                        fontWeight: 'bold', 
                        fontFamily: 'Inter', 
                        textTransform: 'none',
                        borderRadius: 4,
                        width: '100%'
                    }} 
                    >
                    Start Imagining
                    </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <img
                        src="/landing-page/ai-banner.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', borderRadius: '16px' }}
                    />
                    </Grid>
                </Grid>
                </Paper>
            </Box>  
                <Paper elevation={1} sx={{ padding: 4, borderRadius: 4, mt: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                    <img
                        src="/landing-page/song-banner.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', borderRadius: '16px' }}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        }}
                    >
                        You design.
                        We develop.<br/>
                        Take control of the design.<br/>
                    </Typography>
                    <Typography variant="subtitle2"
                    sx={{
                        color: 'rgba(0, 0, 0, 0.8)'
                    }}>
                        Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, or any design that represents the music you love.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        href="#the-range" 
                        startIcon={<CreateIcon />}
                        sx={{ 
                        mt: 4, 
                        padding: 2, 
                        fontWeight: 'bold', 
                        fontFamily: 'Inter', 
                        textTransform: 'none',
                        background: 'linear-gradient(45deg, #fd1f4f 20%, #FF8E53 80%)',
                        backgroundSize: '400% 400%',
                        animation: 'backgroundMovement 4s ease infinite',  
                        borderRadius: 4,
                        width: '100%'
                        }} 
                    >
                        Craft Your Own Tshirt
                    </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Container>
    );
}