import { useState } from "react";
import { ProductProps } from "../types/types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: ProductProps }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  console.log({ product });

  const handleAddToCart = (index: number) => {
    setQuantities((prev) => ({ ...prev, [index]: 1 }));
  };

  const handleIncrease = (index: number) => {
    setQuantities((prev) => ({ ...prev, [index]: prev[index] + 1 }));
  };

  const handleDecrease = (index: number) => {
    setQuantities((prev) => {
      const newQty = prev[index] - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      }
      return { ...prev, [index]: newQty };
    });
  };
  return (
    <div className=" relative bg-white">
      {/* Discount Tag */}
      <div className="absolute top-2 left-2 bg-green-700 text-white text-sm px-2 py-1 font-bold z-10 rotate-[-2deg]">
        {product?.discount}% OFF
      </div>

      {/* Image */}
      <div className="overflow-hidden border border-gray-300 shadow-[4px_4px_0_0_#000]">
        {product?.images?.length > 0 && (
          <img
            src={product?.images[0].url}
            alt={product?.name}
            className="w-full h-64 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* Info Section */}
      <div className="p-3">
        <Link to={`/shop/${product._id}`}>
          <h2 className="font-bold text-sm">{product?.name}</h2>
        </Link>
        <div className="text-sm mt-1">
          <span className="font-bold text-black">$ {product?.price}</span>{" "}
          <span className="line-through text-gray-500 text-xs">
            $ {product?.discount}
          </span>
        </div>

        {/* Quantity Controller */}
        {quantities[Number(product?._id)] ? (
          <div className="mt-3 border border-black flex items-center justify-between px-3 py-1">
            <button
              onClick={() => handleDecrease(Number(product?._id))}
              className="text-xl"
            >
              <svg
                className="cursor-pointer"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </button>
            <span className="font-bold">
              {quantities[Number(product?._id)]}
            </span>
            <button
              onClick={() => handleIncrease(Number(product?._id))}
              className="text-xl"
            >
              <svg
                className="cursor-pointer"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div
            className="mt-3 border border-gray-300 hover:shadow duration-300 shadow-[4px_4px_0_0_#22c55e]"
            onClick={() => handleAddToCart(Number(product?._id))}
          >
            <button className="w-full py-2 cursor-pointer font-bold text-sm  ">
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
