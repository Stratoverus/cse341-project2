const router = require('express').Router();

const tasklistController = require('../controllers/tasklist');
const taskValidation = require("../utilities/taskValidation");

const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', tasklistController.getAll);

router.get('/:id', tasklistController.getSingle);

router.post('/', isAuthenticated, taskValidation.taskInformation(), taskValidation.taskResult, tasklistController.addTask)

router.put('/:id', isAuthenticated, taskValidation.taskUpdateInformation(), taskValidation.taskResult, tasklistController.updateTask)

router.delete('/:id', isAuthenticated, tasklistController.deleteTask)

module.exports = router;