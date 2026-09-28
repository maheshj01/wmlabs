import React from "react";
import { Button } from "./components/ui/button";
import Constants from "./constants";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { APPS } from "./apps";

const App = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen relative gradient">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white p-6 pb-24 relative z-10">
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

        <section aria-labelledby="apps-heading" className="mt-14 w-full max-w-md">
          <h2 id="apps-heading" className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Our apps
          </h2>
          <ul className="space-y-3">
            {APPS.map((app) => (
              <li key={app.path}>
                <Link
                  to={app.path}
                  className="group flex items-center gap-4 rounded-[20px] bg-white/15 p-4 text-left backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25"
                >
                  <img src={`${process.env.PUBLIC_URL}${app.icon}`} alt="" width={56} height={56} className="h-14 w-14 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold">{app.name}</span>
                    <span className="block text-sm text-white/85">{app.tagline}</span>
                    <span className="mt-1 block text-xs text-white/70">{app.platforms}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
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
