const router = require('express').Router();

const userController = require('../controllers/users');
const userValidation = require("../utilities/userValidation")

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userValidation.userInformation(), userValidation.userResult, userController.addUser)

router.put('/:id', userValidation.userUpdateInformation(), userValidation.userResult, userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;