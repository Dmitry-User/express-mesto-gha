const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const { statusCode = STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = handleError;
