import HomeSectionLazy from "../features/home/components/HomeSectionLazy";
import useHome from "../features/home/hooks/useHome";

function Home() {
  const { categories, loading } = useHome();

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
        <HomeSectionLazy key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Home;
