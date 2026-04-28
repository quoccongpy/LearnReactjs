import { useState } from "react";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
import { IoAddOutline } from "react-icons/io5";
import SizeFormModal from "../components/SizeFormModal";
import toastService from "../../../../shared/utils/toastService";
import useSize from "../hooks/useSize";
import SizeTable from "../components/SizeTable";
import SizeViewModal from "../components/SizeViewModal";
import SizeDeleteModal from "../components/SizeDeleteModal";

function SizePage() {
  const [loading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [name, setName] = useState("");

  const { size, fetchSize, createSize, updateSize, deleteSize } = useSize();

  const addPerfommance = async () => {
    if (!name.trim()) {
      toastService.warning("Vui lòng nhập Size!");
      return;
    }
    try {
      await createSize({ name });
      toastService.success("Thêm size thành công!");
      setName("");
      setOpenModal(null);
      fetchSize();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Thêm thất bại");
    }
  };
  const editPerfommance = async () => {
    try {
      await updateSize(selected.id, { name });
      toastService.success("Cập nhập size thành công!");
      setOpenModal(null);
      fetchSize();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Cập nhập thất bại");
    }
  };
  const deletePerfommance = async () => {
    try {
      await deleteSize(selected.id);
      toastService.success("Xoá size thành công!");
      setOpenModal(null);
      fetchSize();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Xoá thất bại");
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Size bánh
          </h1>
          <button
            onClick={() => {
              setName("");
              setOpenModal("add");
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            Thêm Size bánh
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingOverlay />
      ) : !size || size.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Chưa có dữ liệu</div>
      ) : (
        <SizeTable
          data={size}
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
        ></SizeTable>
      )}

      <SizeFormModal
        mode={openModal}
        open={openModal === "add" || openModal === "edit"}
        onClose={() => setOpenModal(null)}
        name={name}
        setName={setName}
        onSubmit={openModal === "add" ? addPerfommance : editPerfommance}
      ></SizeFormModal>
      <SizeDeleteModal
        open={openModal === "delete"}
        onClose={() => setOpenModal(null)}
        onConfirm={deletePerfommance}
        selected={selected}
      ></SizeDeleteModal>

      <SizeViewModal
        open={openModal === "view"}
        onClose={() => setOpenModal(null)}
        selected={selected}
      ></SizeViewModal>
    </>
  );
}

export default SizePage;
