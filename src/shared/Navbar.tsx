import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <Container>
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/">
            <img className="w-24" src="/logo.webp" alt="Logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-gray-600 text-base" to="/">
              Home
            </Link>
            <Link className="text-gray-600 text-base" to="/products">
              Products
            </Link>
            <Link className="text-gray-600 text-base" to="/category">
              Category
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <svg
              className="cursor-pointer"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <img
              className="w-6 h-6 object-contain cursor-pointer"
              src="/profile_icon.png"
              alt="Profile"
            />

            {/* Hamburger */}
            <button onClick={() => setIsOpen(true)} className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </Container>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-[18px] border-b border-gray-300">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 text-sm"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 text-sm"
          >
            Products
          </Link>
          <Link
            to="/category"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 text-sm"
          >
            Category
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 bg-opacity-40 z-40"
        />
      )}
    </div>
  );
};

export default Navbar;
