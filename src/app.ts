import express from "express";
import dotenv from "dotenv"
import logger from 'morgan'
import cookieParser  from "cookie-parser";
import userRoutes from "./routes/userRoutes"
import bookRoutes from "./routes/bookRoutes"
import {connectDatabase} from './config/database'
const app=express()

connectDatabase()
app.use(express.json())

app.use(express.urlencoded({extended:false}))
app.use(logger('start'))
app.use(cookieParser())
app.use('/user',userRoutes)
app.use('/book', bookRoutes)

dotenv.config()


app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Server is listening on ${process.env.PORT || 4000}`);
    
})



export default app

//0pxPKuU83zYizLCx