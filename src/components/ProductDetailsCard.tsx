import { useContext, useState } from "react";
import { ProductProps } from "../types/types";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

interface ProductCardProps {
  product: ProductProps;
  loading?: boolean;
}

const ProductDetailsCard = ({ product, loading }: ProductCardProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]?.url);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Skeleton component for rectangular blocks
  const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <div className="container mx-auto py-6 md:py-10">
      {/* Breadcrumb */}
      <div className="text-sm mb-4 text-gray-500">
        {loading ? (
          <SkeletonBlock className="h-4 w-32" />
        ) : (
          <span>
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Images */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail Images */}
            <div className="flex md:flex-col vurgu justify-between md:justify-start md:gap-2 order-2 md:order-1">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <SkeletonBlock
                        key={index}
                        className="md:w-20 w-18 h-16 md:h-24"
                      />
                    ))
                : product?.images?.map((image, index) => (
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
            <div className="order-1 w-full md:w-[600px] md:order-2">
              {loading ? (
                <SkeletonBlock className="w-full h-[300px] md:h-[600px]" />
              ) : (
                <LightGallery
                  plugins={[lgZoom, lgThumbnail]}
                  speed={500}
                  zoom={true}
                  scale={1}
                  mobileSettings={{
                    controls: true,
                    showCloseIcon: true,
                    download: false,
                  }}
                >
                  {/* Main Image as the trigger */}
                  <a
                    href={selectedImage}
                    data-src={selectedImage}
                    data-sub-html=" "
                    className="block"
                  >
                    <img
                      src={selectedImage}
                      alt="Main Product"
                      className="w-full h-[300px] md:h-[600px] object-cover"
                    />
                  </a>
                  {/* Include all other images in the gallery */}
                  {product?.images?.map((image, index) => (
                    <a
                      key={image?._id || index}
                      href={image?.url}
                      data-src={image?.url}
                      data-sub-html=" "
                      style={{ display: "none" }}
                    >
                      <img
                        src={image?.url}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-[300px] md:h-[600px] object-cover"
                      />
                    </a>
                  ))}
                </LightGallery>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1">
          {/* Product Name */}
          {loading ? (
            <SkeletonBlock className="h-8 w-3/4 mb-2" />
          ) : (
            <h1 className="text-2xl font-semibold text-blue-600">
              {product.name}
            </h1>
          )}

          {/* Price */}
          <div className="text-2xl font-bold text-gray-800 mb-2">
            {loading ? (
              <SkeletonBlock className="h-6 w-24" />
            ) : (
              <>
                ${product?.price}
                {typeof product?.discount === "number" &&
                  product.discount > 0 && (
                    <span className="text-red-500 text-sm ml-2">
                      ({product.discount}% OFF)
                    </span>
                  )}
              </>
            )}
          </div>

          {/* Category */}
          {loading ? (
            <SkeletonBlock className="h-4 w-40" />
          ) : (
            <p className="py-3">
              Category:{" "}
              <span className="font-semibold text-gray-600 ">
                {product.category}
              </span>
            </p>
          )}

          <div className="flex items-center gap-2 py-2">
            <div className="flex items-center gap-1">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                  stroke-width="0"
                  fill="currentColor"
                ></path>
              </svg>
              <h3 className="text-[14px]">
                Secure <br /> Checkout
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                  stroke-width="0"
                  fill="currentColor"
                ></path>
              </svg>
              <h3 className="text-[14px]">
                Satisfaction <br /> Guaranteed
              </h3>
            </div>
            <div className="sm:flex items-center gap-1 hidden">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
              </svg>
              <h3 className="text-[14px]">
                Privacy <br /> Protected
              </h3>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-full">
              {loading ? (
                <SkeletonBlock className="h-10 w-full mt-3" />
              ) : cartItems[product?._id] ? (
                <div className="mt-4 border border-gray-300 rounded  flex items-center justify-between px-3 py-[5px]">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="text-xl"
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
                  <span className="font-bold">{cartItems[product?._id]}</span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="text-xl"
                  >
                    <svg
                      className="cursor-pointer"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3 poniendo.org/2000/svg"
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

          {/* Description */}
          {loading ? (
            <div className="space-y-2 mb-4">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="my-4">
              <h1>Product Description</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
