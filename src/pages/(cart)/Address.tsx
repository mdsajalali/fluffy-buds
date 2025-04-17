import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import useCategoriesProduct from "../../hooks/useCategoriesProduct";
import axiosInstance from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

interface AddressFormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

function Address() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { getTotalCartAmount, token, cartItems } = useContext(StoreContext);
  const { products } = useCategoriesProduct();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    const orderItems: {
      quantity: number;
      _id: string;
      name: string;
      description: string;
      category: string;
      size: string[];
      color: string[];
      price: number;
      regularPrice: number;
      images: { url: string }[];
    }[] = [];

    products?.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axiosInstance.post("order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error placing order");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto rounded-lg shadow p-4 md:p-8 flex flex-col lg:flex-row gap-8"
      >
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name min 3 chars",
                    },
                  })}
                  placeholder="First name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name min 3 chars",
                    },
                  })}
                  placeholder="Last name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email address"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("street", {
                  required: "Street address is required",
                  minLength: {
                    value: 5,
                    message: "Street address must be at least 5 characters",
                  },
                })}
                placeholder="Street"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city", {
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters",
                    },
                  })}
                  placeholder="City"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("state", {
                    required: "State is required",
                    minLength: {
                      value: 2,
                      message: "State must be at least 2 characters",
                    },
                  })}
                  placeholder="State"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Zip Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("zipcode", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/,
                      message: "Invalid zip code format",
                    },
                  })}
                  placeholder="Zip code"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.zipcode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("country", {
                    required: "Country is required",
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters",
                    },
                  })}
                  placeholder="Country"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[\d\s-]{10,}$/,
                    message: "Invalid phone number format",
                  },
                })}
                placeholder="Phone"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-indigo-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cart Totals
          </h2>
          <div className="space-y-3">
            <hr className="my-3 border-gray-200" />
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Delivery Fee</span>
              <span>${getTotalCartAmount() === 0 ? 0 : 2}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-semibold text-gray-800">
              <span>TOTAL</span>
              <span>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 mt-3 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Proceed To Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Address;
