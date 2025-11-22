const router = require('express').Router();

const userController = require('../controllers/users');
const userValidation = require("../utilities/userValidation");

const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', isAuthenticated, userValidation.userInformation(), userValidation.userResult, userController.addUser)

router.put('/:id', isAuthenticated, userValidation.userUpdateInformation(), userValidation.userResult, userController.updateUser)

router.delete('/:id', isAuthenticated, userController.deleteUser)

module.exports = router;