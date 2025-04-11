import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  const getFullYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <Link to="/">
              <img className="w-24" src="/logo.webp" alt="Logo" />
            </Link>
            <p className="text-sm md:text-base text-gray-600 mt-8">
              For queries and help
            </p>
            <div className="flex items-center space-x-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
              </svg>
              <p className="text-sm md:text-base text-gray-600 cursor-pointer">
                fluffybuds@help.com
              </p>
            </div>
          </div>

          {/* Categories */}
          <nav>
            <h1 className="font-semibold text-lg md:text-base text-gray-800">
              Categories
            </h1>
            <ul className="space-y-2 mt-4">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">
                  Toys
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">
                  Stationery
                </Link>
              </li>
            </ul>
          </nav>

          {/* Links */}
          <nav>
            <h1 className="font-semibold text-lg md:text-base text-gray-800">
              Links
            </h1>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Stay Connected */}
          <nav>
            <h1 className="font-semibold text-lg md:text-base text-gray-800">
              Stay Connected
            </h1>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center space-x-2">
                <svg
                  className="cursor-pointer"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
                <p className="text-gray-600 cursor-pointer">Facebook</p>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="cursor-pointer"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <p className="text-gray-600 cursor-pointer">Instagram</p>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="cursor-pointer"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
                <p className="text-gray-600 cursor-pointer">Youtube</p>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="cursor-pointer"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.0004 2V8.41396C10.5947 8.33909 10.1768 8.3 9.75039 8.3C5.96724 8.3 2.90039 11.3668 2.90039 15.15C2.90039 18.9332 5.96724 22 9.75039 22C13.5335 22 16.6004 18.9332 16.6004 15.15V11.4136C17.6366 11.8539 18.7662 12.1 20.0005 12.1H21.0005V6.5H20.0005C18.0966 6.5 16.6004 4.96259 16.6004 3V2H11.0004ZM13.0004 4H14.688C15.0818 6.22009 16.7673 7.99607 19.0005 8.4091V10.0282C17.9624 9.87602 17.0253 9.48645 16.1567 8.905L14.6004 7.86327V15.15C14.6004 17.8286 12.429 20 9.75039 20C7.07181 20 4.90039 17.8286 4.90039 15.15C4.90039 12.4714 7.07181 10.3 9.75039 10.3C9.83431 10.3 9.91769 10.3021 10.0005 10.3063V11.9095C9.91795 11.9032 9.83454 11.9 9.75039 11.9C7.95547 11.9 6.50039 13.3551 6.50039 15.15C6.50039 16.9449 7.95547 18.4 9.75039 18.4C11.5453 18.4 13.0004 16.9449 13.0004 15.15C13.0004 11.4334 12.9992 7.71665 13.0004 4ZM8.50039 15.15C8.50039 14.4596 9.06003 13.9 9.75039 13.9C10.4407 13.9 11.0004 14.4596 11.0004 15.15C11.0004 15.8404 10.4407 16.4 9.75039 16.4C9.06003 16.4 8.50039 15.8404 8.50039 15.15Z"></path>
                </svg>
                <p className="text-gray-600 cursor-pointer">TikTok</p>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-base text-gray-600">
            &copy; {getFullYear} Fluffy Buds. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
