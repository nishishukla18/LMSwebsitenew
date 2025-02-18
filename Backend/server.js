import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkWebhooks } from './controller/webhooks.js'

//initialize express
const app = express()
await connectDB()
//middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/',(req,res)=>res.send("PI working"))
app.post('/clerk',express.json(),clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})