import { IoAddOutline } from "react-icons/io5";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
import toastService from "../../../../shared/utils/toastService";
import { useState } from "react";
import CategoryTable from "../components/CategoryTable";
import CategoryFormModal from "../components/CategoryFormModal";
import CategoryDeleteModal from "../components/CategoryDeleteModal";
import CategoryViewModal from "../components/CategoryViewModal";
import useCategory from "../hooks/useCategory";

function CategoryPage() {
  const [loading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [name, setName] = useState("");

  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const addPerfommance = async () => {
    if (!name.trim()) {
      toastService.warning("Vui lòng nhập tên danh mục");
      return;
    }
    try {
      await createCategory({ name });
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
      await updateCategory(selected.id, { name });
      toastService.success("Cập nhật thành công!");
      setOpenModal(null);
      fetchCategories();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };
  const deletePerfommance = async () => {
    try {
      await deleteCategory(selected.id);
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

      <CategoryTable
        data={categories}
        onView={(item) => {
          setSelected(item);
          setOpenModal("view");
        }}
        onEdit={(item) => {
          setSelected(item);
          setName(item.name);
          setOpenModal("edit");
        }}
        onDelete={(item) => {
          setSelected(item);
          setOpenModal("delete");
        }}
      ></CategoryTable>

      <CategoryFormModal
        open={openModal === "add" || openModal === "edit"}
        onClose={() => setOpenModal(null)}
        onSubmit={openModal === "add" ? addPerfommance : editPerfommance}
        mode={openModal}
        name={name}
        setName={setName}
      ></CategoryFormModal>

      <CategoryDeleteModal
        open={openModal === "delete"}
        onClose={() => setOpenModal(null)}
        onConfirm={deletePerfommance}
        selected={selected}
      ></CategoryDeleteModal>

      <CategoryViewModal
        open={openModal === "view"}
        onClose={() => setOpenModal(null)}
        selected={selected}
      ></CategoryViewModal>
    </>
  );
}

export default CategoryPage;
