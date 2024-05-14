import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/book/${id}`);
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      {bookDetails ? (
        <>
          <Typography variant="h4">{bookDetails.title}</Typography>
          <Typography variant="body1">Price: ${bookDetails.price}</Typography>
          <Typography variant="body2">Stars: {bookDetails.stars}</Typography>
          <Typography variant="body2">Ratings: {bookDetails.ratings}</Typography>
          <img src={bookDetails.img_url} alt={bookDetails.title} />
          <Typography variant="h6">Reviews:</Typography>
          {bookDetails.reviews.map((review, index) => (
            <div key={index}>
              <Typography variant="body1">{review.author}</Typography>
              <Typography variant="body2">{review.content}</Typography>
            </div>
          ))}
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
};

export default BookDetailsPage;