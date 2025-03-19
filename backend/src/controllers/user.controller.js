import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const userRegister = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 8);
    // console.log(hashPassword)

    const userData = await UserModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    console.log(userData);

    return res.status(201).json({
      message: "SuccessFully Register",
      userData,
    });
  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({
      message: "Something Went Wrong",
      error: error,
    });
  }
};

/// User Login Part

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Find user with username in databsae

    const user = await UserModel.findOne({ username });
    // console.log(user)
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const isMatch =  bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(200).json({
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign({user : user.username , role : user.role},process.env.SECRET , {expiresIn:"1d"}) //
    console.log(user)
    res.status(200).json({
      message : `${user.username} has logged in Successfully`,
      token: token,
      role: user.role
    })

  } catch (error) {
   console.log(error)
   res.status(500).json({
      message : "Something Went Wrong",
      error
   })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({role : "user"},{password:0});
    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
      error: error,
    });
  }
};

export { userRegister ,userLogin,getUser}; 
