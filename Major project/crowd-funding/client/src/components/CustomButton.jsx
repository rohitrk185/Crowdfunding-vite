import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles, disabled }) => {
  return (
    <button
      type={btnType}
      className={`font-poppins font-semibold text-[16px] leading-[26px] text-black min-h-[52px] px-4  rounded-xl ${styles}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CustomButton;
