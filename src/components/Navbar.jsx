import React, { useState, useRef, useEffect } from "react";
import { Translation, useTranslation } from "react-i18next";
import "../locales/index_lang";
import i18n from "../locales/index_lang";
import { Link } from "react-router-dom";

const Navbar = () => {
  // translate
  const { t, i18n } = useTranslation();
  const translate = t("navbar", { returnObjects: true });
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  const Dir = i18n.language === "ar" ? "rtl" : "ltr";

  // format tanggal dan waktu
  const [time, setTime] = useState(new Date());
  const formatDate = (date) => {
    return date.toLocaleDateString(
      i18n.language === "ar"
        ? "ar-SA"
        : i18n.language === "en"
        ? "en-US"
        : "id-ID",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };
  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // search
  const [openSearch, setOpenSearch] = React.useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (Event) => {
      if (searchRef.current && !searchRef.current.contains(Event.target)) {
        setOpenSearch(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    if (openSearch) inputRef.current?.focus();
  }, [openSearch]);

  // mobile
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [openSubMobile, setOpenSubMobile] = useState(false);

  // open submenu
  const [openSub, setOpenSub] = React.useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(Event.target)) {
        setOpenSub(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [hoveredMenu, setHoveredMenu] = React.useState(null);

  // header effect
  const [showTopBar, setShowTopBar] = React.useState(() => window.scrollY > 0);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  // set posisi awal topbar sesuai scroll
  useEffect(() => {
    const initialScroll = window.scrollY;
    if (initialScroll === 0) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const threshold = window.innerHeight * 0.05;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const diff = currentScroll - lastScrollY.current;
          if (currentScroll === 0) {
            setShowTopBar(false);
          } else if (currentScroll < threshold) {
            setShowTopBar(false);
          } else {
            if (diff > 10) {
              setShowTopBar(true);
            }
            if (diff < -10) {
              setShowTopBar(false);
            }
          }
          lastScrollY.current = currentScroll;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 w-full bg-white z-[9999] ">
        <div className="fixed bg-amber-950 w-full text-white px-[2%] flex justify-between transition-all duration-800 ease-in-out z-40 h-[40px]  ">
          <div className="flex gap-x-4 py-3">
            <span className="hidden lg:flex  items-center gap-x-2 text-sm ">
              <span className="material-symbols-outlined">calendar_today</span>
              {formatDate(time)}
            </span>
            <span className="hidden xl:flex items-center gap-x-2 text-sm ">
              <span className="material-symbols-outlined">pace</span>
              {formatTime(time)}
            </span>
          </div>
          <div className="flex 2xl:flex gap-x-1 items-center ml-auto">
            <button
              className={`cursor-pointer text-sm  ${
                i18n.language === "id"
                  ? "bg-amber-50 px-1 rounded-md text-amber-950"
                  : ""
              } `}
              onClick={() => toggleLang("id")}
            >
              ID
            </button>
            <button
              className={`cursor-pointer text-sm  ${
                i18n.language === "en"
                  ? "bg-amber-50 px-1 rounded-md text-amber-950"
                  : ""
              } `}
              onClick={() => toggleLang("en")}
            >
              Eng
            </button>
            <button
              className={`cursor-pointer text-sm  ${
                i18n.language === "ar"
                  ? "bg-amber-50 px-1 rounded-md text-amber-950"
                  : ""
              } `}
              onClick={() => toggleLang("ar")}
            >
              Ar
            </button>
            <i
              className="ri-facebook-fill cursor-pointer hover:text-amber-600"
              style={{ fontSize: "20px" }}
            ></i>
            <i
              className="ri-instagram-fill cursor-pointer hover:text-amber-600"
              style={{ fontSize: "20px" }}
            ></i>
            <i
              className="ri-youtube-fill cursor-pointer hover:text-amber-600"
              style={{ fontSize: "20px" }}
            ></i>
            <button
              className="flex items-center cursor-pointer hover:text-amber-600"
              ref={searchRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenSearch(!openSearch);
              }}
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
        {/* navbar */}
        <div
          className={`fixed bg-white z-50 transition-all duration-300 ease-in-out w-full ${
            showTopBar ? "translate-y-0  " : "translate-y-[40px]   "
          }`}
        >
          <nav className="relative flex items-center justify-between shadow-theme  h-[65px] w-full z-50 px-[7%]">
            {/* menu hover*/}
            <ul
              className={`hidden ml-auto lg:grid grid-cols-2 gap-x-6 pr-6 xl:flex font-medium flex-wrap text-amber-950 justify-end ${
                Dir === "rtl" ? "justify-items-end" : "justify-items-start"
              }`}
            >
              {translate.menu.slice(0, 4).map((item) => (
                <li
                  key={item.text}
                  className="relative w-fit h-fit"
                  onMouseEnter={() => setHoveredMenu(item.text)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  {/* Parent */}
                  <div className="flex items-center justify-between cursor-pointer ">
                    {item.href ? (
                      <Link to={item.href} className="block">
                        {item.text}
                      </Link>
                    ) : (
                      <span>{item.text}</span>
                    )}
                    {item.children.length > 0 && (
                      <span
                        className={`material-symbols-outlined ml-1 transition-transform duration-300 ${
                          hoveredMenu === item.text ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        arrow_drop_down
                      </span>
                    )}
                  </div>
                  {item.children.length > 0 && hoveredMenu === item.text && (
                    <div className="absolute top-full  left-0 w-full h-3 bg-transparent"></div>
                  )}

                  {/* Submenu */}
                  {item.children.length > 0 && (
                    <div
                      className={`absolute top-full  mt-3 bg-white shadow-md rounded-md overflow-hidden transition-all duration-500 border-b-8 border-amber-800 z-50 w-72 transform origin-top ${
                        Dir === "rtl" ? "right-0" : "left-0"
                      }
            ${
              hoveredMenu === item.text
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
                    >
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.text}>
                            <Link
                              to={child.href}
                              className={`block px-4 py-3 text-amber-950 hover:bg-amber-50 whitespace-nowrap ${
                                i18n.language === "ar"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {child.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* navbar logo */}
            <div
              className={`w-[225px] md:w-[250px] flex shrink-0  px-4 -mt-8 bg-white rounded-4xl transition-transform duration-500 ease-in-out  ${
                showTopBar ? "mt-8 py-1  scale-90" : " py-2  mt-0 scale-100"
              }`}
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              <img src="./assets/logo.png" alt="" />
            </div>
            {/* menu hover*/}
            <ul
              className={`hidden mr-auto  lg:grid grid-cols-2 gap-x-6 pl-6 xl:flex font-medium flex-wrap text-amber-950  `}
            >
              {translate.menu.slice(4).map((item) => (
                <li
                  key={item.text}
                  className="relative w-fit h-fit"
                  onMouseEnter={() => setHoveredMenu(item.text)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  {/* Parent */}
                  <div className="flex items-center cursor-pointer ">
                    <span>{item.text}</span>
                    {item.children.length > 0 && (
                      <span
                        className={`material-symbols-outlined ml-1 transition-transform duration-300 ${
                          hoveredMenu === item.text ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        arrow_drop_down
                      </span>
                    )}
                  </div>
                  {item.children.length > 0 && hoveredMenu === item.text && (
                    <div className="absolute top-full left-0 w-full h-3 bg-transparent"></div>
                  )}

                  {/* Submenu */}
                  {item.children.length > 0 && (
                    <div
                      className={`absolute ${
                        Dir === "rtl" ? "right-0" : "left-0"
                      } top-full  mt-3 bg-white shadow-md rounded-md overflow-hidden transition-all duration-500 border-b-8 border-amber-800 z-50 w-72 transform origin-top
            ${
              hoveredMenu === item.text
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
                    >
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.text}>
                            <a
                              href={child.href}
                              className={`block px-4 py-3 text-amber-950 hover:bg-amber-50 whitespace-nowrap ${
                                i18n.language === "ar"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {child.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <button
              className="block cursor-pointer lg:hidden"
              onClick={() => setShowDrawer(!showDrawer)}
            >
              <span className="material-symbols-outlined bg-amber-950 p-2 text-white rounded-lg">
                {showDrawer ? "close" : "menu"}
              </span>
            </button>
          </nav>
        </div>

        {/* mobile */}
        <div
          className={`fixed top-0 left-0 w-[80%] h-full bg-white z-50 shadow-xl transform transition-transform duration-500 ease-in-out flex flex-col overflow-y-auto scrollbar-hide lg:hidden   ${
            showDrawer ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-full pt-6 flex justify-center items-center">
            <img src="./assets/logo.png" className="w-[250px]" alt="" />
          </div>

          <ul className="flex flex-col mt-6 font-medium text-amber-950 cursor-pointer">
            {translate.menu.map((item) => (
              <li key={item.text}>
                <div
                  className="w-full hover:bg-amber-100 flex items-center justify-between pl-6 py-4 pr-6 relative  "
                  onClick={() =>
                    setOpenSubMobile(
                      openSubMobile === item.text ? false : item.text
                    )
                  }
                >
                  <span>{item.text}</span>
                  {item.children.length > 0 && (
                    <span
                      className={`material-symbols-outlined ml-1 transition-transform duration-300
                        ${Dir === "rtl" ? "order-first" : ""} 
                      ${
                        openSubMobile === item.text ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      arrow_drop_down
                    </span>
                  )}
                  <span className="absolute bottom-0 left-6 right-6 border-b-2 border-gray-200"></span>
                </div>

                <ul
                  className={`overflow-hidden transition-transform ease-in-out  ${
                    openSubMobile === item.text
                      ? "max-h-96 duration-1000"
                      : "max-h-0 duration-300"
                  }`}
                >
                  {item.children.map((child) => (
                    <li key={child.text} className="relative">
                      <a
                        href={child.href}
                        className={`block py-3 text-[13px] bg-gray-100 hover:bg-amber-50 ${
                          Dir === "rtl" ? "text-right pr-8" : "text-left pl-8"
                        }`}
                      >
                        {child.text}
                      </a>
                      <span className="absolute bottom-0 left-6 right-6 border-b-2 border-gray-200"></span>
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </li>
            ))}
          </ul>
        </div>
      </header>
      {/* searchbar */}
      <div
        ref={searchRef}
        className={`fixed w-[450px] top-30 md:top-40 xl:top-12 right-6  md:w-[500px] h-auto  bg-gray-100  rounded-xl transition-all duration-300 ease-in-out flex gap-x-4 z-[10000]  ${
          openSearch
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
      >
        <input
          type="text"
          placeholder={t(translate.search)}
          className="w-[500px] h-[50px] text-amber-950  border border-gray-200 rounded-lg px-4 py-2 outline-gray-200 bg-white relative overflow-hidden"
        />
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 w-[75px] right-0 pr-1 text-white cursor-pointer bg-amber-950 rounded-br-lg rounded-tr-lg h-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
