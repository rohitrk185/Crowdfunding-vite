import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages/index";
import { Sidebar, Navbar } from "./components";

import { useConnectionStatus } from "@thirdweb-dev/react";

const App = () => {
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    connectionStatus === "connected" &&
      toast.success("Welcome to Crowdfunding dApp😉");
  }, [connectionStatus]);

  return (
    <div
      className={`relative sm:p-8 p-4 min-h-screen flex bg-[#13131a] text-gray-100`}
    >
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
