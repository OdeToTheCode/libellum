const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  
  ID: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

});

const Book = model('Book', bookSchema);
module.exports = Book;
