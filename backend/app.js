require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
//const cors = require('./middlewares/cors');
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const cardRoutes = require('./routes/cardRouter');
const { login, createUser } = require('./controllers/users');
const handleError = require('./middlewares/error');
const NotFoundError = require('./utils/notFoundError');
const { loginUserValidator, createUserValidator } = require('./middlewares/joiUserValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to db');
  });

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginUserValidator, login);
app.post('/signup', createUserValidator, createUser);
app.use(userRoutes);
app.use(cardRoutes);
app.use((req, res, next) => next(new NotFoundError('Ничего не найдено.')));
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port ${PORT}`);
});
