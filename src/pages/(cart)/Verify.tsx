import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.post("/order/verify", {
          success,
          orderId,
        });

        if (response.data.success) {
          navigate("/my-orders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-600">Verifying your payment...</p>
      </div>
    </div>
  );
};

export default Verify;
