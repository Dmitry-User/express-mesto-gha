const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

const deleteCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка', err });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
