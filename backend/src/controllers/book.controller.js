import BookModel from "../models/book.model.js";
import uploadOnCloudinary from "../utils/Cloudnary.js";


const addBook = async (req, res) => {
  const {user} = req.user
  console.log(user)
  console.log(req.body)
  try {
    const { title, author, genre, description, year , cover } = req.body;
    console.log("ttt" , title, author, genre, year, description, cover);

    if (!title || !author || !genre || !year || !description) {
      return res.status(400).json({ message: "Please Fill All Fields" });
    }
    
    const filePath = req.file?.path;

		if (!filePath) {
			return res.status(501).json({
				message: "File is required",
				success: false
			})
		}
    console.log("filepath",filePath)

		const cloudinaryURL = await uploadOnCloudinary(filePath)

		if (!cloudinaryURL?.url) {
			return res.status(501).json({
				message: "getting error while uploading",
				success: false
			})
		}
    const newBook = await BookModel.create({
      title,
      author,
      genre,
      year,
      description,
      cover: cloudinaryURL?.url,
    });
    console.log(newBook);

    return res.status(201).json({
      message: "Book Added SuccessFully",
      newBook,
    });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    console.log(books)
   return res.status(200).json({
      books
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can Not Fetch Data Please Try Again",
    });
  }
};

const getBookById = async (req, res) => {
   const id = req.params.id
  try {
    const book = await BookModel.findById(id);
   return res.status(200).json({
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can Not Fetch Data Please Try Again",
    });
  }
};

export { addBook ,getBooks , getBookById};
