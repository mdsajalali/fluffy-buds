import { useState } from "react";
import Container from "../../shared/Container";

type Step = "Cart" | "Address" | "Payment";

const Cart = () => {
  const [activeStep, setActiveStep] = useState<Step>("Cart");

  const handleStepChange = (step: Step) => {
    setActiveStep(step);
  };

  const steps: Step[] = ["Cart", "Address", "Payment"];

  return (
    <div className="md:mt-[65px] pt-5">
      <Container>
        <div className="md:flex hidden items-center justify-center mb-6">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === step
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
                onClick={() => handleStepChange(step)}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  activeStep === step ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    steps.indexOf(activeStep) > index
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="my-4">
          {activeStep === "Cart" && <div>Cart page</div>}
          {activeStep === "Address" && <div>Address</div>}
          {activeStep === "Payment" && <div>Payment</div>}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
