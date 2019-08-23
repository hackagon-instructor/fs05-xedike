const express = require('express');
const router = express.Router();
const userController = require('./controller');
const { authenticate, authorize } = require('../../../middlewares/auth')
const { uploadImage } = require('../../../middlewares/uploadImage');

// GET    {host}/api/users (PUBLIC)
// GET    {host}/api/users/:id (PUBLIC)
// POST   {host}/api/users (PUBLIC)
// POST   {host}/api/users/login (PUBLIC)
// PUT    {host}/api/users/:id (PRIVATE)
// DELETE {host}/api/users/:id (PRIVATE)

// "/api" + "/users" = "/api/users"

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', authenticate, authorize(['driver', 'passenger']), userController.updateUserById)
router.delete('/:id', authenticate, authorize(['admin']), userController.deleteUserById)
router.post('/login', userController.login)
router.post(
  '/upload-avatar/:id',
  authenticate,
  authorize(['driver', 'passenger']),
  uploadImage('avatar'),
  userController.uploadAvatar
)

module.exports = router;
// export default router