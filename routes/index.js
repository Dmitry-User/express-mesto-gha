const router = require('express').Router();
const userRouter = require('./user');
const cardsRouter = require('./cards');
const { STATUS_NOT_FOUND } = require('../utils/constants');

router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Запрашиваемый адрес не найден' });
});

module.exports = router;
