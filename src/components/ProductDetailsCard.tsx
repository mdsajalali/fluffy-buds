import { useContext, useState } from "react";
import { ProductProps } from "../types/types";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

interface ProductCardProps {
  product: ProductProps;
}

const ProductDetailsCard = ({ product }: ProductCardProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]?.url);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="container mx-auto py-6 md:py-10">
      {/* Breadcrumb */}
      <div className="text-sm mb-4  text-gray-500 ">
        <span>
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Images */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail Images */}
            <div className="flex md:flex-col justify-between md:justify-start md:gap-2 order-2 md:order-1">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`md:w-20 w-18 h-16 md:h-24 object-cover cursor-pointer border-2 ${
                    selectedImage === image?.url
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => handleImageClick(image?.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 w-full md:w-[600px]  md:order-2">
              <img
                src={selectedImage}
                alt="Main Product"
                className="w-full h-[300px]  md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-blue-600">
            {product.name}
          </h1>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-800 mb-2">
            ₹{product?.price}
            {typeof product?.discount === "number" && product.discount > 0 && (
              <>
                <span className="line-through text-sm text-gray-500 ml-2">
                  ₹{product.discount}
                </span>
                <span className="text-red-500 text-sm ml-2">
                  ({product.discount}% OFF)
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          <hr className="text-gray-300 mb-4" />

          {/* Size Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Size:
            </label>
            <div className="flex gap-2">
              <button
                className={`w-8 h-8 rounded-full border-2 border-blue-500 `}
              >
                {product.size}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Color:
            </label>
            <div className="flex gap-2">
              {product.color.split(" ").map((clr, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 border-blue-500`}
                  style={{ backgroundColor: clr.toLowerCase() }}
                  title={clr}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-full">
              {/* Quantity Controller */}
              {cartItems[product?._id] ? (
                <div className="mt-3 border border-black flex items-center justify-between px-3 py-1">
                  <button
                    onClick={() => removeFromCart(product?._id)}
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
                  <span className="font-bold">{cartItems[product?._id]}</span>
                  <button
                    onClick={() => addToCart(product?._id)}
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
                  className="mt-3 border border-gray-300 w-full hover:shadow duration-300 shadow-[4px_4px_0_0_#22c55e]"
                  onClick={() => addToCart(product?._id)}
                >
                  <button className="w-full py-2 cursor-pointer font-bold text-sm  ">
                    Add To Cart
                  </button>
                </div>
              )}
            </div>
            {/* <div className="mt-3 border border-gray-300 w-full hover:shadow duration-300 shadow-[4px_4px_0_0_#22c55e]">
              <button className="w-full py-2 cursor-pointer font-bold text-sm  ">
                Buy It Now
              </button>
            </div> */}
          </div>

          {/* Category */}
          <p className="text-gray-600  ">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
