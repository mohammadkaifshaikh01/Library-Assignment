import express from "express"
import { getUser, userLogin, userRegister } from "../controllers/user.controller.js"
import  isAdmin  from "../middleware/isAdmin.js"


const userRoute = express.Router()

userRoute.post("/register" ,userRegister)
userRoute.post("/login" ,userLogin )
userRoute.get("/getuser" , isAdmin , getUser)





export default userRoute