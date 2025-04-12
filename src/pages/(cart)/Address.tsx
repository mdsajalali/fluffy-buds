import { Step } from "./Cart";

function Address({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<Step>>;
}) {
  console.log(setActiveStep("Address"));
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-6xl mx-auto    rounded-lg shadow  p-4 md:p-8 flex flex-col lg:flex-row gap-8">
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
                  placeholder="First name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Street"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State
                </label>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
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
                  placeholder="Zip code"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
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
              <span>TOTAL</span>
              <span>$52</span>
            </div>
          </div>
          <button
            onClick={() => setActiveStep("Payment")}
            className="bg-blue-600 hover:bg-blue-700 mt-3 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
