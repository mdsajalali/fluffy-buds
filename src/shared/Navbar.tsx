import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { Menu, X, LogOut, User, ShoppingBag } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-b border-gray-300 md:fixed md:w-full md:top-0 md:bg-white md:z-50">
      <Container>
        <div className="flex items-center justify-between py-3">
          <Link to="/">
            <img className="w-24" src="/logo.webp" alt="Logo" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                className="text-gray-600 text-base"
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Icon */}
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

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setShowDropdown((prev) => !prev)}
                className="md:w-7 w-6 md:h-7 h-6 object-contain cursor-pointer"
                src="/profile_icon.png"
                alt="Profile"
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 overflow-hidden rounded-lg shadow-lg z-50 text-sm">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <hr className="text-gray-300" />
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <ShoppingBag size={16} /> Orders
                  </Link>
                  <hr className="text-gray-300" />
                  <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Sign In */}
            <Link
              to="/login"
              className="border hidden md:block border-gray-300 px-4 py-[6px] cursor-pointer rounded-full"
            >
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(true)} className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </Container>

      {/* Sidebar (Mobile Menu) */}
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
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 text-sm"
            >
              {item.label}
            </Link>
          ))}
          {/* Sign In */}
          <Link
            to="/login"
            className="border border-gray-300 text-sm  cursor-pointer rounded py-1 text-center"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}
    </div>
  );
};

export default Navbar;
