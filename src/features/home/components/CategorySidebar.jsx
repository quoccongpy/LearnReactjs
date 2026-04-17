import reactLogo from "../../../assets/react.svg";
import { getCategoryBannerImage } from "../utils/categoryImages";

export default function CategorySidebar({ categories, activeId, onSelect }) {
  return (
    <nav className="category-sidebar">
      <ul className="category-sidebar__list">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          const catImage = getCategoryBannerImage(cat.name) || reactLogo;
          return (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.id)}
                className={`category-sidebar__item ${isActive ? "category-sidebar__item--active" : ""}`}
              >
                <img
                  src={catImage}
                  alt={cat.name}
                  className="category-sidebar__icon"
                />
                <span className="category-sidebar__label">{cat.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
