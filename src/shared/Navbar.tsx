import { Link } from "react-router-dom";
import Container from "./Container";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300">
      <Container>
        <div className="flex items-center justify-between py-5">
          {/* Image here */}
          <Link to="/">
            <img className="w-24" src="/logo.webp" alt="Logo" />
          </Link>

          {/* Nav items here */}
          <nav>
            <ul className="flex items-center gap-8">
              <li className="text-gray-600 cursor-pointer text-md">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-600 cursor-pointer text-md">
                <Link to="/products">products</Link>
              </li>
              <li className="text-gray-600 cursor-pointer text-md">
                <Link to="/category">Category</Link>
              </li>
            </ul>
          </nav>
          {/* cart here */}
          <div className="flex items-center gap-4">
            <svg
              className="cursor-pointer"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <img
              className="w-6 h-6 object-contain cursor-pointer"
              src="/profile_icon.png"
              alt="Profile"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
