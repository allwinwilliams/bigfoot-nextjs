import { Container, Box, Typography, Link, Card, CardContent, CardActionArea, Icon } from "@mui/material";
import Header from "@/components/UIComponents/Header";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Tree() {
    return (
        <Container sx={{ mt: 2 }}>
            <Header />
            <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
                <Typography variant="h5" style={{ padding: '16px'}} gutterBottom>Welcome buddy</Typography>
                <Card sx={{ mb: 2 }}>
                    <CardActionArea component={Link} href="/" underline="none">
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ShoppingCartIcon sx={{ mr: 2 }} />
                            <Typography variant="h6">Let's explore the shop?</Typography>
                        </Box>
                        <ChevronRightIcon />
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Typography type="body1" sx={{ py: 4 }}>or check out</Typography>
                <Card sx={{ mb: 2 }}>
                    <CardActionArea component={Link} href="https://open.spotify.com/" underline="none" target="_blank">
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <MusicNoteIcon sx={{ mr: 2 }} />
                            <Typography variant="h6">Spotify Playlist</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ mb: 2 }}>
                    <CardActionArea component={Link} href="https://www.youtube.com/watch?v=your_video_id" underline="none" target="_blank">
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <YouTubeIcon sx={{ mr: 2 }} />
                            <Typography variant="h6">YouTube Video</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container>
    );
}
