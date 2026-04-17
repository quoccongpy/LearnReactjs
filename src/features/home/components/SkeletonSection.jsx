export default function SkeletonSection() {
  return (
    <div className="skeleton-section">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__image" />
          <div className="skeleton-card__info">
            <div className="skeleton-card__line skeleton-card__line--long" />
            <div className="skeleton-card__line skeleton-card__line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}
