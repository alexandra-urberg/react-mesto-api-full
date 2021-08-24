const { celebrate, Joi } = require('celebrate'); // валидация
const router = require('express').Router(); // роутеры
const validator = require('validator');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards'); // контроллеры карточки.

const method = (value) => {
  const result = validator.isURL(value);

  if (result) {
    return value;
  } throw new Error('URL validation err');
};

router.get('/cards', getCards); // запрос на получение всех карточек
router.post('/cards', celebrate({ // запрос на создае карточки
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // eslint-disable-next-line
    link: Joi.string().custom(method),
  }),
}),
createCard);
router.delete('/cards/:cardId', celebrate({ // запрос на удаление карточки пользователя
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
deleteCard);
router.put('/cards/:cardId/likes', celebrate({ // запрос на постановку карточке лайка
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
likeCard);
router.delete('/cards/:cardId/likes', celebrate({ // запрос на удаление лайк у карточки
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
dislikeCard);

module.exports = router;
