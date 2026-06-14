import { useState } from "react";
import HomeSectionLazy from "../features/home/components/HomeSectionLazy";
import useHome from "../features/home/hooks/useHome";
import ProductVariantModal from "../features/home/components/ProductVariantModal";
import { useDispatch } from "react-redux";
import { addItem } from "../core/store/slice/cartSlice";
import { toast } from "react-toastify";

function Home() {
  const { categories, loading } = useHome();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const handleProductAdd = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  const handleAddToCart = (cartItemData) => {
    dispatch(addItem(cartItemData));
    toast.success("Đã thêm vào giỏ hàng!");
  };

  if (loading) {
    return (
      <div className="home-loading__content" style={{ padding: "16px" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="home-loading__block" />
        ))}
      </div>
    );
  }

  return (
    <div className="home-content">
      {categories.map((category) => (
        <HomeSectionLazy
          key={category.id}
          category={category}
          onProductAdd={handleProductAdd}
        />
      ))}

      <ProductVariantModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      ></ProductVariantModal>
    </div>
  );
}

export default Home;
