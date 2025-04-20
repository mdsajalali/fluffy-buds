import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="relative rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Discount Tag */}
      {product?.discount > 0 && (
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-md z-10 rotate-[-2deg]">
          {product?.discount}% OFF
        </div>
      )}

      {/* Image */}
      <div className="bg-gray-50 border-b border-gray-200 overflow-hidden">
        {product?.images?.length > 0 && (
          <Link to={`/shop/${product._id}`}>
            <img
              src={product?.images[0].url}
              alt={product?.name}
              className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4   grow flex flex-col">
        <Link className="block mb-auto" to={`/shop/${product._id}`}>
          <h2 className="text-base font-semibold text-gray-800 hover:text-black line-clamp-2 min-h-[2.5rem]">
            {product?.name}
          </h2>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-green-700 font-bold text-sm">
            $ {product?.price}
          </span>
          {product?.discount > 0 && (
            <span className="line-through text-gray-400 text-xs">
              $ {product?.discount}
            </span>
          )}
        </div>

        {/* Quantity Controller */}
        {cartItems[product?._id] ? (
          <div className="mt-4 flex items-center justify-between border border-gray-300 rounded-md px-4 py-2">
            <button
              onClick={() => removeFromCart(product?._id)}
              className="text-xl text-gray-700 hover:text-black"
            >
              <svg
                className="cursor-pointer"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </button>
            <span className="font-semibold text-sm">
              {cartItems[product?._id]}
            </span>
            <button
              onClick={() => addToCart(product?._id)}
              className="text-xl text-gray-700 hover:text-black"
            >
              <svg
                className="cursor-pointer"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
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
          <div className="mt-4" onClick={() => addToCart(product?._id)}>
            <button className="w-full py-2 cursor-pointer text-sm font-semibold bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300">
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
