import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../locales/index_lang"; // sesuaikan path i18n-mu

const TestimoniCarousel = ({ Dir = "ltr" }) => {
  const { t, i18n } = useTranslation();
  const translate = t("home", { returnObjects: true }) || { testimoni: [] };

  const [move, setMove] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width secara responsif
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLeft = () => {
    if (move < translate.testimoni.length - 1) setMove(move + 1);
  };

  const handleRight = () => {
    if (move > 0) setMove(move - 1);
  };

  // Gap responsive berdasarkan breakpoints
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

  if (!translate.testimoni || translate.testimoni.length === 0) return null;

  return (
    <div className="w-full">
      <div className="relative w-full h-[210px]">
        {translate.testimoni.map((item, index) => {
          let pos, zIndex;

          if (index <= move) {
            pos = `${index * overlap}%`;
            zIndex = index;
          } else {
            pos = `${(index - move) * gap + move * overlap}%`;
            zIndex = index;
          }

          if (hoverIndex === index) zIndex = 50;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="p-5 rounded-2xl bg-gray-50 absolute top-1/2 transform translate-y-[-50%] h-[180px] w-[350px] transition-all duration-500 ease-in-out cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                [Dir === "rtl" ? "right" : "left"]: pos,
                zIndex,
              }}
            >
              <div className="hover:scale-105 flex flex-col transition-transform duration-300 h-full">
                <p>{item.subtitle}</p>
                <h6 className="font-medium text-end mt-auto">{item.title}</h6>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-x-3 self-start mt-6">
        <button
          className={`text-amber-950 flex items-center justify-center rounded-2xl cursor-pointer active:scale-105 ${
            move === translate.testimoni.length - 1
              ? "text-gray-200 cursor-not-allowed"
              : ""
          }`}
          onClick={handleLeft}
          disabled={move === translate.testimoni.length - 1}
        >
          <span className="material-symbols-outlined">
            {Dir === "rtl" ? "arrow_forward_ios" : "arrow_back_ios_new"}
          </span>
        </button>
        <button
          className={`p-4 text-amber-950 flex items-center justify-center rounded-2xl cursor-pointer active:scale-105 ${
            move === 0 ? "text-gray-200 cursor-not-allowed" : ""
          }`}
          onClick={handleRight}
          disabled={move === 0}
        >
          <span className="material-symbols-outlined">
            {Dir === "rtl" ? "arrow_back_ios_new" : "arrow_forward_ios"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TestimoniCarousel;
