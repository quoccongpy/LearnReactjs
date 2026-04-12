import { useRef, useState } from "react";

export default function useProductForm(initialData = null) {
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || "",
    thumbnail: null,
    images: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    initialData?.thumbnail || null,
  );

  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState(
    initialData?.productImagesList || [],
  );

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const preview = files.map((f) => URL.createObjectURL(f));
    setImagesPreview(preview);
  };

  const handleRemoveThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: null,
    }));

    setThumbnailPreview(null);

    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const newPreview = imagesPreview.filter((_, i) => i !== index);
    setImagesPreview(newPreview);

    const newOld = oldImages.filter((_, i) => i !== index);
    setOldImages(newOld);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      thumbnail: null,
      images: [],
    });

    setThumbnailPreview(null);
    setImagesPreview([]);
    setOldImages([]);

    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (imagesRef.current) imagesRef.current.value = "";
  };

  return {
    formData,
    setFormData,
    thumbnailRef,
    imagesRef,
    thumbnailPreview,
    setThumbnailPreview,
    imagesPreview,
    setImagesPreview,
    oldImages,
    setOldImages,
    handleThumbnailChange,
    handleImagesChange,
    handleRemoveThumbnail,
    handleRemoveImage,
    resetForm,
  };
}
