import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { SentimentSatisfied, SentimentDissatisfied, SentimentVeryDissatisfied } from '@mui/icons-material';

const BookDetailsPage = () => {
    const { item_url } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://mlg382-project2.onrender.com/book?item_url=${item_url}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBookDetails(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching book details');
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [item_url]);

    const renderSentimentIcon = (sentiment) => {
        if (sentiment === 'positive') {
            return <SentimentSatisfied style={{ color: 'green' }} />;
        } else if (sentiment === 'neutral') {
            return <SentimentSatisfied style={{ color: 'yellow' }} />;
        } else if (sentiment === 'negative') {
            return <SentimentVeryDissatisfied style={{ color: 'red' }} />;
        }
        return null;
    };

    const countSentiments = () => {
        let positiveCount = 0;
        let neutralCount = 0;
        let negativeCount = 0;

        if (bookDetails && bookDetails.reviews) {
            bookDetails.reviews.forEach((review) => {
                if (review.sentiment === 'positive') {
                    positiveCount++;
                } else if (review.sentiment === 'neutral') {
                    neutralCount++;
                } else if (review.sentiment === 'negative') {
                    negativeCount++;
                }
            });
        }

        return { positiveCount, neutralCount, negativeCount };
    };

    const { positiveCount, neutralCount, negativeCount } = countSentiments();

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>
                            <Typography variant="h6" gutterBottom>Review Counts:</Typography>
                            <div style={{ display: "flex", gap: '2rem', width: '100%', justifyContent: 'right' }}>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Positive: {positiveCount}</Typography>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Neutral: {neutralCount}</Typography>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Negative: {negativeCount}</Typography>
                            </div>
                        </div>
                    </div>
                    {bookDetails.reviews && bookDetails.reviews.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>Comments:</Typography>
                            {bookDetails.reviews.map((review, index) => (
                                <Card key={index} style={{ marginBottom: '10px', position: 'relative', paddingBottom: '8px' }}>
                                    <CardContent>
                                        <Typography variant="body2" style={{ fontSize: "0.75rem", fontWeight: "bold", marginBottom: '0.5rem', alignSelf: 'right' }}>{review.date}</Typography>
                                        <Typography variant="body2" style={{ fontSize: "1rem" }}>{review.content}</Typography>
                                    </CardContent>
                                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', paddingBottom: '8px' }}>
                                        {renderSentimentIcon(review.sentiment)}
                                    </div>
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