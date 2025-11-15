const router = require('express').Router();

const tasklistController = require('../controllers/tasklist');
const taskValidation = require("../utilities/taskValidation")

router.get('/', tasklistController.getAll);

router.get('/:id', tasklistController.getSingle);

router.post('/', taskValidation.taskInformation(), taskValidation.taskResult, tasklistController.addTask)

router.put('/:id', taskValidation.taskUpdateInformation(), taskValidation.taskResult, tasklistController.updateTask)

router.delete('/:id', tasklistController.deleteTask)

module.exports = router;