import { useContext, useEffect } from "react";
import { Step } from "./Cart";
import { StoreContext } from "../../context/StoreContext";
import useCategoriesProduct from "../../hooks/useCategoriesProduct";
import axiosInstance from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

type AddressProps = {
  setActiveStep: React.Dispatch<React.SetStateAction<Step>>;
};

type AddressFormElements = HTMLFormControlsCollection & {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  street: HTMLInputElement;
  state: HTMLInputElement;
  zipcode: HTMLInputElement;
  country: HTMLInputElement;
  phone: HTMLInputElement;
};

type AddressForm = HTMLFormElement & {
  elements: AddressFormElements;
};

function Address({ setActiveStep }: AddressProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { getTotalCartAmount, token, cartItems } = useContext(StoreContext);
  const { products } = useCategoriesProduct();
  const navigate = useNavigate();

  console.log({ setActiveStep });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as AddressForm;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const street = form.street.value;
    const state = form.state.value;
    const zipcode = form.zipcode.value;
    const country = form.country.value;
    const phone = form.phone.value;

    const data = {
      firstName,
      lastName,
      email,
      state,
      street,
      zipcode,
      country,
      phone,
    };

    const orderItems: {
      quantity: number;
      _id: string;
      name: string;
      description: string;
      category: string;
      sizes: string[];
      colors: string[];
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

    const response = await axiosInstance.post("order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto    rounded-lg shadow  p-4 md:p-8 flex flex-col lg:flex-row gap-8"
      >
        {/* Delivery Information Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                placeholder="Street"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip code"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                required
              />
            </div>
          </div>
        </div>

        {/* Cart Totals Section */}
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
            // onClick={() => setActiveStep("Payment")}
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
