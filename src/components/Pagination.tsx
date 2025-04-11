import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];
  const currentPage = 2;

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <button className="p-2 rounded-lg hover:text-white duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`w-9 h-9 rounded-lg text-sm font-medium duration-300 transition
            ${
              page === currentPage
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          {page}
        </button>
      ))}

      <button className="p-2 rounded-lg hover:bg-gray-200 duration-300 hover:text-white dark:hover:bg-gray-700 transition">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
