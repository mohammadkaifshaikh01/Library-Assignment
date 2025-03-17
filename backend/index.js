import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/connectDB.js"
import userRoute from "./src/routes/user.routes.js"
import bookRoute from "./src/routes/book.routes.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use("/user" , userRoute)
app.use("/books" , bookRoute)
const PORT = process.env.PORT || 5000



app.listen(PORT ,async()=>{
   await connectDB()
   console.log(`Server Is Runnig On Port : ${PORT}`)
})