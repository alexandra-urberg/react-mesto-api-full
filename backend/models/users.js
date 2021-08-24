const mongoose = require('mongoose');
const { isURL, isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Username must be at least 2 characters.'],
    maxlength: [30, 'Username must be less than 20 characters.'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Username must be at least 2 characters.'],
    maxlength: [30, 'Username must be less than 20 characters.'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат адресса фотографии',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Your username cannot be blank.'],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters.'],
    required: [true, 'Your password cannot be blank.'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
