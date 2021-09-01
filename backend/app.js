require('dotenv').config(); // для секретного ключа
const express = require('express');
const cookieParser = require('cookie-parser'); // для кукис
const rateLimit = require('express-rate-limit'); // защиты от DDoS-атак
const mongoose = require('mongoose');
const helmet = require('helmet'); // помогает защитить экспресс-приложения, устанавливая различные HTTP заголовки
const { celebrate, Joi, errors } = require('celebrate'); // валидация роутинга
const { createUser, login } = require('./controllers/users');
const method = require('./routes/cards'); // метод валидации ссылок на фотограии созданный в routes/cards
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors'); // для вывовода ошибок
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(cookieParser());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(requestLogger);

// app.get('/crash-test', () => { // удалить после прохождения ревью (crash-test)
// setTimeout(() => {
// throw new Error('Сервер сейчас упадёт');
// }, 0);
// });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line
    avatar: Joi.string().custom(method),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
login);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес не найден'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
