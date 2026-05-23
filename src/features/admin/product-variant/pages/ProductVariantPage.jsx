import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import useProductVariant from "../hooks/useProductVariant";
import toastService from "../../../../shared/utils/toastService";
import ProductVariantFormModal from "../components/ProductVariantFormModal";
import ProductVariantTable from "../components/ProductVariantTable";
import ProductVariantViewModal from "../components/ProductVariantViewModal";
import ProductVariantDeleteModal from "../components/ProductVariantDeleteModal";

function ProductVariantPage() {
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [formData, setFormData] = useState({
    sizeId: "",
    crustId: "",
    productId: "",
    price: "",
    sizeName: "",
    crustName: "",
  });

  const {
    loading,
    error,
    selectedProductId,
    setSelectedProductId,
    variants,
    sizes,
    crusts,
    categories,
    productsByCategory,
    productsHasVariants,
    fetchProductsByCategory,
    fetchVariants,
    createVariant,
    updateVariant,
    deleteVariant,
  } = useProductVariant();

  const addPerformance = async () => {
    if (!formData.sizeId || !formData.crustId || !formData.price) {
      toastService.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      await createVariant({
        productId: Number(formData.productId),
        sizeId: Number(formData.sizeId),
        crustId: Number(formData.crustId),
        price: Number(formData.price),
      });
      toastService.success("Thêm biến thể thành công!");
      setOpenModal(null);
      fetchVariants(selectedProductId);
    } catch {
      toastService.error(error.response?.data?.message || "Thêm thất bại");
    }
  };

  const editPerformance = async () => {
    if (!formData.price) {
      toastService.warning("Vui lòng nhập giá!");
      return;
    }
    try {
      await updateVariant(selected.id, {
        price: Number(formData.price),
      });
      toastService.success("Cập nhật giá thành công!");
      setOpenModal(null);
      fetchVariants(selectedProductId);
    } catch (err) {
      toastService.error(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const deletePerformance = async () => {
    try {
      await deleteVariant(selected.id);
      toastService.success("Xóa biến thể thành công!");
      setOpenModal(null);
      fetchVariants(selectedProductId);
    } catch {
      toastService.error(error.response?.data?.message || "Xóa thất bại");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Quản lý biến thể sản phẩm
        </h1>
        <button
          onClick={() => {
            setFormData({
              sizeId: "",
              crustId: "",
              price: "",
              productId: "",
              sizeName: "",
              crustName: "",
            });
            setOpenModal("add");
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <IoAddOutline className="w-5 h-5" />
          Thêm biến thể
        </button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Chọn sản phẩm:
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="flex-1 max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
        >
          <option value="">-- Chọn sản phẩm --</option>
          {productsHasVariants.map((phv) => (
            <option key={phv.id} value={phv.id}>
              {phv.name}
            </option>
          ))}
        </select>
      </div>
      {!selectedProductId ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">🍕</div>
          <p className="text-gray-500 text-lg">
            Vui lòng chọn sản phẩm để xem danh sách biến thể
          </p>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="text-center py-10 text-gray-500">Đang tải...</div>
          ) : variants.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Sản phẩm này chưa có biến thể nào
            </div>
          ) : (
            <ProductVariantTable
              data={variants}
              onView={(item) => {
                setSelected(item);
                setOpenModal("view");
              }}
              onEdit={(item) => {
                setSelected(item);
                const sObj = sizes.find((s) => s.name === item.sizeName);
                const cObj = crusts.find((c) => c.name === item.crustName);
                setFormData({
                  price: item.price,
                  sizeName: item.sizeName,
                  crustName: item.crustName,
                  sizeId: sObj ? sObj.id : "", // Thêm sizeId
                  crustId: cObj ? cObj.id : "", // Thêm crustId
                  productId: item.productId,
                });
                setOpenModal("edit");
              }}
              onDelete={(item) => {
                setSelected(item);
                setOpenModal("delete");
              }}
            />
          )}
        </>
      )}
      <ProductVariantFormModal
        open={openModal === "add" || openModal === "edit"}
        mode={openModal}
        onClose={() => setOpenModal(null)}
        formData={formData}
        setFormData={setFormData}
        sizes={sizes}
        crusts={crusts}
        categories={categories}
        onCategoryChange={fetchProductsByCategory}
        productsByCategory={productsByCategory}
        onSubmit={openModal === "add" ? addPerformance : editPerformance}
      />
      <ProductVariantDeleteModal
        open={openModal === "delete"}
        onClose={() => setOpenModal(null)}
        onConfirm={deletePerformance}
        selected={selected}
      />

      <ProductVariantViewModal
        open={openModal === "view"}
        onClose={() => setOpenModal(null)}
        selected={selected}
      ></ProductVariantViewModal>
    </>
  );
}
export default ProductVariantPage;
