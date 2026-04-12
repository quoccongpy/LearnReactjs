import { useEffect, useState } from "react";
import productService from "../services/productService";
import toastService from "../../../../shared/utils/toastService";
import { BASE_URL } from "..//..//..//..//shared//utils//constants";

export default function useProduct({ form }) {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll(
        keyword,
        categoryId,
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

  useEffect(() => {
    fetchProducts();
  }, [pageIndex, categoryId]);

  const openView = async (item) => {
    try {
      const res = await productService.getById(item.id);
      setSelected(res.data);
      setActiveImageIndex(0);
      setModal("view");
    } catch {
      toastService.error("Không thể tải chi tiết");
    }
  };

  const openEdit = async (item) => {
    try {
      setLoading(true);

      const res = await productService.getById(item.id);
      const data = res.data;

      setSelected(data);

      form.setFormData({
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        thumbnail: null,
        images: [],
      });

      form.setOldImages(data.productImagesList || []);
      form.setThumbnailPreview(`${BASE_URL}${data.thumbnail}`);

      const listImages =
        data.productImagesList?.map((img) => `${BASE_URL}${img.imageUrl}`) ||
        [];

      form.setImagesPreview(listImages);

      setModal("edit");
    } catch {
      toastService.error("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (resetForm) => {
    try {
      setLoading(true);
      await productService.create(form.formData);
      toastService.success("Thêm thành công");
      resetForm();
      setModal(null);
      fetchProducts();
    } catch {
      toastService.error("Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    try {
      setLoading(true);

      const dataToSend = {
        ...form.formData,
        listRetainIdsImage: form.oldImages.map((i) => i.id),
      };

      await productService.update(selected.id, dataToSend);

      toastService.success("Cập nhật thành công");
      setModal(null);
      fetchProducts();
    } catch {
      toastService.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const openDelete = (item) => {
    setSelected(item);
    setModal("delete");
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      await productService.delete(selected.id);
      toastService.success("Xóa thành công");
      setModal(null);
      fetchProducts();
    } catch {
      toastService.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
