import { useState } from "react";
import { ProductProps } from "../types/types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductProps;
}

const ProductDetailsCard = ({ product }: ProductCardProps) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

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
            <div className="flex md:flex-col gap-2 order-2 md:order-1">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-24 object-cover cursor-pointer border-2 ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => handleImageClick(image)}
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
            {product.title}
          </h1>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-800 mb-2">
            ₹{product.price}
            <span className="line-through text-sm text-gray-500 ml-2">
              ₹{product.originalPrice}
            </span>
            <span className="text-red-500 text-sm ml-2">
              ({product.discount}% OFF)
            </span>
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
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedSize === size
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Color:
            </label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-full">
              {/* Quantity Controller */}
              {quantities[product.id] ? (
                <div className="mt-3 border border-black flex items-center justify-between px-3 py-1">
                  <button
                    onClick={() => handleDecrease(product.id)}
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
                  <span className="font-bold">{quantities[product.id]}</span>
                  <button
                    onClick={() => handleIncrease(product.id)}
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
                  onClick={() => handleAddToCart(product.id)}
                >
                  <button className="w-full py-2 cursor-pointer font-bold text-sm  ">
                    Add To Cart
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3 border border-gray-300 w-full hover:shadow duration-300 shadow-[4px_4px_0_0_#22c55e]">
              <button className="w-full py-2 cursor-pointer font-bold text-sm  ">
                Buy It Now
              </button>
            </div>
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
