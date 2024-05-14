import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import NavBar from './components/NavBar/NavBar';
const App = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/books', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async res => {
      let data = await res.json()
      setBooks(data)
    })
  }, [])

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage books={books} />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;