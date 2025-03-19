import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-600 rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Side Content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Discover & Borrow <br />
          Books from Our Library
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <p>
            Browse through thousands of books, explore new genres, and borrow
            easily.
            <br className="hidden sm:block" />
            Your gateway to knowledge starts here.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-700 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Explore Library{" "}
          <img
            className="w-3"
            src="https://cdn-icons-png.flaticon.com/512/1828/1828925.png"
            alt="Arrow Icon"
          />
        </Link>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/3 relative">
        <img
          className="w-full md:absolute bottom-0 h-120 rounded-lg"
          src="https://png.pngtree.com/png-vector/20231020/ourmid/pngtree-watercolor-library-book-clip-art-png-image_10285452.png"
          alt="Library Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
