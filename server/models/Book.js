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
  
  ISBN: {
    type: Number,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },

});

const Book = model('Book', bookSchema);
module.exports = Book;
