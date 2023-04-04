import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
import { logo, menu, search, thirdweb } from "../assets";
import { navLinks } from "../constants";

import { useConnectionStatus } from "@thirdweb-dev/react";
import { useDisconnect } from "@thirdweb-dev/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  const connectionStatus = useConnectionStatus();
  const disconnect = useDisconnect();

  const status = {
    unknown: "Loading...",
    connecting: "Connecting your Wallet...",
    connected: "Create a campaign",
    disconnected: "Connect Wallet"
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-poppins font-normal text-[14px] placeholder:text-[#4b5264] text-black bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden justify-end gap-4">
        <CustomButton
          btnType="button"
          title={status[connectionStatus]}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          disabled={false}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 flex justify-around ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-[600ms]`}
        >
          <ul className="mb-4 hover:text-black">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 cursor-pointer hover:bg-[#555564] hover:text-black ${
                  isActive === link.name && "bg-[#3a3a43] "
                } ${
                  isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                }`}
                onClick={() => {
                  if (!link.disabled) {
                    if (link.name === "Logout") {
                      disconnect();
                    } else {
                      setIsActive(link.name);
                      navigate(link.link);
                    }
                  } else {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-poppins font-semibold text-[14px]`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4 self-center">
            <CustomButton
              btnType="button"
              title={status[connectionStatus]}
              disabled={false}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
