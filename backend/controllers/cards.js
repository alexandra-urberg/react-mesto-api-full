const Card = require('../models/cards');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => { // выводим все карточки
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => { // создаем карточку
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.deleteCard = (req, res, next) => { // удаляем только свою карточку
  const owner = req.user._id;
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw next(new NotFound('Карточка по заданному id отсутствует'));
    })
    .then((card) => {
      if (String(card.owner) === owner) {
        card.remove();
        res.send({ message: 'Карточка успешно удалена' });
      } else {
        res.status(403).send({ message: 'Чужие карточки не могут быть удалены' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.likeCard = (req, res, next) => { // постановка лайка
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error(
      'NotFound',
    ))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для постановки лайка'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Запрашиваемый адрес не найден'));
      } next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => { // удаляем лайк
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error(
      'NotFound',
    ))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для удаления лайка'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Запрашиваемый адрес не найден'));
      } next(err);
    });
};
