import React, { useEffect, useState } from "react";
import axios from "axios";

const ListBooks = () => {
  const API = "https://library-assignment-s3zd.onrender.com";
  const [listBook, setListBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searcher, setSearcher] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

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

  return (
    <div className="relative min-h-screen">
      {/* Main Content with Blur Effect */}
      <div
        className={`container mx-auto px-4 py-8 transition ${
          selectedBook ? "blur-md" : ""
        }`}
      >
        <input
          type="text"
          onChange={searchFilter}
          placeholder="🔍 Search a Book Title, Author or Genre"
          className="w-150 p-3 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {searcher.length > 0 ? (
            searcher.map((elem) => (
              <div
                key={elem._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border cursor-pointer"
                onClick={() => setSelectedBook(elem)}
              >
                <div className="p-4">
                  <img
                    src={elem.cover}
                    alt={elem.title}
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                  />
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

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-xs">
          <div className="bg-white p-8 rounded-lg    border-1 border-gray-300 shadow-lg w-12/13 max-w-4xl h-120 flex flex-col sm:flex-row">
            {/* Book Image */}
            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-full sm:w-2/3 h-80 object-cover rounded-lg "
            />

            {/* Book Details */}
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
                  <p className=" text-gray-700">{selectedBook.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBooks;
