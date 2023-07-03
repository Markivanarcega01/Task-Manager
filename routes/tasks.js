const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask} = require('../controller/tasksController')

// /api/v1/tasks
router.route('/').get(getAllTasks)
router.route('/').post(createTask)
router.route('/:id').get(getTask)
router.route('/:id').patch(updateTask)
router.route('/:id').delete(deleteTask)
module.exports = router
