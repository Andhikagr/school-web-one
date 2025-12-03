import React from "react";

const ButtonOne = ({
  children,
  fromColor = "from-gray-100",
  toColor = "to-gray-200",
  bgBase = "bg-gray-300",
  textColor = "text-black",
  Dir = "ltr",
  className = "",
  onClick,
}) => {
  return (
    <div
      className={` ${bgBase} ${textColor} relative group overflow-hidden ${className} ${
        Dir === "rtl" ? " text-right " : "text-left"
      }`}
      style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
      onClick={onClick}
    >
      {children}
      <div
        className={`opacity-0  absolute inset-0  ${fromColor} ${toColor} translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%] transition-all duration-400 z-0  ${
          Dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
        }`}
      ></div>
    </div>
  );
};

export default ButtonOne;
