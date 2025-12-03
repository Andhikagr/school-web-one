import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../locales/index_lang";
import { useTranslation } from "react-i18next";
import "swiper/css";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../style/Help.css";

const Slider = () => {
  const { t, i18n } = useTranslation();
  const translate = t("slider", { returnObjects: true });
  const Dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      loop={true}
      autoplay={{ delay: 15000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      slidesPerView={1}
      speed={4000}
      className=" w-full overflow-hidden"
      effect="fade"
    >
      {translate.slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-cover bg-center h-[400px] w-[800px] flex items-center justify-center overflow-hidden rounded-2xl relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div
              className={`absolute left-0 px-[7%] bottom-10 ${
                Dir === "rtl" ? "right-0 text-right " : "left-0 text-left "
              } `}
            >
              <h1
                className="text-white"
                style={{ textShadow: "0 10px 20px rgba(0,0,0,0.8)" }}
              >
                {slide.title}
              </h1>
              <h4
                className="text-white  mt-2 "
                style={{ textShadow: "0 10px 20px rgba(0,0,0,0.8)" }}
              >
                {slide.subtitle}
              </h4>
              <div
                className={`flex ${
                  Dir === "rtl" ? "justify-end " : "justify-start "
                } `}
              >
                <button className="relative group flex items-center justify-center gap-1 bg-amber-200 text-amber-950 mt-6 py-2 px-4 rounded-4xl font-bold  hover:bg-amber-100 transition-all duration-300 hover:px-5 cursor-pointer">
                  <i className="ri-circle-fill transition-transform duration-300 scale-100 group-hover:scale-0"></i>
                  <span
                    className=" material-symbols-outlined absolute left-5 transition-all duration-300 scale-0 -translate-x-7 group-hover:scale-100 bg-amber-950 text-white rounded-4xl  group-hover:-translate-x-0"
                    style={{ fontSize: "22px" }}
                  >
                    arrow_forward
                  </span>
                  <a
                    href={slide.buttonLink}
                    className="ml-2 group-hover:ml-4 text-amber-950"
                  >
                    {slide.buttonText}
                  </a>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
