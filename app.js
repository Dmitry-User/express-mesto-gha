const express = require('express');

const mongoose = require('mongoose'); //проверито modules: true

const { PORT = 3000 } = process.env;
const app = express();



app.use(express.json()); // встроенный метод, вместо body-parser


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
// versionKey: false для mongoose отменяет версии 51мин