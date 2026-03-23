import {
  IoAddOutline,
  IoTrashOutline,
  IoPencilOutline,
  IoEyeOutline,
  IoCloseOutline,
} from "react-icons/io5";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
import toastService from "../../../../shared/utils/toastService";
import { useEffect, useState } from "react";
import categoryService from "../../../dashboard/services/categoryService";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch {
      toastService.error("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addPerfommance = async () => {
    if (!name.trim()) {
      toastService.warning("Vui lòng nhập tên danh mục");
    }
    try {
      await categoryService.create({ name });
      toastService.success("Thêm danh mục thành công!");
      setName("");
      setOpenModal(null);
      fetchCategories();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Thêm thất bại");
    }
  };
  const editPerfommance = async () => {
    if (!name.trim()) {
      toastService.warning("Vui lòng nhập tên danh mục");
      return;
    }
    try {
      await categoryService.update(selected.id, { name });
      toastService.success("Cập nhật thành công!");
      setOpenModal(null);
      fetchCategories();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };
  const deletePerfommance = async () => {
    try {
      await categoryService.delete(selected.id);
      toastService.success("Xóa thành công!");
      setOpenModal(null);
      fetchCategories();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Xóa thất bại");
    }
  };
  return (
    <>
      {loading && <LoadingOverlay />}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
          <button
            onClick={() => {
              setName("");
              setOpenModal("add");
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold w-20">STT</th>
              <th className="px-6 py-4 font-semibold">Tên danh mục</th>
              <th className="px-6 py-4 font-semibold text-center w-48"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal("view");
                      }}
                      title="Xem"
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                      <IoEyeOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelected(item);
                        setName(item.name);
                        setOpenModal("edit");
                      }}
                      title="Sửa"
                      className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                    >
                      <IoPencilOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal("delete");
                      }}
                      title="Xóa"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(openModal === "add" || openModal === "edit") && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {openModal === "add" ? "Thêm danh mục" : "Sửa danh mục"}
              </h3>
              <button
                onClick={() => setOpenModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <IoCloseOutline className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên danh mục
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên danh mục..."
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
              ></input>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setOpenModal(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={openModal === "add" ? addPerfommance : editPerfommance}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#E31837] hover:bg-red-700 rounded-lg"
              >
                {openModal === "add" ? "Thêm" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}

      {openModal === "delete" && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-sm shadow-xl text-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <IoTrashOutline className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Xác nhận xóa
            </h3>
            <p className="text-gray-500 text-sm mb-1">
              Bạn có chắc muốn xóa danh mục
            </p>
            <p className="font-semibold text-gray-800 mb-6">
              "{selected?.name}"?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setOpenModal(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={deletePerfommance}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {openModal === "view" && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Chi tiết danh mục
              </h3>
              <button
                onClick={() => setOpenModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <IoCloseOutline className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">ID</p>
                <p className="text-sm font-medium text-gray-800">
                  {selected?.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Name</p>
                <p className="text-sm font-medium text-gray-800">
                  {selected?.name}
                </p>
              </div>
            </div>
            <div className="flex justify-end px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setOpenModal(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryPage;
