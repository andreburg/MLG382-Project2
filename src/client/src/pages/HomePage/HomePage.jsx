import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = ({ books }) => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                {books.map((book, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Link to={`/book/${index}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box sx={{ overflow: 'hidden', justifyContent: 'center', display: 'flex', alignItems: 'centre', padding: '1rem 2rem' }}>
                                    <img
                                        src={book.img_url}
                                        alt={book.title}
                                        style={{
                                            top: 0,
                                            left: 0,
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: "0.25rem"
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" noWrap>{book.title}</Typography>
                                    <Typography variant="body1">Price: ${book.price}</Typography>
                                    <Typography variant="body2">Stars: {book.stars}</Typography>
                                    <Typography variant="body2">Ratings: {book.ratings}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
