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
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
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
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя', err });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then(() => {
      res.send({ message: 'Данные пользователя обновлены' });
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', err });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then(() => {
      res.send({ message: 'Аватар пользователя обновлен' });
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара', err });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
