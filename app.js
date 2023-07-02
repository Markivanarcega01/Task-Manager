const connectDB = require('./db/connect')
require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/tasks') 
const port = 5000

//middleware
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks',tasks)

const start =async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('Server is listening....')
        })
    }catch(error){
        console.log(error)
    }
}
start()
