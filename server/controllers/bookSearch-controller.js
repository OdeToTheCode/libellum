const express = require('express')
const router = express.Router()
const axios = require('axios');

const app = express();


module.exports = {
  // Route to search for books
  async searchBooks(req, res) {
    const { q } = req.query;

    try {
      // Make a request to the Google Books API to search for books
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },
}
