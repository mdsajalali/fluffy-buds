import { Link } from "react-router-dom";
import HeadingTitle from "../shared/HeadingTitle";

const Categories = () => {
  const categories = [
    {
      name: "Toys",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FF1_iBftFUE.webp&w=384&q=75",
    },
    {
      name: "Accessories",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FNoodoll-blanket-playmat-Ricepuffy-white-1_900x.webp&w=384&q=75",
    },
    {
      name: "Stationery",
      image:
        "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2Fcategory%2FStationery.webp&w=384&q=75",
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <HeadingTitle title="Categories" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <div className="overflow-hidden border border-gray-300 shadow-[4px_4px_0_0_#000]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="text-center py-2">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}

        {/* View All Button (Visible on larger screens) */}
        <div className="hidden lg:flex items-center h-[260px] justify-center border border-gray-300 shadow-[4px_4px_0_0_#000]  ">
          <Link
            to="/categories"
            className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
