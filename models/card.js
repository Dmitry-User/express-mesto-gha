const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  versionKey: false,
});

module.exports = model('card', cardSchema);
