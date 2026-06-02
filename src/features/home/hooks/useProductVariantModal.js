import { useCallback, useEffect, useMemo, useState } from "react";
import productVariantService from "../../admin/product-variant/services/productVariantService";

export default function useProductVariantModal(product, open) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !product) {
      setVariants([]);
      setSelectedSizeId(null);
      setSelectedVariantId(null);
      setQuantity(1);
      setNote("");
      return;
    }

    const fetchVariants = async () => {
      setLoading(true);
      try {
        const res = await productVariantService.getByProductId(product.id);
        const data = res.data ?? res;
        setVariants(data);
        if (data.length > 0) {
          setSelectedSizeId(data[0].sizeId);
          setSelectedVariantId(data[0].id);
        }
      } catch (err) {
        setError(err);
        setVariants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, [product, open]);

  const sizes = useMemo(() => {
    const sizeMap = new Map();
    variants.forEach((v) => {
      if (!sizeMap.has(v.sizeId)) {
        sizeMap.set(v.sizeId, {
          id: v.sizeId,
          name: v.sizeName,
        });
      }
    });
    return [...sizeMap.values()];
  }, [variants]);

  const filterCrusts = useMemo(() => {
    return variants.filter((v) => v.sizeId == selectedSizeId);
  }, [variants, selectedSizeId]);

  const selectedVariant = useMemo(() => {
    return variants.find((v) => v.id === selectedVariantId) || null;
  }, [variants, selectedVariantId]);

  const displayPrice = useMemo(() => {
    return selectedVariant?.price ?? product?.price ?? 0;
  }, [selectedVariant, product]);

  const totalPrice = useMemo(() => {
    return displayPrice * quantity;
  }, [displayPrice, quantity]);

  const handleSizeChange = useCallback(
    (sizeId) => {
      setSelectedSizeId(sizeId);
      const firstCrustOfSize = variants.find((v) => v.sizeId == sizeId);
      if (firstCrustOfSize) {
        setSelectedVariantId(firstCrustOfSize.id);
      }
    },
    [variants],
  );
  const handleCrustChange = useCallback((variantId) => {
    setSelectedVariantId(variantId);
  }, []);
  const handleQuantityChange = useCallback((delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  const handleNoteChange = useCallback((value) => {
    if (value.length <= 72) {
      setNote(value);
    }
  }, []);
  const hasVariants = variants.length > 0;

  return {
    loading,
    sizes,
    error,
    selectedSizeId,
    filterCrusts,
    selectedVariant,
    displayPrice,
    totalPrice,
    quantity,
    note,
    hasVariants,
    handleSizeChange,
    handleCrustChange,
    handleQuantityChange,
    handleNoteChange,
  };
}
