import axios from "axios";

import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../context/ContextApi";


const AddBook = () => {
  const {token } = useContext(Context);
  const API = "https://library-assignment-s3zd.onrender.com";
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState(0);
  const [cover, setCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  


    if (!title || !author || !description || !genre || !year || !cover) {
      toast.error("Please Fill All Fields");
      return;
    }
  
    // Use FormData to send files
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("year", year);
    formData.append("cover", cover); 
  
    try {
      const response = await axios.post(`${API}/books/add-book`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response);
      toast.success("Book Added Successfully");
  
      // Reset the form
      setTitle("");
      setAuthor("");
      setDescription("");
      setGenre("");
      setYear("");
      setCover(null);
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Something Went Wrong");
    }
  };
  

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Add a New Book
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Author"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="number"
              placeholder="Year"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <input
              type="text"
              placeholder="Genre"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
             <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCover(e.target.files[0])}
              accept="image/*"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AddBook;
