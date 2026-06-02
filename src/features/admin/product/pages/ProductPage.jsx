import { useEffect, useState } from "react";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
import { IoAddOutline } from "react-icons/io5";

import categoryService from "../../category/services/categoryService";
import toastService from "../../../../shared/utils/toastService";

import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
import ProductViewModal from "../components/ProductViewModal";
import ProductPagination from "../components/ProductPagination";

import useProductForm from "../hooks/useProductForm";
import useProduct from "../hooks/useProduct";

function ProductPage() {
  const [categories, setCategories] = useState([]);

  const form = useProductForm();

  const {
    formData,
    setFormData,
    thumbnailRef,
    imagesRef,
    thumbnailPreview,
    setThumbnailPreview,
    setImagesPreview,
    imagesPreview,
    oldImages,
    setOldImages,
    handleThumbnailChange,
    handleImagesChange,
    handleRemoveThumbnail,
    handleRemoveImage,
    resetForm,
  } = form;

  const {
    loading,
    products,
    pageIndex,
    setPageIndex,
    pageCount,
    keyword,
    setKeyword,
    categoryId,
    setCategoryId,

    selected,
    modal,
    setModal,

    activeImageIndex,
    setActiveImageIndex,

    openView,
    openEdit,
    openDelete,

    createProduct,
    updateProduct,
    deleteProduct,
  } = useProduct({ form });

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch {
      toastService.error("Không thể tải danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setPageIndex(1);
  };

  const handleSearch = () => {
    setPageIndex(1);
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>

        <button
          onClick={() => {
            resetForm();
            setModal("add"); // ✅ FIX
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg"
        >
          <IoAddOutline className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />

        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Tìm
        </button>
      </div>

      <ProductTable
        data={products}
        pageIndex={pageIndex}
        pageSize={10}
        onView={openView}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      {/* PAGINATION */}
      <ProductPagination
        pageIndex={pageIndex}
        pageCount={pageCount}
        onChange={setPageIndex}
      />

      {/* FORM */}
      <ProductFormModal
        open={modal === "add" || modal === "edit"}
        mode={modal}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        onClose={() => setModal(null)}
        onSubmit={() => {
          if (modal === "add") createProduct(resetForm);
          else updateProduct();
        }}
        thumbnailRef={thumbnailRef}
        imagesRef={imagesRef}
        thumbnailPreview={thumbnailPreview}
        imagesPreview={imagesPreview}
        handleThumbnailChange={handleThumbnailChange}
        handleImagesChange={handleImagesChange}
        handleRemoveThumbnail={handleRemoveThumbnail}
        handleRemoveImage={handleRemoveImage}
      />

      <ProductViewModal
        open={modal === "view"}
        onClose={() => setModal(null)}
        selected={selected}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />

      <ProductDeleteModal
        open={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={deleteProduct}
        selected={selected}
      />
    </>
  );
}

export default ProductPage;
