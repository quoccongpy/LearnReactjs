import useLazySection from "../hooks/useLazySection";
import { getCategoryBannerImage } from "../utils/categoryImages";
import SkeletonSection from "./SkeletonSection";
import ProductCard from "./ProductCard";

export default function HomeSectionLazy({ category }) {
  const { sectionRef, products, loading, isVisible } = useLazySection(
    category.id,
  );

  const bannerImage = getCategoryBannerImage(category.name);

  return (
    <section
      id={`category-${category.id}`}
      ref={sectionRef}
      className="home-section"
    >
      <h2 className="home-section__title">{category.name}</h2>

      {/* Category Banner */}
      <div className="home-section__banner">
        {bannerImage ? (
          <img
            src={bannerImage}
            alt={category.name}
            className="home-section__banner-img"
          />
        ) : (
          <div className="home-section__banner-content">
            <span className="home-section__banner-text">{category.name}</span>
          </div>
        )}
      </div>

      {(!isVisible || loading) && <SkeletonSection />}

      {isVisible && !loading && products.length > 0 && (
        <div className="home-section__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {isVisible && !loading && products.length === 0 && (
        <p className="home-section__empty">
          Chưa có sản phẩm trong danh mục này
        </p>
      )}
    </section>
  );
}
