import { BASE_URL } from "../../../shared/utils/constants";
import { IoAddOutline } from "react-icons/io5";

export default function ProductCard({ product }) {
  const imageUrl = product.thumbnail ? `${BASE_URL}${product.thumbnail}` : null;

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="product-card__image"
          />
        ) : (
          <div className="product-card__no-image">No image</div>
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__price-row">
          <div>
            <span className="product-card__price-label">Chỉ từ</span>
            <p className="product-card__price">
              {product.price?.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <button className="product-card__add-btn" aria-label="Thêm vào giỏ">
            <IoAddOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
