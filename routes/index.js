const router = require('express').Router();
const userRouter = require('./user');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/queryValidation');
const { login, createUser } = require('../controllers/user');
const { STATUS_NOT_FOUND } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Запрашиваемый адрес не найден' });
});

module.exports = router;
