import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Button } from "./components/ui/button";
import Constants from "./constants";
import { useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen relative gradient">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white p-6 relative z-10">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">Widget Media Labs</h1>
        <p className="text-lg mb-6 animate-fade-in delay-200">
          Explore Beautiful apps crafted with passion.
        </p>
        <Button
          onClick={() => {
            window.open(Constants.playstoreLink, "_blank");
          }}
          variant={"playstore"}
        >
          {/* <IoLogoGooglePlaystore className="mr-2" /> */}
          Download on Play Store
        </Button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white opacity-80 hover:opacity-100 transition-opacity">
          <Button
            variant={"link"}
            className="underline text-white hover:text-primary"
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >Privacy Policy</Button>
        </div>
      </div>
    </div >
  );
};

export default App;
