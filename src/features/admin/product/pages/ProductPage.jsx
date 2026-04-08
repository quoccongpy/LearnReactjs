import { useEffect, useRef, useState } from "react";
import LoadingOverlay from "../../../../shared/components/LoadingOverlay";
import {
  IoAddOutline,
  IoCloseOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import categoryService from "../../category/services/categoryService";
import toastService from "../../../../shared/utils/toastService";
import productService from "../services/productService";
import { BASE_URL } from "../../../../shared/utils/constants";

function ProductPage() {
  const [loading, setLoading] = useState(false);
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [categories, setcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    thumbnail: null,
    images: [],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      thumbnail: null,
      images: [],
      listRetainIdsImage: [],
    });

    setThumbnailPreview(null);
    setImagesPreview([]);

    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (imagesRef.current) imagesRef.current.value = "";
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    if (!files) return;

    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setImagesPreview(previewUrls);
  };

  const handleRemoveThumbnail = () => {
    setThumbnailPreview(null);

    setFormData({
      ...formData,
      thumbnail: null,
    });

    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = imagesPreview.filter((_, i) => i !== index);
    const newOldImages = oldImages.filter((_, i) => i !== index);

    setImagesPreview(newImages);
    setOldImages(newOldImages);
  };
  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setcategories(res.data);
    } catch {
      toastService.error("Không thể tải danh mục");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll(
        keyword,
        selectedCategoryId,
        pageIndex,
        pageSize,
      );
      setProducts(res.data?.results || []);
      setPageCount(Math.ceil((res.data?.rowCount || 0) / pageSize));
    } catch {
      toastService.error("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = async (item) => {
    try {
      setLoading(true);
      const res = await productService.getById(item.id);
      setSelected(res.data);
      setActiveImageIndex(0);
      setOpenModal("view");
    } catch {
      toastService.error("Không thể tải chi tiết sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pageIndex, selectedCategoryId]);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setPageIndex(1);
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchProducts();
  };

  const addPerfommance = async () => {
    try {
      setLoading(true);
      await productService.create(formData);
      toastService.success("Thêm sản phẩm thành công!");
      resetForm();
      setOpenModal(null);
      fetchProducts();
    } catch (error) {
      toastService.error(error.response?.data || "Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };
  const editPerfommance = async () => {
    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        listRetainIdsImage: oldImages.map((img) => img.id),
      };
      await productService.update(selected.id, dataToSend);
      toastService.success("Cập nhật thành công!");
      setOpenModal(null);
      fetchProducts();
    } catch (error) {
      toastService.error(error.response?.data || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const deletePerfommance = async () => {
    try {
      setLoading(true);
      await productService.delete(selected.id);
      toastService.success("Xóa thành công!");
      setOpenModal(null);
      fetchProducts();
    } catch (error) {
      toastService.error(error.response?.data?.message || "Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>

          <div className="mb-4"></div>
          <button
            onClick={() => {
              resetForm();
              setOpenModal("add");
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            Thêm sản phẩm
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 min-w-[300px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
          />

          <select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837] min-w-[180px]"
          >
            <option value="">Danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="px-5 py-2.5 bg-[#E31837] text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <br></br>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 font-semibold w-16">STT</th>
              <th className="px-4 py-3 font-semibold w-20">Ảnh</th>
              <th className="px-4 py-3 font-semibold">Tên sản phẩm</th>
              <th className="px-4 py-3 font-semibold">Giá</th>
              <th className="px-4 py-3 font-semibold">Danh mục</th>
              <th className="px-4 py-3 font-semibold text-center w-40"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-500">
                  {" "}
                  {(pageIndex - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={`${BASE_URL}${item.thumbnail}`}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {Number(item.price).toLocaleString("vi-VN")}đ
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.categoryName}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        openViewModal(item);
                      }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                      <IoEyeOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);

                          const res = await productService.getById(item.id);
                          const data = res.data;

                          setSelected(data);

                          setFormData({
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            categoryId: data.categoryId,
                            thumbnail: null,
                            images: [],
                          });
                          setOldImages(data.productImagesList || []);
                          setThumbnailPreview(`${BASE_URL}${data.thumbnail}`);

                          const listImages =
                            data.productImagesList?.map(
                              (img) => `${BASE_URL}${img.imageUrl}`,
                            ) || [];
                          setImagesPreview(listImages);
                          setOpenModal("edit");
                        } catch {
                          toastService.error("Không thể tải dữ liệu sản phẩm");
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                    >
                      <IoPencilOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal("delete");
                      }}
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

      {pageCount > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pageIndex === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <IoChevronBackOutline className="w-4 h-4">
              Trước
            </IoChevronBackOutline>
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setPageIndex(page)}
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
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= pageCount}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pageIndex >= pageCount
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <IoChevronForwardOutline className="w-4 h-4">
              Sau
            </IoChevronForwardOutline>
          </button>
        </div>
      )}
      {pageCount > 0 && (
        <p className="text-center text-sm text-gray-400 mt-2">
          Trang {pageIndex} / {pageCount}
        </p>
      )}
      {(openModal === "add" || openModal === "edit") && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {openModal === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên..."
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                ></input>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá tiền
                </label>
                <input
                  type="number"
                  placeholder="0"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                ></input>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={formData.categoryId}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  placeholder="Nhập mô tả..."
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh thumbnail
                </label>
                <input
                  type="file"
                  ref={thumbnailRef}
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full text-sm text-gray-500 
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
                ></input>
                {thumbnailPreview && (
                  <div className="relative w-fit mt-2 group">
                    <img
                      src={thumbnailPreview}
                      className="w-28 h-28 object-cover rounded-xl border shadow"
                    />

                    {/* nút x */}
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh sản phẩm (nhiều ảnh)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={imagesRef}
                  multiple
                  onChange={handleImagesChange}
                  className="block w-full text-sm text-gray-500 
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                           file:bg-green-50 file:text-green-700
                           hover:file:bg-green-100"
                />
                {imagesPreview.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {imagesPreview.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          key={index}
                          src={img}
                          className="w-full h-40 object-contain rounded-lg border bg-gray-100"
                        />

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

      {openModal === "view" &&
        (() => {
          const allImages = [
            ...(selected?.thumbnail
              ? [{ id: "thumb", imageUrl: `${BASE_URL}${selected.thumbnail}` }]
              : []),
            ...(selected?.productImagesList?.map((img) => ({
              ...img,
              imageUrl: `${BASE_URL}${img.imageUrl}`,
            })) || []),
          ];
          const stripImages = allImages.filter((img) => img.id !== "thumb");
          const currentImage = allImages[activeImageIndex];
          return (
            <div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
              onClick={() => setOpenModal(null)}
            >
              <div
                className="bg-white rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Chi tiết sản phẩm
                  </h3>
                  <button
                    onClick={() => setOpenModal(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <IoCloseOutline className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {allImages.length > 0 && (
                    <div>
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={currentImage?.imageUrl}
                          alt={selected?.name}
                          className="w-full h-72 object-contain"
                        />
                        {activeImageIndex > 0 && (
                          <button
                            onClick={() =>
                              setActiveImageIndex(activeImageIndex - 1)
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
                          >
                            <IoChevronBackOutline className="w-5 h-5 text-gray-700" />
                          </button>
                        )}
                        {activeImageIndex < allImages.length - 1 && (
                          <button
                            onClick={() =>
                              setActiveImageIndex(activeImageIndex + 1)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
                          >
                            <IoChevronForwardOutline className="w-5 h-5 text-gray-700" />
                          </button>
                        )}
                        <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {activeImageIndex + 1}/{allImages.length}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                        {stripImages.map((img, index) => (
                          <button
                            key={img.id}
                            onClick={() =>
                              setActiveImageIndex(allImages.indexOf(img))
                            }
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                              index === activeImageIndex
                                ? "border-[#E31837]"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <img
                              src={img.imageUrl}
                              alt={`Ảnh ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Tên</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selected?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Giá</p>
                    <p className="text-sm font-medium text-gray-800">
                      {Number(selected?.price).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">
                      Danh mục
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {selected?.categoryName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">
                      Mô tả
                    </p>
                    <p className="text-sm text-gray-600">
                      {selected?.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end px-6 py-4 border-t border-gray-100">
                  <button
                    onClick={() => setOpenModal(null)}
                    className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

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
              Bạn có chắc muốn xóa sản phẩm
            </p>
            <p className="font-semibold text-gray-800 mb-6">
              "{selected?.name}"?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setOpenModal(null)}
                className="px-5 py-2.5 text-sm border border-gray-200 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={deletePerfommance}
                className="px-5 py-2.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
