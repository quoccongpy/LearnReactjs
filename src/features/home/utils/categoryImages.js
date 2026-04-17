import Pizza from "../../../assets/imageCategory/Pizza.png";
import GhienGa from "../../../assets/imageCategory/GhienGa.png";
import KhaiVi from "../../../assets/imageCategory/KhaiVi.png";
import KidsMenu from "../../../assets/imageCategory/KidsMenu.png";
import Menu49k from "../../../assets/imageCategory/Menu49k.png";
import MyBox from "../../../assets/imageCategory/MyBox.png";
import ThucUong from "../../../assets/imageCategory/ThucUong.png";

const IMAGE_MAP = {
  pizza: Pizza,
  "ghiền gà": GhienGa,
  "ghien ga": GhienGa,
  "món khai vị": KhaiVi,
  "mon khai vi": KhaiVi,
  "khai vị": KhaiVi,
  "kids menu": KidsMenu,
  "menu 49k": Menu49k,
  "my box": MyBox,
  "thức uống": ThucUong,
  "thuc uong": ThucUong,
};

export function getCategoryBannerImage(categoryName) {
  if (!categoryName) return null;
  const name = categoryName.toLowerCase().trim();

  if (IMAGE_MAP[name]) return IMAGE_MAP[name];

  for (const [key, img] of Object.entries(IMAGE_MAP)) {
    if (name.includes(key) || key.includes(name)) {
      return img;
    }
  }

  return null;
}
