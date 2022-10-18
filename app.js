const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
// const routersCards = require('./routes/cards');
// const routersUser = require('./routes/user');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json()); // встроенный метод, вместо body-parser

// app.use(routersUser);
// app.use(routersCards);

app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: '634d29cbd1e23667ab0c9c23', // временное решение
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
