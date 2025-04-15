import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="md:mt-[65px]">
      <div className="flex flex-col items-center justify-center my-10 md:my-32">
        <h1 className="text-9xl sm:text-[12rem] md:text-[15rem] font-bold text-gray-800">
          404
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mt-4">
          Oops! Page Not Found!
        </p>
        <p className="text-sm sm:text-base md:text-lg mt-2">
          Please go back to{" "}
          <Link to="/" className="text-red-500 underline">
            Homepage
          </Link>
        </p>
        <div className="flex px-4 flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto justify-center">
          <Link
            to="/"
            className="bg-black flex items-center text-white font-medium px-6 py-3 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center text-center"
            onClick={() => (window.location.href = "/")}
          >
            Go Back to Home
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M13 5H19V11"></path>
                <path d="M19 5L5 19"></path>
              </svg>
            </span>
          </Link>
          <Link
            to="/shop"
            className="border-2 flex items-center border-black text-black font-medium py-3 px-6 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center text-center"
            onClick={() => (window.location.href = "/shop")}
          >
            Continue Shopping
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M13 5H19V11"></path>
                <path d="M19 5L5 19"></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
