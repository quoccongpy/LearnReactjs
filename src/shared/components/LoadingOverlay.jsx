function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col items-center gap-3 shadow-lg">
        <svg
          className="animate-spin h-10 w-10 text-[#E31837]"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-sm text-gray-600 font-medium">Đang xử lý...</p>
      </div>
    </div>
  );
}
export default LoadingOverlay;
