import React, { useEffect, useState } from "react";
import axios from "axios";

const ListBooks = () => {
  const API = "https://library-assignment-s3zd.onrender.com";
  const [listBook, setListBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searcher, setSearcher] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

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
    const searchFilter = listBook.filter((elem) =>
      elem.title.toLowerCase().includes(search.toLowerCase()) ||
      elem.author.toLowerCase().includes(search.toLowerCase()) ||
      elem.genre.toLowerCase().includes(search.toLowerCase()) 

    );
    setSearcher(searchFilter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📚 Book Collection
      </h2>
      <input
        type="text"
        onChange={searchFilter}
        placeholder="🔍 Search  a Book Title  or Authot or Genre"
        className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading && (
        <p className="text-lg mt-15 text-blue-600 animate-pulse text-center">
          Loading Books...
        </p>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
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

      
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full relative">
          
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-3xl font-bold"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button>

          
            <div className="flex flex-col md:flex-row items-center">
            
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-60 h-80 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
              />

              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedBook.title}
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p className="text-md text-gray-600 mt-1">
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  {selectedBook.description}
                </p>

               
               

              
                <button
                  onClick={() => setSelectedBook(null)}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBooks;
