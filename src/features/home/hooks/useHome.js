import { useEffect, useState } from "react";
import homeService from "../services/homeService";
import toastService from "../../../shared/utils/toastService";

export default function useHome() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await homeService.getAllCategories();
        setCategories(res.data || []);
      } catch {
        toastService.error("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  return { categories, loading };
}
