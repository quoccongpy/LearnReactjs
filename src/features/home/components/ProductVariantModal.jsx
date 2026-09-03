import { BASE_URL } from "../../../shared/utils/constants";
import { IoAddOutline, IoRemoveOutline, IoCloseOutline } from "react-icons/io5";
import useProductVariantModal from "../hooks/useProductVariantModal";
import { useState } from "react";
import ProductReviewSection from "../../review/components/ProductReviewSection";

export default function ProductVariantModal({
  product,
  open,
  onClose,
  onAddToCart,
}) {
  const {
    loading,
    sizes,
    selectedSizeId,
    filterCrusts,
    selectedVariant,
    totalPrice,
    quantity,
    note,
    hasVariants,
    handleSizeChange,
    handleCrustChange,
    handleQuantityChange,
    handleNoteChange,
  } = useProductVariantModal(product, open);

  const [activeTab, setActiveTab] = useState("order");

  if (!open || !product) return null;

  const imageUrl = product.thumbnail ? `${BASE_URL}${product.thumbnail}` : null;

  const handleSubmit = () => {
    const cartData = {
      productId: product.id,
      productName: product.name,
      thumbnail: product.thumbnail,
      variantId: selectedVariant?.id || null,
      sizeName: selectedVariant?.sizeName || null,
      crustName: selectedVariant?.crustName || null,
      price: selectedVariant?.price || product.price,
      quantity,
      note,
    };
    console.log("Data:", cartData);

    if (onAddToCart) {
      onAddToCart(cartData);
    }
    onClose();
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal__close" onClick={onClose}>
          <IoCloseOutline />
        </button>

        <div className="product-modal__image-section">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="product-modal__image"
            />
          ) : (
            <div className="product-modal__no-image">No image</div>
          )}
        </div>

        <div className="product-modal__content">
          <h2 className="product-modal__name">{product.name}</h2>
          <p className="product-modal__desc">{product.description}</p>

          <div className="product-modal__tabs">
            <button
              className={`product-modal__tab ${activeTab === "order" ? "active" : ""}`}
              onClick={() => setActiveTab("order")}
            >
              Đặt hàng
            </button>
            <button
              className={`product-modal__tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá
            </button>
          </div>

          {activeTab === "order" ? (
            <>
              {loading ? (
                <div className="product-modal__loading">
                  <div className="product-modal__spinner" />
                  <span>Đang tải...</span>
                </div>
              ) : hasVariants ? (
                <>
                  <div className="product-modal__section">
                    <div className="product-modal__size-tabs">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          className={`product-modal__size-tab ${
                            selectedSizeId === size.id
                              ? "product-modal__size-tab--active"
                              : ""
                          }`}
                          onClick={() => handleSizeChange(size.id)}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="product-modal__section">
                    <h3 className="product-modal__section-title">Đế bánh</h3>
                    <div className="product-modal__crust-list">
                      {filterCrusts.map((variant) => (
                        <label
                          key={variant.id}
                          className={`product-modal__crust-item ${
                            selectedVariant?.id === variant.id
                              ? "product-modal__crust-item--selected"
                              : ""
                          }`}
                          onClick={() => handleCrustChange(variant.id)}
                        >
                          <span
                            className={`product-modal__radio ${
                              selectedVariant?.id === variant.id
                                ? "product-modal__radio--active"
                                : ""
                            }`}
                          />
                          <span className="product-modal__crust-name">
                            {variant.crustName} ({variant.sizeName})
                          </span>
                          <span className="product-modal__crust-price">
                            {variant.price?.toLocaleString("vi-VN")} đ
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="product-modal__section">
                    <div className="product-modal__note-header">
                      <h3 className="product-modal__section-title">
                        Ghi chú (tùy chọn)
                      </h3>
                      <span className="product-modal__note-count">
                        {note.length}/72
                      </span>
                    </div>
                    <textarea
                      className="product-modal__note-input"
                      placeholder="Chúng tôi sẽ cố gắng hết sức để phục vụ bạn nếu có thể!"
                      value={note}
                      onChange={(e) => handleNoteChange(e.target.value)}
                      maxLength={72}
                    ></textarea>
                  </div>
                </>
              ) : (
                <div className="product-modal__section">
                  <p className="product-modal__simple-price">
                    Giá: {product.price?.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              )}

              {/* Footer đặt hàng nằm chung trong tab order */}
              <div className="product-modal__footer">
                <div className="product-modal__quantity">
                  <button
                    className="product-modal__qty-btn product-modal__qty-btn--minus"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <IoRemoveOutline />
                  </button>
                  <span className="product-modal__qty-value">{quantity}</span>
                  <button
                    className="product-modal__qty-btn product-modal__qty-btn--plus"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <IoAddOutline />
                  </button>
                </div>
                <button
                  className="product-modal__add-btn"
                  onClick={handleSubmit}
                >
                  Thêm vào giỏ hàng &bull; {totalPrice.toLocaleString("vi-VN")}{" "}
                  đ
                </button>
              </div>
            </>
          ) : (
            <ProductReviewSection productId={product?.id} />
          )}
        </div>
      </div>
    </div>
  );
}
