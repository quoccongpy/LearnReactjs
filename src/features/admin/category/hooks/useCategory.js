import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

export default function useCategory() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (err) {
      setError(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data) => {
    return await categoryService.create(data);
  };
  const updateCategory = async (id, data) => {
    return await categoryService.update(id, data);
  };
  const deleteCategory = async (id) => {
    return await categoryService.delete(id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
