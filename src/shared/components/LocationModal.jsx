import { useState } from "react";

export default function LocationModal({ onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        );
        const data = await res.json();

        const addr = data.display_name;

        setAddress(addr);

        const locationData = {
          lat,
          lng,
          address: addr,
        };

        localStorage.setItem("location", JSON.stringify(locationData));

        onSelect(locationData); // gửi lên Header
        setLoading(false);
        onClose();
      },
      () => {
        alert("Không lấy được vị trí");
        setLoading(false);
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-center mb-2">
          TÌM CỬA HÀNG GẦN BẠN NHẤT
        </h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          Nhập địa chỉ của bạn để xem ưu đãi tại địa phương
        </p>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ của bạn"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-red-500"
        />

        <button
          onClick={handleGetLocation}
          className="w-full border border-red-500 text-red-500 py-2 rounded-lg mb-4 hover:bg-red-50"
        >
          {loading ? "Đang lấy vị trí..." : "📍 Dùng vị trí của tôi"}
        </button>

        <button
          onClick={() => {
            const locationData = {
              address,
            };

            localStorage.setItem("location", JSON.stringify(locationData));
            onSelect(locationData);
            onClose();
          }}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Bắt đầu đặt hàng
        </button>
      </div>
    </div>
  );
}
