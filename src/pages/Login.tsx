import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "sonner";
import { StoreContext } from "../context/StoreContext";

const Login = () => {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const { setToken } = useContext(StoreContext);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (res?.data?.success) {
        setToken(res?.data?.token);
        localStorage.setItem("token", res?.data?.token);
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-0">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Section: Form */}
        <div className="lg:p-8 p-4 w-full md:w-1/2">
          <div className="flex items-center mb-6">
            <img src="/logo.webp" alt="Logo" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Log in</h2>
          <p className="text-gray-600 mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Password */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-12 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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
