import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../style/Help.css";

const Slides = [
  {
    image: "./assets/back-1.jpg",
    title: "Akademik",
    subtitle: "Informasi lengkap tentang kurikulum dan kegiatan belajar",
    buttonText: "Selengkapnya",
    buttonLink: "/akademik",
  },
  {
    image: "./assets/back-2.jpg",
    title: "Program",
    subtitle: "Jelajahi beragam program studi yang tersedia",
    buttonText: "Lihat Program",
    buttonLink: "/program",
  },
  {
    image: "./assets/back-3.jpg",
    title: "Fasilitas",
    subtitle: "Fasilitas modern untuk mendukung kegiatan belajar",
    buttonText: "Selengkapnya",
    buttonLink: "/fasilitas",
  },
  {
    image: "./assets/back-4.jpg",
    title: "Pendaftaran",
    subtitle: "Daftar sekarang dan bergabung dengan kami",
    buttonText: "Daftar Sekarang",
    buttonLink: "/pendaftaran",
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      loop={true}
      autoplay={{ delay: 15000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      slidesPerView={1}
      speed={4000}
      className="min-h-screen w-full overflow-hidden"
      effect="fade"
    >
      {Slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-cover bg-center h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute left-0 px-[7%] bottom-48">
              <h1
                className=" text-white font-[Alexandria] "
                style={{ textShadow: "0 10px 20px rgba(0,0,0,0.8)" }}
              >
                {slide.title}
              </h1>
              <h4
                className=" text-white font-[Alexandria] mt-4"
                style={{ textShadow: "0 10px 20px rgba(0,0,0,0.8)" }}
              >
                {slide.subtitle}
              </h4>
              <button className="relative group flex items-center justify-center gap-1 bg-amber-400 text-amber-950 mt-12 py-4 px-4 rounded-4xl font-bold font-[Alexandria] hover:bg-amber-100 transition-all duration-300 hover:px-8 cursor-pointer">
                <i className="ri-circle-fill transition-transform duration-300 scale-100 group-hover:scale-0"></i>
                <span
                  className=" material-symbols-outlined absolute left-5 transition-all duration-300 scale-0 -translate-x-7 group-hover:scale-100 bg-amber-950 text-white rounded-4xl p-1 group-hover:translate-x-2"
                  style={{ fontWeight: "bold" }}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
