import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadingTitle from "../shared/HeadingTitle";
import useCategoriesProduct from "../hooks/useCategoriesProduct";
import ProductCard from "../shared/ProductCard";

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toys, accessories, stationery, products } = useCategoriesProduct();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const isCategoriesPage = location.pathname === "/categories";

  const categories = [
    {
      name: "Toys",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FF1_iBftFUE.webp&w=384&q=75",
      products: toys,
    },
    {
      name: "Accessories",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FNoodoll-blanket-playmat-Ricepuffy-white-1_900x.webp&w=384&q=75",
      products: accessories,
    },
    {
      name: "Stationery",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FStationery.webp&w=384&q=75",
      products: stationery,
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (!isCategoriesPage) {
      navigate("/categories");
      sessionStorage.setItem("selectedCategory", categoryName);
      return;
    }

    if (activeCategory === categoryName) {
      setActiveCategory(null);
      setShowAllProducts(false);
    } else {
      setActiveCategory(categoryName);
      setShowAllProducts(false);
    }
  };

  const handleViewAllClick = () => {
    if (!isCategoriesPage) {
      navigate("/categories");
      sessionStorage.setItem("showAllProducts", "true");
      return;
    }
    setShowAllProducts(true);
    setActiveCategory(null);
  };

  useEffect(() => {
    if (isCategoriesPage) {
      const storedCategory = sessionStorage.getItem("selectedCategory");
      const storedShowAll = sessionStorage.getItem("showAllProducts");

      if (storedCategory) {
        setActiveCategory(storedCategory);
        sessionStorage.removeItem("selectedCategory");
      } else if (storedShowAll) {
        setShowAllProducts(true);
        sessionStorage.removeItem("showAllProducts");
      }
    }
  }, [isCategoriesPage]);

  const productsToDisplay = showAllProducts
    ? products
    : activeCategory
    ? categories.find((cat) => cat.name === activeCategory)?.products || []
    : [];

  const getProductCountText = () => {
    if (showAllProducts) {
      return `All Products (${products.length})`;
    }
    if (activeCategory) {
      const count = productsToDisplay.length;
      return `${activeCategory} (${count} product${count !== 1 ? "s" : ""})`;
    }
    return "";
  };

  return (
    <div className={`container mx-auto px-4 mb-10`}>
      <div className={!isCategoriesPage ? "" : "md:mt-14"}>
        <HeadingTitle title="Categories" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category, index) => (
          <div key={index} className="relative group">
            <div
              className={`overflow-hidden border border-gray-300 shadow-[4px_4px_0_0_#000] ${
                activeCategory === category.name
                  ? "shadow-[4px_4px_0_0_#3b82f6]"
                  : ""
              }  `}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="text-center py-2">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">
                {category.products.length} items
              </p>
            </div>
          </div>
        ))}

        <div
          className={`flex items-center h-[260px] justify-center border border-gray-300 ${
            showAllProducts ? "shadow-[4px_4px_0_0_#3b82f6]" : ""
          } shadow-[4px_4px_0_0_#000] cursor-pointer  `}
          onClick={handleViewAllClick}
        >
          <div
            className={`text-lg font-semibold flex items-center gap-2 ${
              showAllProducts ? "text-blue-500" : ""
            }`}
          >
            View All
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </div>
        </div>
      </div>

      {isCategoriesPage && productsToDisplay.length > 0 && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-6">{getProductCountText()}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
