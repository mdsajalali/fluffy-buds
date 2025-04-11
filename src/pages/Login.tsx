import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Section: Form */}
        <div className="p-8 w-full md:w-1/2">
          <div className="flex items-center mb-6">
            <img src="/logo.webp" alt="Logo" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Log in</h2>
          <p className="text-gray-600 mb-6">
            Sign in to your account to continue
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log in
            </button>
          </form>

          <p className="text-center mt-4">
            <div>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </p>
        </div>

        {/* Right Section: Image (Hidden on screens < 768px) */}
        <div className="hidden md:block w-full md:w-1/2 p-8">
          <img
            src="/login.svg"
            alt="Login Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
