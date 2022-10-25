const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line no-useless-escape
const REGEX = /^https?:\/\/([wW]{3})?(\w*)([\w\-\.\_~:\/?#\[\]@!$&'\()*\+,;=])*/;

const verifyCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEX),
  }),
});

const verifyCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  verifyCard,
  verifyCardId,
};
