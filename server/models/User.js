const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },
  
  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  zip_code: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  }
});

const User = model('User', userSchema);
module.exports = User;
