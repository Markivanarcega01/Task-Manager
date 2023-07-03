const Task = require('../models/taskModel')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks =asyncWrapper(async(req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask  =asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task}) 
})

const getTask =asyncWrapper(async (req,res,next) =>{
    const {id:taskID} = req.params
    const find = await Task.findOne({_id:taskID}).exec()
    if(!find){
        return next(createCustomError(`No task with id: ${taskID}`,404))
        // const error = new Error('Not found')
        // error.status = 404
        // return next(error)
        //return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({find})
})

const updateTask  =asyncWrapper( async (req,res)=>{
    const {id:taskID} = req.params
    const update = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true
    })
    if(!update){
        return next(createCustomError(`No task with id: ${taskID}`,404))
        //return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({update})
})

const deleteTask =asyncWrapper( async (req,res) =>{
    const {id:taskID} = req.params
    const deleteTask = await Task.findOneAndDelete({_id:taskID})
    if(!deleteTask){
        return next(createCustomError(`No task with id: ${taskID}`,404))
        //return res.status(404).json({msg: `${taskID} doesn't exist`})
    }
    res.status(200).json(deleteTask)
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

//REST api is only a pattern of api