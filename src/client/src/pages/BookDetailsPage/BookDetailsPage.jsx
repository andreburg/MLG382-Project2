import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Card, CardContent, CardMedia, Divider } from '@mui/material';

const BookDetailsPage = () => {
    const { item_url } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book?item_url=${item_url}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBookDetails(data);
                console.log(item_url)
                console.log(data)
                setLoading(false);
            } catch (error) {
                setError('Error fetching book details');
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [item_url]);

    return (
        <div style={{ padding: '20px', margin: '2rem 10rem' }}>
            {loading && <CircularProgress />}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {bookDetails && (
                <>
                    <Typography variant="h4" gutterBottom>{bookDetails.title}</Typography>
                    <Typography variant="h6" gutterBottom>{bookDetails.author}</Typography>
                    <Card style={{ display: 'flex', marginBottom: '20px' }}>
                        <CardMedia
                            component="img"
                            image={bookDetails.img_url}
                            alt={bookDetails.title}
                            style={{ width: '200px', objectFit: 'cover' }}
                        />
                        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>Stars: {bookDetails.stars}</Typography>
                            <Typography variant="body2" style={{ fontWeight: 'bold', marginTop: '8px' }}>Ratings: {bookDetails.ratings}</Typography>
                            {bookDetails.description && (
                                <>
                                    <Typography variant="h6" gutterBottom>Description:</Typography>
                                    <Typography variant="body1">{bookDetails.description}</Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                    {bookDetails.reviews && bookDetails.reviews.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>Comments:</Typography>
                            {bookDetails.reviews.map((review, index) => (
                                <Card key={index} style={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography variant="body2" style={{ fontSize: "0.75rem", fontWeight: "bold", marginBottom: '0.5rem', alignSelf: 'right' }}>{review.date}</Typography>
                                        <Typography variant="body2" style={{ fontSize: "1rem" }}>{review.content}</Typography>
                                    </CardContent>
                                    {index < bookDetails.reviews.length - 1 && <Divider />}
                                </Card>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default BookDetailsPage;
