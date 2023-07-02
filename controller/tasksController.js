const Task = require('../models/taskModel')
const getAllTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const createTask  =async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(error){
        res.status(500).json(error.errors.name.message)
    }
    
}

const getTask =async (req,res) =>{
    try{
        const {id:taskID} = req.params
        const find = await Task.findOne({_id:taskID}).exec()
        if(!find){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({find})
    }catch(error){
        res.status(500).json(error)
    }
}

const updateTask  = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const update = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!update){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({update})
    }catch(error){
        res.status(500).json(error.errors.name.message)
    }
}

const deleteTask = async (req,res) =>{
    try{
        const {id:taskID} = req.params
        const deleteTask = await Task.findOneAndDelete({_id:taskID})
        if(!deleteTask){
            return res.status(404).json({msg: `${taskID} doesn't exist`})
        }
        res.status(200).json(deleteTask)
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

//REST api is only a pattern of api