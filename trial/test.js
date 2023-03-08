const express = require('express');
const axios = require('axios');

const app = express();

// Route to search for books
app.get('/search', async (req, res) => {
  const { q } = req.query; // Get the query parameter from the request

  try {
    // Make a request to the Google Books API to search for books
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q,
      },
    });

    res.json(response.data); // Return the response data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to get details of a book
app.get('/books/:id', async (req, res) => {
  const { id } = req.params; // Get the book ID from the request

  try {
    // Make a request to the Google Books API to get details of the book
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);

    res.json(response.data); // Return the response data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
