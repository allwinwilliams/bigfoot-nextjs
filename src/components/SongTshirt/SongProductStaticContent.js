import { Box, Typography, Grid} from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BrushIcon from '@mui/icons-material/Brush';

export default function SongProductStaticContent() {
    return(
        <Box>
            <Box
                marginTop={8}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#fff',
                padding: 3,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img
                        src="/song-tshirt/customised-banner.png"
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
                        Customise your T-shirt with your favorite song
                        </Typography>
                        <Typography variant="subtitle1">
                        Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            
            <Box
                marginTop={8}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#fafafa',
                padding: 3,
                textAlign: 'center',
                }}
            >
                <Typography variant="h5" 
                sx={{
                    fontWeight: 'bold',
                    mb: 4,
                }}>
                What we offer?
                </Typography>
                <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <LocalShippingIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Free Shipping All Over India
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <BuildIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Made to Order
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <CheckCircleIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Premium Quality Fabric
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <BrushIcon sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Customised Designs
                    </Typography>
                </Grid>
                </Grid>
            </Box>
            <Box
                marginTop={4}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#f3f3f3',
                padding: 3,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src="/song-tshirt/understand.png"
                    alt="Can I understand the design? Yes, it's all based on data"
                    style={{ 
                    width: '100%', 
                    maxWidth: '800px', 
                    height: 'auto', 
                    borderRadius: '8px', 
                    marginTop: '16px' 
                    }}
                />
                </Box>
            </Box>
            
            <Box
                marginTop={4}
                sx={{
                boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
                borderRadius: '16px',
                padding: 3,
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(144deg, #00ded2, #7f00ef, #d6007d)',
                backgroundSize: '300% 300%',
                animation: 'backgroundMovement 4s ease infinite',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Why BigFoot?
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                Well there are so many reasons but here are a few
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src="/song-tshirt/compare.png"
                    alt="Example"
                    style={{
                    width: '100%',
                    maxWidth: '800px',
                    height: 'auto',
                    borderRadius: '8px',
                    marginTop: '16px'
                    }}
                />
                </Box>
                <style jsx global>{`
                @-webkit-keyframes backgroundMovement {
                    0% {
                    background-position: 48% 0%;
                    }
                    50% {
                    background-position: 53% 100%;
                    }
                    100% {
                    background-position: 48% 0%;
                    }
                }

                @-moz-keyframes backgroundMovement {
                    0% {
                    background-position: 48% 0%;
                    }
                    50% {
                    background-position: 53% 100%;
                    }
                    100% {
                    background-position: 48% 0%;
                    }
                }

                @keyframes backgroundMovement {
                    0% {
                    background-position: 48% 0%;
                    }
                    50% {
                    background-position: 53% 100%;
                    }
                    100% {
                    background-position: 48% 0%;
                    }
                }
                `}</style>
                
            </Box>
            <Box
                marginTop={4}
                sx={{
                borderRadius: '16px',
                paddingY: 3,
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                            backgroundColor: '#eaeaea',
                            borderRadius: '16px',
                            padding: 3,
                            }}
                        >
                            <img
                                src="/song-tshirt/fabric.png"
                                alt="Soft Touch Knitting"
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                            <Typography variant="h4" sx={{ fontWeight: '800', mt: 2, mb: 2 }}>
                                Soft Touch Knitted Cotton
                            </Typography>
                            <Typography variant="body1">
                                With new and innovative soft touch knitting technique the fabric is truly a kind of its own. You should wear it to feel it.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                            backgroundColor: '#eaeaea',
                            borderRadius: '16px',
                            padding: 3,
                            }}
                        >
                            <img
                                src="/song-tshirt/dtg.png"
                                alt="Direct To Garment"
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                            <Typography variant="h4" sx={{ fontWeight: '800', mt: 2, mb: 2 }}>
                                Truly Customised Prints
                            </Typography>
                            <Typography variant="body1">
                                Using Direct To Garment (DTG) printing technique, we ensure highest quality print for each of your order.
                            </Typography>
                        </Box>
                    </Grid>
                    
                </Grid>
            </Box>
        </Box>
    );
}