import { useEffect, useState } from "react";
import productVariantService from "../services/productVariantService";
import sizeService from "../../size/services/sizeService";
import crustService from "../../crust/services/crustService";
import categoryService from "../../category/services/categoryService";
import productService from "../../product/services/productService";

export default function useProductVariant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedProductId, setSelectedProductId] = useState("");

  const [variants, setVariants] = useState([]);

  const [sizes, setSizes] = useState([]);
  const [crusts, setCrusts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [productsHasVariants, setProductsHasVariants] = useState([]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsRes, sizesRes, crustsRes, categoriesRes] =
        await Promise.allSettled([
          productVariantService.getProductsWithVariant(),
          sizeService.getAll(),
          crustService.getAll(),
          categoryService.getAll(),
        ]);
      setProductsHasVariants(productsRes.value.data);
      setSizes(sizesRes.value.data);
      setCrusts(crustsRes.value.data);
      setCategories(categoriesRes.value.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) {
      setProductsByCategory([]);
      return;
    }
    try {
      const res = await productService.getProductByCategory(categoryId, 50);
      setProductsByCategory(res.data || []);
    } catch (err) {
      setError(err);
      setProductsByCategory([]);
    }
  };

  const fetchVariants = async (productId) => {
    if (!productId) {
      setVariants([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await productVariantService.getByProductId(productId);
      setVariants(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const createVariant = async (data) => {
    return await productVariantService.create(data);
  };
  const updateVariant = async (id, data) => {
    return await productVariantService.update(id, data);
  };
  const deleteVariant = async (id) => {
    return await productVariantService.delete(id);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchVariants(selectedProductId);
  }, [selectedProductId]);
  return {
    loading,
    error,
    selectedProductId,
    setSelectedProductId,
    variants,
    categories,
    sizes,
    crusts,
    productsByCategory,
    productsHasVariants,
    fetchProductsByCategory,
    fetchVariants,
    createVariant,
    updateVariant,
    deleteVariant,
  };
}
