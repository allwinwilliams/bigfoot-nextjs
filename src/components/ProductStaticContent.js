import { Box, Typography, Grid} from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BrushIcon from '@mui/icons-material/Brush';
import { rotate } from 'three/examples/jsm/nodes/Nodes';

export default function ProductStaticContent() {
    return(
        <Box>
            <Box
                marginTop={8}
                sx={{
                borderRadius: '16px',
                // backgroundColor: '#fff',
                padding: 3,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ position: 'relative', display: 'flex', marginTop: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src="/landing-page/philosophy.png"
                        alt="Our philosophy"
                        style={{ width: '70%', borderRadius: '16px', zIndex: 1 }}
                    />
                    <Box sx={{ position: 'absolute', top: '0%', right: '10%', width: '35%', borderRadius: '8px', overflow: 'hidden', zIndex: 0 }}>
                        <video
                        autoPlay
                        loop
                        muted
                        style={{
                            width: '90%',
                            height: '40%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                        >
                        <source src="https://videos.pexels.com/video-files/18069473/18069473-uhd_1440_2560_24fps.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            color: '#BBBBBB'
                        }}
                        >
                        Our Philosophy
                        </Typography>
                        <Typography variant="h4" sx={{textTransform: 'none'}}>
                            Human are naturally creative and expressive.
                            We encourage it with fashion and lifestyle options.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                marginTop={8}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#EAEAEA',
                padding: 3,
                textAlign: 'center',
                }}
            >
                <Typography variant="h3" 
                sx={{
                    fontWeight: 'bold',
                    mt: 4,
                    color: '#BBBBBB'
                }}>
                What we offer?
                </Typography>
                <Typography variant="body1"
                sx={{
                    my: 2,
                    paddingBottom: 2,
                }}>
                    Premium personlisation driven with tech
                </Typography>
                <Grid container spacing={4} sx={{padding: {md: 8, xs: 0}, paddingBottom: {md: 8, xs: 8}}}>
                <Grid item xs={6} md={3}>
                    {/* <LocalShippingIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                    <img
                        src="/landing-page/shipping.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Free Shipping
                    </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    {/* <BuildIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                    <img
                        src="/landing-page/cube.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Made to Order
                    </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    {/* <CheckCircleIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                    <img
                        src="/landing-page/check.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Premium Quality Fabric
                    </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    {/* <BrushIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                    <img
                        src="/landing-page/paint.png"
                        alt="Craft you own"
                        style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Customised Designs
                    </Typography>
                </Grid>
                </Grid>
            </Box>

            <Box
                marginTop={8}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                padding: 4,
                textAlign: 'center',
                }}
            >
                <Typography variant="h3" 
                sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    color: '#BBBBBB'
                }}>
                    Softest fabric
                </Typography>
                <Typography variant="subtitle1" 
                sx={{
                    color: '#BBBBBB',
                    my: 2
                }}>
                    We are sure you'll agree too
                </Typography>
                <img
                        src="/landing-page/fabric.png"
                        alt="Custom T-shirt"
                        style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                    />
                <Grid container spacing={4} sx={{padding: {md: 8, xs: 0}, paddingBottom: {md: 8, xs: 8}}}>
                    <Grid item xs={4} md={2}>
                        {/* <LocalShippingIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Custom T-shirt"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            Soft Touch Knitting
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {/* <BuildIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Custom T-shirt"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            100% Cotton
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {/* <CheckCircleIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Custom T-shirt"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            Oversized Fit
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {/* <BrushIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Craft you own"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            200GSM thickness
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {/* <BrushIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Craft you own"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            Bio-Washed
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {/* <BrushIcon sx={{ fontSize: 50, mb: 2 }} /> */}
                        {/* <img
                            src="/landing-page/paint.png"
                            alt="Craft you own"
                            style={{ width: '100%', paddingX: 4, borderRadius: '16px' }}
                        /> */}
                        <Typography variant="body1">
                            Eco-Friendly Dye
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                marginTop={4}
                sx={{
                borderRadius: '16px',
                backgroundColor: '#FAFAFA',
                padding: 3,
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        paddingY: 4,
                    }}
                >
                    
                    <Typography variant="h4" sx={{  }}>
                        What bigfoot offers that others don't?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    
                        <img
                            src="https://cdn.pixabay.com/animation/2022/11/03/14/36/14-36-22-714_512.gif"
                            alt="Can I understand the design? Yes, it's all based on data"
                            style={{ 
                            width: '100%', 
                            maxWidth: '200px', 
                            height: 'auto', 
                            borderRadius: '8px', 
                            marginTop: '16px' 
                            }}
                        />
                    </Box>
                    <Typography variant="h6" sx={{marginTop: 4}}>
                        We want you to have control over the designs you wear. <br/>
                        We cheer for you to express yourself.<br/>
                    </Typography>
                    <Typography variant="h6" sx={{marginTop: 4, color: '#999999'}}>
                        <br/>
                        We are trying to give control to all of you in their designs through different means.<br />
                        Join us in taking back control of our designs.
                        <br/>
                        <br/>
                        Contact us at crew@bigfoot.land for feedback, queries, bulk orders or just coffee, .
                    </Typography>
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
                <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 4, mb: 1, color: 'rgba(255,255,255,0.6)' }}>
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
                            padding: 5,
                            }}
                        >
                            <img
                                src="/song-tshirt/fabric.png"
                                alt="Soft Touch Knitting"
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                            <Typography variant="h5" sx={{ my: 2 }}>
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
                            padding: 5,
                            }}
                        >
                            <img
                                src="/song-tshirt/dtg.png"
                                alt="Direct To Garment"
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                            <Typography variant="h5" sx={{ my: 2 }}>
                                High Quality Customised Printing
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