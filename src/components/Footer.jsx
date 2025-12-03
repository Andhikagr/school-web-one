import React from "react";
import "../locales/index_lang";
import { useTranslation } from "react-i18next";
import ButtonOne from "./ButtonOne";

const Footer = () => {
  const [t, i18n] = useTranslation();
  const translate = t("footer", { returnObjects: true });
  const Dir = i18n.language === "ar" ? "rtl" : "ltr";
  return (
    /* footer */
    <footer className="px-[7%] pt-5 pb-10 text-amber-950">
      <div
        className={`p-9 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 ${
          Dir === "rtl" ? " [direction:rtl] " : "[direction:ltr]"
        }`}
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex flex-col items-start justify-center gap-x-2 gap-y-1 p-2">
          <img src="./assets/logo.png" alt="logo" className="w-[300px]" />
          <h5>{translate.section_title}</h5>
          <div className="flex items-center gap-2">
            <span class="material-symbols-outlined">location_on</span>
            <p>{translate.alamat}</p>
          </div>
          <div className=" flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <span className="material-symbols-outlined">mail</span>
              <p>darulilmi@gmail.com</p>
            </div>
            <div className="flex items-center gap-x-2">
              <span class="material-symbols-outlined">work</span>
              <p>{translate.section_footer.pukul}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <ButtonOne
                fromColor="from-green-300"
                toColor="to-green-400"
                bgBase="bg-green-200"
                textColor="text-amber-950"
                className="rounded-2xl py-2 px-5 gap-2 flex items-center justify-center cursor-pointer"
              >
                <i class="ri-whatsapp-line z-20"></i>
                <h6 className="text-center inline-block z-20">
                  {translate.section_footer.sekretariat}
                </h6>
              </ButtonOne>
              <ButtonOne
                fromColor="from-green-300"
                toColor="to-green-400"
                bgBase="bg-green-200"
                textColor="text-amber-950"
                className="rounded-2xl py-2 px-5 flex gap-2  items-center justify-center cursor-pointer"
              >
                <i class="ri-whatsapp-line z-20 "></i>
                <h6 className="text-center z-20 ">
                  {translate.section_footer.psb}
                </h6>
              </ButtonOne>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>
            <h4>{translate.section_footer.peta}</h4>
          </div>
          <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.4736003515295!2d109.69170497500109!3d-7.396216792613686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa93df9a33173%3A0x3355cd14f0635bc2!2sGreat%20Mosque%20of%20An-Nuur%20Banjarnegara!5e1!3m2!1sen!2sid!4v1759993671538!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
