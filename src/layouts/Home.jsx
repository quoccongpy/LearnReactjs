import HomeSectionLazy from "../features/home/components/HomeSectionLazy";
import useHome from "../features/home/hooks/useHome";

function Home() {
  const { categories, loading } = useHome();
  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-1/3"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {categories.map((category) => (
        <HomeSectionLazy key={category.id} category={category} />
      ))}
    </div>
  );
}
export default Home;
