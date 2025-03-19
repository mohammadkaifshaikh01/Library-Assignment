import express from "express"
import {addBook ,getBooks , getBookById, updateBook, deleteBook  } from "../controllers/book.controller.js"
import isAdmin from "../middleware/isAdmin.js"
import { upload } from "../middleware/multer.middleware.js"


const bookRoute = express.Router()

bookRoute.post("/add-book", isAdmin ,upload.single("cover") , addBook)
bookRoute.get("/" ,getBooks)
bookRoute.get("/:id" , getBookById)
bookRoute.patch("/updatebook/:id" , isAdmin , updateBook  )
bookRoute.delete("/delete/:id"  , isAdmin , deleteBook)





export default bookRoute