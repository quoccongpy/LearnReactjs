import useLazySection from "../hooks/useLazySection";
import SkeletonSection from "./SkeletonSection";
import VirtualProductList from "./VirtualProductList";
export default function HomeSectionLazy({ category }) {
  const { sectionRef, products, loading, isVisible } = useLazySection(
    category.id,
  );

  return (
    <section ref={sectionRef} className="py-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h2>
      {(!isVisible || loading) && <SkeletonSection></SkeletonSection>}

      {isVisible && !loading && products.length > 0 && (
        <VirtualProductList products={products}></VirtualProductList>
      )}

      {isVisible && !loading && products.length === 0 && (
        <p className="text-gray-400 text-sm italic">
          Chưa có sản phẩm trong danh mục này
        </p>
      )}
    </section>
  );
}
