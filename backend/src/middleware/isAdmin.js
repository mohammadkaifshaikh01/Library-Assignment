import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const isAdmin = async (req, res, next) => {
   const tokenData = req.header("Authorization");
   if (!tokenData) {
      return res.status(401).json({
         message: "Access Denied Please Login..",
      });
   }

   try {
      const token = tokenData.replace("Bearer", "").trim()
      const decoded = jwt.verify(token, process.env.SECRET)
      console.log(decoded)
      if (decoded.role != "admin") {
         return res.status(403).json({
            message: "only admin can add the book"

         })

      }
      req.user = decoded

      next()
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: "Something Went Wrong...",
      });
   }
};

export default isAdmin