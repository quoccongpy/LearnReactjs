import React from 'react';
import { FaFacebook, FaYoutube, FaGooglePlay } from "react-icons/fa";
import { SiGmail } from 'react-icons/si';
import pizzaHutLogo from "../../../assets/logo.svg";

const FOOTER_LINKS = {
  about: {
    title: "Về chúng tôi",
    links: ["Giới thiệu", "Tầm nhìn và sứ mệnh của chúng tôi", "Giá trị cốt lõi", "An toàn thực phẩm", "LIMO", "Cơ hội nghề nghiệp"]
  },
  location: {
    title: "Vị trí cửa hàng",
    links: ["Miền Bắc", "Miền Trung", "Miền Nam"]
  }
};

const Footer = () => {
  return (
    <footer className="bg-[#f2f4f5] py-10 px-6 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-6">
            <div className="w-40">
              <img
                src={pizzaHutLogo}
                alt="Pizza Hut Logo"
                className="w-full h-auto"
              />
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <a
                href="#"
                className="text-blue-600 hover:opacity-80 transition-opacity"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-red-600 hover:opacity-80 transition-opacity"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="text-red-500 hover:opacity-80 transition-opacity"
              >
                <SiGmail />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {FOOTER_LINKS.about.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.about.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {FOOTER_LINKS.location.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.location.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg text-gray-800">Tải ứng dụng</h3>
            <div className="flex flex-col gap-3 w-40">
              <a href="#">
                <img
                  src="https://pizzahut.vn/ch_play.svg"
                  alt="Google Play"
                  className="w-full h-auto rounded-md"
                />
              </a>
              <a href="#">
                <img
                  src="https://pizzahut.vn/apple_store.svg"
                  alt="App Store"
                  className="w-full h-auto rounded-md"
                />
              </a>
            </div>
            <div className="mt-2">
              <a href="http://online.gov.vn/Home/WebDetails/16305?AspxAutoDetectCookieSupport=1">
                <img
                  src="https://pizzahut.vn/certification.svg"
                  alt="Đã thông báo bộ công thương"
                  className="w-48 h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;