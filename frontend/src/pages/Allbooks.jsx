import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Context } from '../context/ContextApi';
import { useNavigate } from 'react-router-dom';

const Allbooks = () => {
  const API = "https://library-assignment-s3zd.onrender.com";
  const navigate = useNavigate()
  const { token } = useContext(Context);
  const [listBook, setListBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searcher, setSearcher] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'row'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
    cover: "",
  });

  const genres = [
    { value: "", label: "All" },
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Anime", label: "Anime" },
    { value: "Action", label: "Action" },
    { value: "Drama", label: "Drama" },
    { value: "Adventure", label: "Adventure" },
    { value: "Martial Arts", label: "Martial Arts" },
    { value: "Magic", label: "Magic" },
    { value: "Comedy", label: "Comedy" },
  ];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/books/`);
      setSearcher(response.data.books);
      setListBook(response.data.books);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const searchFilter = (e) => {
    const search = e.target.value;
    filterBooks(search, selectedGenre);
  };

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    filterBooks("", genre);
  };

  const filterBooks = (searchTerm, genre) => {
    let filtered = listBook;

    if (searchTerm) {
      filtered = filtered.filter(
        (elem) =>
          elem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          elem.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          elem.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter((elem) =>
        elem.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    setSearcher(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/books/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setListBook(listBook.filter((e) => e._id !== id));
      setSearcher(searcher.filter((e) => e._id !== id));
      setSelectedBook(null);
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      description: book.description,
      cover: book.cover,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${API}/books/updatebook/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    
      const updatedBooks = listBook.map((book) =>
        book._id === id ? response.data.book : book
      );
      setListBook(updatedBooks);
      setSearcher(updatedBooks);

      // Close the edit modal
      setIsEditModalOpen(false);
      alert("Book updated successfully!");
      setTimeout(()=>{
         navigate("/allbooks")
      })
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update the book.");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className={`container mx-auto px-4 py-8 transition ${selectedBook ? "blur-md" : ""}`}>
        <input
          type="text"
          onChange={searchFilter}
          placeholder="🔍 Search a Book Title, Author or Genre"
          className="w-150 p-3 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'row' : 'grid')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-orange-500 transition cursor-pointer"
          >
            {viewMode === 'grid' ? 'Switch to Row View' : 'Switch to Grid View'}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {genres.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => filterByGenre(value)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                selectedGenre === value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-lg mt-4 text-blue-600 animate-pulse text-center">
            Loading Books...
          </p>
        )}

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5' : 'grid-cols-1'} gap-8 mt-6`}>
          {searcher.length > 0 ? (
            searcher.map((elem) => (
              <div
                key={elem._id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl p-3 transition-shadow duration-300 border cursor-pointer ${
                  viewMode === 'row' ? 'flex flex-row items-center' : ''
                }`}
                onClick={() => setSelectedBook(elem)}
              >
                <img
                  src={elem.cover}
                  alt={elem.title}
                  className={`${viewMode === 'row' ? 'w-1/4 h-40 object-cover' : 'w-full h-65 object-cover mb-4 rounded-lg'}`}
                />
                <div className={`p-4 ${viewMode === 'row' ? 'w-2/3' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {elem.title}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Author:</strong> {elem.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Genre:</strong> {elem.genre}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 text-lg font-semibold">
              No Books Found 📖
            </p>
          )}
        </div>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-8 rounded-lg border-1 border-gray-300 shadow-lg w-12/13 max-w-4xl h-120 flex flex-col sm:flex-row">
            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-full sm:w-2/3 h-80 object-cover rounded-lg"
            />
            <div className="sm:ml-6 flex flex-col justify-between p-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedBook.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p className="text-gray-500">
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
                <p className="text-gray-500">
                  <strong>Year:</strong> {selectedBook.year}
                </p>
                <div className="mt-5">
                  <h3 className="text-red-500 font-bold">Description : </h3>
                  <p className="text-gray-700">{selectedBook.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDelete(selectedBook._id)}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(selectedBook)}
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-8 rounded-lg border-1 border-gray-300 shadow-lg w-12/13 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Book</h2>
            <form onSubmit={(e) => handleEditSubmit(e, selectedBook._id)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, title: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Author</label>
                  <input
                    type="text"
                    value={editFormData.author}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, author: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Genre</label>
                  <input
                    type="text"
                    value={editFormData.genre}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, genre: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Year</label>
                  <input
                    type="text"
                    value={editFormData.year}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, year: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="4"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Cover Image URL</label>
                  <input
                    type="text"
                    value={editFormData.cover}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, cover: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allbooks;