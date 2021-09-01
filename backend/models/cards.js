const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Description must be at least 2 characters.'],
    maxlength: [30, 'Description must be less than 20 characters.'],
    required: [true, 'Your description cannot be blank.'],
  },
  link: {
    type: String,
    required: [true, 'Space for link cannot be blank.'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'You are using invalid symbols!',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
