import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import "../locales/index_lang";
import { useTranslation } from "react-i18next";

const AutoStackCarousel = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [t, i18next] = useTranslation();
  const translate = t("home", { returnObjects: true });
  const Dir = i18next.language === "ar" ? "rtl" : "ltr";
  const [space, setSpace] = useState(-80);
  const [position, setPosition] = useState("vertical");
  const [width, setWidth] = useState("300px");
  const [view, setView] = useState("auto");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setSpace(-20);
        setPosition("vertical");
        setWidth("300px");
      } else if (window.innerWidth > 1024) {
        setSpace(0);
        setWidth("100%");
        setView("auto");
        setWidth("300px");
        setPosition("vertical");
      } else if (window.innerWidth > 768) {
        setView(2);
        setSpace(20);
        setPosition("horizontal");
        setWidth("100%");
      } else if (window.innerWidth > 640) {
        setView(2);
        setSpace(0);
        setPosition("horizontal");
        setWidth("100%");
      } else {
        setSpace(20);
        setPosition("horizontal");
        setWidth("100%");
        setView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full rounded-2xl  mt-8  ">
      <Swiper
        key={`${position} ${space} ${view} ${width} ${space}`}
        direction={position}
        modules={[Autoplay]}
        spaceBetween={space}
        loop={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        slidesPerView={view}
        speed={16000}
        style={{
          height: "450px",
          width: width,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
      >
        {translate.galeri.map((item, index) => (
          <SwiperSlide key={index} className="px-4">
            <div
              className=" rounded-2xl cursor-pointer  overflow-hidden  flex flex-col  hover:scale-105 transition-all duration-500 ease-in-out h-[420px] lg:h-[400px] "
              style={{ boxShadow: "0 2px 25px rgba(0,0,0,0.1)" }}
              onClick={() => setPreviewImg(item)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover "
              />
              <div
                className={` px-4 py-2 ${
                  Dir === "rtl" ? "text-right" : "text-left"
                }`}
              >
                <p className="font-medium text-amber-950 whitespace-nowrap truncate">
                  {item.title}
                </p>
                <p
                  className={`text-amber-950 flex items-center gap-x-1 mt-1 ${
                    Dir === "rtl" ? "text-right flex-row-reverse" : "text-left "
                  } `}
                >
                  <span class="material-symbols-outlined">date_range</span>
                  {item.date}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* preview */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10000] px-[2%] "
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg.img}
            alt="Preview"
            className="min-w-[40%] min-h-[40%] rounded-2xl shadow-md"
          />
          <div className="p-2 ">
            <h2 className=" font-bold text-white mb-2">{previewImg.title}</h2>
            <p className="text-white flex gap-1 items-end">
              <span className="material-symbols-outlined">date_range</span>
              <span>{previewImg.date}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoStackCarousel;
