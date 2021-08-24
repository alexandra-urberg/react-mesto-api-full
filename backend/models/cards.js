const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Username must be at least 2 characters.'],
    maxlength: [30, 'Username must be less than 20 characters.'],
    required: [true, 'Your username cannot be blank.'],
  },
  link: {
    type: String,
    required: [true, 'Your username cannot be blank.'],
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Your username cannot be blank.'],
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
