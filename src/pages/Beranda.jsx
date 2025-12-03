import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { useTranslation } from "react-i18next";
import "../locales/index_lang";
import AutoStackCarousel from "../components/GalleryData";
import { div, img, section } from "framer-motion/client";
import CountUp from "react-countup";
import IndonesiaMap from "../components/Maps";
import Footer from "../components/Footer";
import ButtonOne from "../components/ButtonOne";
import TestimoniCarousel from "../components/TestimoniCarousel";

const Beranda = () => {
  const [t, i18n] = useTranslation();
  const translate = t("home", { returnObjects: true });
  const Dir = i18n.language === "ar" ? "rtl" : "ltr";
  const [move, setMove] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const handleLeft = () => {
    if (move < translate.testimoni.length - 1) setMove(move + 1);
  };

  const handleRight = () => {
    if (move > 0) setMove(move - 1);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hitung gap berdasarkan Tailwind breakpoints
  const gap =
    windowWidth < 640
      ? 120
      : windowWidth < 768
      ? 80
      : windowWidth < 1024
      ? 50
      : windowWidth < 1280
      ? 40
      : 30;

  const overlap = 1;

  const [openUnit, setOpenUnit] = useState(0);
  const activeUnit = translate.section_unit.deskripsi[openUnit];

  const [activeLife, setActiveLife] = useState(0);
  const activeItem = translate.gallery_activity[activeLife];

  return (
    <section className="overflow-hidden ">
      <main className=" px-[7%] pt-40 pb-10 ">
        <div
          className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] p-9 gap-10 rounded-2xl "
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <Slider />
          <div
            className={`text-amber-950 items-center flex flex-col justify-center
            ${Dir === "rtl" ? "text-right" : "text-left"}
            `}
          >
            <h1>{translate.section_title}</h1>
            <p className="text-justify leading-6  mt-2">
              {translate.section_profile.deskripsi}
            </p>
          </div>
        </div>
      </main>

      {/* section profile */}
      <section className="py-5 px-[7%] flex gap-10  items-top items-center justify-center">
        <div
          className="  flex items-center justify-center flex-col text-amber-950 p-9 w-full rounded-2xl"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <h3 className="whitespace-nowrap mb-2 ">
            {translate.section_profile.judul}
          </h3>
          <h6 className="mb-2 text-center ">
            {translate.section_profile.subjudul}
          </h6>
          <span className="mt-3 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-20"></span>
          <span className="-mt-1 w-[70%] mx-auto border-b-2 border-gray-200 z-10"></span>

          <div
            className="w-full max-w-4xl mt-8 rounded-2xl aspect-video"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
          >
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/7-Qf3g-0xEI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-col items-center mt-6">
            <h6 className="font-bold">{translate.section_profile.leader}</h6>
            <h6>({translate.section_profile.position})</h6>
          </div>
        </div>
      </section>

      {/* reason */}
      <section className="py-5 grid grid-cols-1 px-[7%] xl:grid-cols-[3fr_1fr]  text-amber-950 gap-x-10 gap-y-4 place-items-start">
        <div
          className="rounded-2xl p-9 flex flex-col "
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex flex-col justify-center items-center relative w-full">
            <h3>{translate.section_reason.judul}</h3>
            <span className="mt-3 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-20"></span>
            <span className="-mt-1 w-[70%] mx-auto border-b-2 border-gray-200 z-10"></span>
            <h6 className="mt-5 text-center">
              {translate.section_reason.subjudul}
            </h6>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 ">
            {translate.features.map((item, index) => (
              <div
                key={index}
                className={`flex-1  rounded-2xl px-12 py-6 h-auto relative border-amber-100 border-b-4 ${
                  Dir === "rtl" ? "border-r-4" : "border-l-4"
                } `}
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
              >
                <h6
                  className={`font-semibold ${
                    Dir === "rtl" ? "text-right " : "text-left "
                  }`}
                >
                  {item.title}
                </h6>
                <p
                  className={` mt-2 ${
                    Dir === "rtl" ? "text-right " : "text-left"
                  }`}
                >
                  {item.subtitle}
                </p>
                <div
                  className={`absolute -top-5  bg-amber-100 rounded-full p-2 flex items-center justify-center ${
                    Dir === "rtl" ? "-right-5 " : "-left-5"
                  } `}
                >
                  <img src={item.icon} alt="" className="w-9 h-9" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex-row flex xl:flex-col gap-10   items-center justify-center  p-4 rounded-2xl flex-1"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <img src="./assets/akre.png" alt="" className="w-[22%] xl:w-[50%]" />
          <img src="./assets/sra.png" alt="" className="w-[22%] xl:w-[50%]" />
          <img src="./assets/kur.png" alt="" className="w-[22%] xl:w-[50%]" />
        </div>
      </section>

      {/* section unit pendidikan */}
      <section className="py-5 px-[7%] grid-cols-1 lg:grid-cols-2 grid xl:grid-cols-[2fr_1fr] gap-x-10 gap-y-5 ">
        <div
          className=" flex flex-col flex-wrap items-center text-amber-950 rounded-2xl p-9"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <h3>{translate.section_unit.judul}</h3>
          <span className="mt-3 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-20"></span>
          <span className="-mt-1 w-[70%] mx-auto border-b-2 border-gray-200 z-10"></span>
          <h6 className="mt-3 text-center ">
            {translate.section_unit.subjudul}
          </h6>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8 rounded-2xl ">
            {translate.section_unit.deskripsi.map((item, index) => {
              const isActive = index === openUnit;
              return (
                <button
                  key={index}
                  onClick={() => setOpenUnit(index)}
                  className={`flex flex-col items-center justify-center  rounded-4xl text-center cursor-pointer  hover:scale-105 transition-all duration-500 ease-in-out p-4 ${
                    isActive ? "bg-amber-50" : "bg-gray-50"
                  }`}
                  style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
                >
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt="preview"
                      className="w-20 h-20 object-contain  "
                    />
                  )}
                  <p className="truncate w-full ">{item.program}</p>
                </button>
              );
            })}
          </div>
        </div>
        {/* box left */}
        <div className="flex flex-col h-fit cursor-default">
          <div
            className={`py-5 px-5  rounded-2xl mb-5 flex gap-x-2 w-full h-full items-center justify-center  flex-col `}
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
          >
            <h6 key={openUnit} className="text-amber-950 font-medium   ">
              {activeUnit.kepsek}
            </h6>
            <p className="text-amber-950  whitespace-nowrap">
              ({translate.section_unit.position})
            </p>
          </div>

          <div
            className="px-5 py-5 rounded-2xl  overflow-hidden "
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
          >
            <div
              className={`flex gap-2 ${
                Dir === "rtl" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <h6 className="text-amber-950 font-medium ">
                {translate.section_unit.subtitle}
              </h6>
              <h6 className="text-amber-950 font-medium">
                {activeUnit.program}
              </h6>
            </div>

            {/* gambar */}
            <div
              key={openUnit}
              className="grid grid-cols-2 gap-6  mt-4 cursor-pointer"
            >
              {activeUnit.fasilitas.slice(0, 4).map((src, i) => (
                <div
                  key={src}
                  className="w-full h-[150px] opacity-0 animate-fadeIn overflow-hidden"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-full h-full 
             object-center rounded-2xl transition-all duration-500 hover:scale-120"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumnus & Gallery */}
      <section className="min-h-screen py-5 px-[7%] flex flex-col w-full text-amber-950  ">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 w-full h-full place-items-center">
          <div className="flex flex-col gap-y-5  relative w-full rounded-2xl h-full ">
            <div
              className="  items-center relative w-full  h-fit rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="p-9 items-center relative flex flex-col">
                <h3>{translate.section_alumni.judul}</h3>
                <span className=" mt-3 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-40"></span>
                <span className="-mt-1 w-[70%] mx-auto border-b-2 border-gray-200 z-10"></span>
                <h6 className="mt-3 text-center">
                  {translate.section_alumni.subjudul}
                </h6>
                <div
                  className={` flex flex-col mt-8  ${
                    Dir === "rtl" ? " self-end " : "self-start"
                  }`}
                >
                  <h6
                    className={`font-semibold ${
                      Dir === "rtl" ? " text-right " : "text-left"
                    }`}
                  >
                    {translate.alumni_campus}
                  </h6>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 ${
                      Dir === "rtl" ? " [direction:rtl] " : "[direction:ltr]"
                    }`}
                  >
                    {translate.campus.map((item, index) => (
                      <div
                        key={index}
                        className={`  mt-4 rounded-xl p-4 flex  gap-x-5 items-center cursor-default relative group overflow-hidden ${
                          Dir === "rtl" ? " text-right " : "text-left"
                        }`}
                        style={{
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <div
                          className={`opacity-0 pointer-events-none absolute inset-0  from-gray-50 to-gray-50 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%] transition-all duration-400 z-40 ${
                            Dir === "rtl"
                              ? "bg-gradient-to-l"
                              : "bg-gradient-to-r"
                          }`}
                        ></div>
                        {item.img && (
                          <img
                            src={item.img}
                            className="w-20 h-20 z-50"
                            alt="kampus"
                          />
                        )}
                        <div
                          className={`flex flex-col z-50 ${
                            Dir === "rtl" ? " text-right" : "text-left"
                          }`}
                        >
                          <p>
                            {item.number} {translate.accept}
                          </p>
                          <p>{item.name}</p>
                          <p className="text-xs">{item.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* box left end */}
          <div
            className="p-9 rounded-2xl overflow-hidden text-amber-950 h-[575px] w-full lg:w-[400px]"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
          >
            <div
              className={`flex flex-col w-full ${
                Dir === "rtl" ? "items-end" : "items-start"
              } `}
            >
              <h5>{translate.section_gallery.judul}</h5>

              <h6>{translate.section_gallery.subjudul}</h6>
              <AutoStackCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* section testimonial*/}
      <section className="px-[7%] pb-5 text-amber-950">
        <div
          className="w-full h-full  p-9 rounded-2xl relative flex flex-col items-center overflow-hidden"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <div
            className={` flex ${Dir === "rtl" ? " self-end " : "self-start"}`}
          >
            <h6 className="font-semibold ">{translate.testimoni_title}</h6>
          </div>
          <TestimoniCarousel Dir={Dir} />
        </div>
      </section>

      {/* maps */}
      <section className="py-5 px-[7%]">
        <div
          className="p-9 rounded-2xl"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <IndonesiaMap />
        </div>
      </section>

      {/* galeri kegiatan */}
      <section className="px-[7%]  py-5 ">
        <div
          className="flex flex-col text-amber-950 items-center p-9 relative rounded-2xl"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <h3>{translate.task.title}</h3>
          <span className="mt-3 w-36 mx-auto border-b-[7.5px] border-amber-900 rounded-2xl z-20"></span>
          <span className="-mt-1 w-[70%] mx-auto border-b-2 border-gray-200 z-10"></span>
          <h6 className="mt-3 text-center">{translate.task.subtitle}</h6>
          <div className="flex flex-col mt-8 gap-10 justify-center items-center">
            <div className="flex flex-col  md:flex-row gap-6 flex-wrap self-center rounded-2xl h-fit w-fit ">
              {translate.gallery_activity.map((item, index) => (
                <ButtonOne
                  textColor="text-white"
                  fromColor="from-amber-950"
                  toColor="to-amber-950"
                  key={index}
                  bgBase="bg-amber-900"
                  onClick={() => setActiveLife(index)}
                  className="py-2 px-4 rounded-2xl  cursor-pointer z-20 flex items-center justify-center"
                  style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
                >
                  <p className="z-20 ">{item.label}</p>
                </ButtonOne>
              ))}
            </div>
            {/* gambar */}
            <div
              key={activeLife}
              className="grid-cols-1 grid overflow-y-auto md:overflow-y-visible scrollbar-hide md:grid-cols-2 gap-6  rounded-2xl w-full h-fit xl:grid-cols-4  "
             >
              {activeItem.gmb.map((src, i) => (
                <div
                  key={src}
                  className="w-full h-[200px] opacity-0 animate-fadeIn overflow-hidden rounded-2xl"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="w-full h-full
             object-center  transition-all duration-500 hover:scale-120 cursor-pointer"
                    onClick={() => setPreviewImg({ gmb: src })}
                  />
                </div>
              ))}
              {/* preview */}
              {previewImg && (
                <div
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10000] px-[14%] py-20 "
                  onClick={() => setPreviewImg(null)}
                >
                  <img
                    src={previewImg.gmb}
                    alt="Preview"
                    className="w-[100%] h-[100%] rounded-2xl shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Beranda;
