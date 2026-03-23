import {
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoTrendingUpOutline,
  IoCartOutline,
  IoPersonOutline,
  IoEyeOutline,
} from "react-icons/io5";
const STATS = [
  {
    label: "Tổng đơn hàng",
    value: "1,245",
    change: "+12%",
    icon: IoCartOutline,
    color: "bg-blue-500",
  },
  {
    label: "Doanh thu",
    value: "45.2M",
    change: "+8%",
    icon: IoTrendingUpOutline,
    color: "bg-green-500",
  },
  {
    label: "Khách hàng",
    value: "892",
    change: "+5%",
    icon: IoPersonOutline,
    color: "bg-purple-500",
  },
  {
    label: "Lượt truy cập",
    value: "3,420",
    change: "+18%",
    icon: IoEyeOutline,
    color: "bg-orange-500",
  },
];

const RECENT_ORDERS = [
  {
    id: "#1234",
    customer: "Nguyễn Văn A",
    items: "Pizza Hải Sản, Coca",
    total: "299,000đ",
    status: "Đang giao",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#1233",
    customer: "Trần Thị B",
    items: "Combo Gia Đình",
    total: "549,000đ",
    status: "Hoàn thành",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "#1232",
    customer: "Lê Văn C",
    items: "Pizza Phô Mai, Khoai Tây",
    total: "199,000đ",
    status: "Đang xử lý",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "#1231",
    customer: "Phạm Thị D",
    items: "My Box, Pepsi",
    total: "149,000đ",
    status: "Đã hủy",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    id: "#1230",
    customer: "Hoàng Văn E",
    items: "Pizza Tôm Hoàng Kim",
    total: "249,000đ",
    status: "Hoàn thành",
    statusColor: "bg-green-100 text-green-700",
  },
];

function DashboardOverview() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tổng quan</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Đơn hàng gần đây
          </h3>
          {/*  <Link
            to="/admin/orders"
            className="text-sm text-[#E31837] hover:underline font-medium"
          >
            Xem tất cả →
          </Link> */}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Mã đơn</th>
                <th className="px-6 py-3 font-medium">Khách hàng</th>
                <th className="px-6 py-3 font-medium">Sản phẩm</th>
                <th className="px-6 py-3 font-medium">Tổng tiền</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-4 space-y-3">
          {RECENT_ORDERS.map((order, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {order.id}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{order.customer}</p>
              <p className="text-xs text-gray-400 mt-1">{order.items}</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">
                {order.total}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardOverview;
