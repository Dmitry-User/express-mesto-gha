const router = require('express').Router();
const { verifyUserUpdate, verifyAvatar } = require('../middlewares/user-validation');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', verifyUserUpdate, updateUser);
router.patch('/me/avatar', verifyAvatar, updateAvatar);

module.exports = router;
