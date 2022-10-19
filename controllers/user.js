const mongoose = require('mongoose');
const User = require('../models/user');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true }).orFail()
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true }).orFail()
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        res.status(STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
