import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import CrustFormModal from "../components/CrustFormModal";
import useCrust from "../hook/useCrust";
import toastService from "../../../../shared/utils/toastService";
import CrustTable from "../components/CrustTable";
import CrustViewModal from "../components/CrustViewModal";
import CrustDeleteModal from "../components/CrustDeleteModal";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
function CrustPage() {
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [name, setName] = useState("");

  const {
    crust,
    loading,
    error,
    fetchCrust,
    createCrust,
    updateCrust,
    deleteCrust,
  } = useCrust();

  const addPerfommance = async () => {
    if (!name.trim()) {
      toastService.warning("Vui lòng nhập đế bánh!");
      return;
    }
    try {
      await createCrust({ name });
      toastService.success("Thêm đế bánh thành công!");
      setName("");
      setOpenModal(null);
      fetchCrust();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Thêm thất bại");
    }
  };
  const editPerfommance = async () => {
    try {
      await updateCrust(selected.id, { name });
      toastService.success("Cập nhập đế bánh thành công!");
      setOpenModal(null);
      fetchCrust();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Cập nhập thất bại");
    }
  };
  const deletePerfommance = async () => {
    try {
      await deleteCrust(selected.id);
      toastService.success("Xoá size thành công!");
      setOpenModal(null);
      fetchCrust();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Xoá thất bại");
    }
  };

  useEffect(() => {
    if (error) {
      toastService.error(
        error.response?.data?.message || "Không thể tải đế bánh",
      );
    }
  }, [error]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý đế bánh</h1>
          <button
            onClick={() => {
              setName("");
              setOpenModal("add");
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            Thêm đế bánh
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingOverlay />
      ) : !crust || crust.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Chưa có dữ liệu</div>
      ) : (
        <CrustTable
          data={crust}
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
        ></CrustTable>
      )}

      <CrustFormModal
        mode={openModal}
        open={openModal === "add" || openModal === "edit"}
        onClose={() => setOpenModal(null)}
        name={name}
        setName={setName}
        onSubmit={openModal === "add" ? addPerfommance : editPerfommance}
      ></CrustFormModal>
      <CrustDeleteModal
        open={openModal === "delete"}
        onClose={() => setOpenModal(null)}
        onConfirm={deletePerfommance}
        selected={selected}
      ></CrustDeleteModal>
      <CrustViewModal
        open={openModal === "view"}
        onClose={() => setOpenModal(null)}
        selected={selected}
      ></CrustViewModal>
    </>
  );
}
export default CrustPage;
