import { useEffect, useState } from "react";
import useIntersectionObserver from "../../../shared/hooks/useIntersectionObserver";
import homeService from "../services/homeService";

export default function useLazySection(categoryId, take = 50) {
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin: "300px",
    triggerOnce: true,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isVisible || !categoryId) return;
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await homeService.getProductByCategory(categoryId, take);
        if (!cancelled) {
          setProducts(result.data || []);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [isVisible, categoryId, take]);

  return { sectionRef: ref, products, loading, error, isVisible };
}
