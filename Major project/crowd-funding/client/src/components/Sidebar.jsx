import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { logo, sun } from "../assets";
import { navLinks } from "../constants";
import { useStateContext } from "../context/index";

import { useDisconnect } from "@thirdweb-dev/react";
import { TokenMetadataInputSchema } from "@thirdweb-dev/sdk/solana";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled ? "cursor-pointer" : "cursor-not-allowed"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const disconnect = useDisconnect();

  const { themeMode, setThemeMode } = useStateContext();

  const [isActive, setIsActive] = useState("Dashboard");

  return (
    <div className="flex flex-col justify-between items-center sticky top-5 h-[93dvh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  if (link.name === "Logout") {
                    disconnect();
                    toast.success("Do visit again😊");
                  } else {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
          handleClick={() => {
            themeMode === "dark" ? setThemeMode("light") : setThemeMode("dark");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
