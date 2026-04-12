import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function ProductPagination({ pageIndex, pageCount, onChange }) {
  if (pageCount <= 0) return null;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => onChange(pageIndex - 1)}
          disabled={pageIndex === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pageIndex === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <IoChevronBackOutline className="w-4 h-4" />
          Trước
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              page === pageIndex
                ? "bg-[#E31837] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pageIndex >= pageCount
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <IoChevronForwardOutline className="w-4 h-4" />
          Sau
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-2">
        Trang {pageIndex} / {pageCount}
      </p>
    </>
  );
}
