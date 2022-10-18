const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res.status(404).send({ message: 'Пользователь с указанным userId не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'НЕ корректный userId', err });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
