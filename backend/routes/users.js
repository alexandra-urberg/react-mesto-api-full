const router = require('express').Router(); // роутеры
const { celebrate, Joi } = require('celebrate'); // валидация
const {
  getUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users'); // контроллеры пользователя

router.get('/users/me', getCurrentUser); // запрос на получение данных данного пользователя
router.get('/users', getUsers); // запрос на получение данных всех пользователей
router.get('/users/:_id', celebrate({ // запрос на получение данных  пользователя по id
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}),
getUser);
router.patch('/users/me', celebrate({ // запрос на изменение данных данного пользователя (имя и графы 'О себе')
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}),
updateUser);
router.patch('/users/me/avatar', celebrate({ // запрос на изменение аватара данного пользователя
  body: Joi.object().keys({
    // eslint-disable-next-line
    avatar: Joi.string().pattern(new RegExp('^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?')),
  }),
}),
updateAvatar);

module.exports = router;
