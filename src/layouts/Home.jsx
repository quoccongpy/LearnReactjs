import { useState } from "react";
import HomeSectionLazy from "../features/home/components/HomeSectionLazy";
import useHome from "../features/home/hooks/useHome";
import ProductVariantModal from "../features/home/components/ProductVariantModal";

function Home() {
  const { categories, loading } = useHome();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleProductAdd = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  const handleAddToCart = (orderData) => {
    console.log("Thêm vào giỏ hàng:", orderData);
    // TODO: Tích hợp cart sau
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
      ></ProductVariantModal>
    </div>
  );
}

export default Home;
