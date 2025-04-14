import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="p-2 rounded-lg hover:bg-gray-200  dark:hover:bg-gray-700  hover:text-white transition"
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium duration-300 cursor-pointer transition ${
            page === currentPage
              ? "bg-black text-white dark:bg-white  dark:text-black"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 "
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-white transition"
        disabled={currentPage === totalPages}
        style={{
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
