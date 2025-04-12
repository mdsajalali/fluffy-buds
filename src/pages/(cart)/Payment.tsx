import { useState } from "react";
import { CreditCard, Banknote, Loader2 } from "lucide-react";

const Payment = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      quantity: 2,
      price: 129.99,
    },
    {
      id: 2,
      name: "Smart Watch",
      quantity: 1,
      price: 199.99,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      quantity: 3,
      price: 89.99,
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === "stripe") {
        alert("Stripe payment flow starts here");
      } else if (paymentMethod === "cod") {
        alert("Cash on Delivery selected");
      }
    }, 1500);
  };

  return (
    <div className="py-4 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total ({products.length} items):</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Payment Method
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === "stripe"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setPaymentMethod("stripe")}
              role="button"
              aria-label="Select Stripe payment"
            >
              <CreditCard className="w-6 h-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Credit/Debit Card
                </h3>
                <p className="text-sm text-gray-500">
                  Pay securely with Stripe
                </p>
              </div>
            </div>
            <div
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === "cod"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setPaymentMethod("cod")}
              role="button"
              aria-label="Select Cash on Delivery payment"
            >
              <Banknote className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Cash on Delivery
                </h3>
                <p className="text-sm text-gray-500">Pay when you receive</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700  text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-300   disabled:to-gray-400 disabled:cursor-not-allowed"
            disabled={!paymentMethod || isProcessing}
            aria-disabled={!paymentMethod || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Pay $${calculateTotal()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
