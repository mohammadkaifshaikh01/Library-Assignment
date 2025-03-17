import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
   title : {type : String , required : true},
   author : {type : String , required : true , default : "Anonymous"},
   genre : {type : String , required : true},
   year : {type : Number , required : true},
   description : {type : String , required : true},
   cover : {type : String , required : true}
   
})

const BookModel = mongoose.model("book" , bookSchema)
export default BookModel