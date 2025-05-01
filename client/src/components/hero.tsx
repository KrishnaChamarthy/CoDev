import { useState, useEffect } from "react";
import { Images } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "./secondaryButton";
import PrimaryButton from "./primaryButton";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 z-20 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 md:pt-8 w-full max-w-7xl flex justify-between items-center">
        <Link to="/">
          <div className="text-white text-2xl font-bold flex items-center">
            <span className="text-white">&lt;Co</span>
            <span className="text-blue-400">Dev</span>/&gt;
          </div>
        </Link>

        <SecondaryButton
          onClick={() => navigate("/login")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          }
        >
          Get Started
        </SecondaryButton>
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(68, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(68, 68, 68, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          width: "284px",
          height: "284px",
          left: 0,
          top: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100, 149, 237, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
          transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`,
          transition: "transform 0.1s ease-out",
        }}
      />

      <div className="absolute z-5 opacity-50">
        <div className="w-64 h-64 bottom-10 md:w-80 md:h-80 relative">
          <img
            src={Images.Code}
            alt="Code brackets"
            className="w-full h-full"
            style={{
              filter: "invert(1)",
              opacity: "0.25",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 text-white text-center px-4 opacity-75 flex flex-col items-center">
        <h1 className="text-5xl lg:text-8xl font-bold mb-6">
          <span className="text-white">Code Together, </span>
          <span className="text-blue-400">Live</span>
        </h1>
        <p className="mb-8 lg:text-xl text-lg lg:max-w-xl px-2">
          Break the distance barrier with live coding.{" "}
          <span className="text-blue-400">CoDev</span> lets you and your team
          work together in real-time, seamlessly.
        </p>
      </div>

      <div className="absolute lg:bottom-32 bottom-16 left-0 right-0 z-10 flex justify-center items-center lg:gap-10 gap-5 flex-col lg:flex-row w-full">
        <PrimaryButton
          onClick={() => navigate("/login")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          }
        >
          Start Collaborating
        </PrimaryButton>

        <SecondaryButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          }
          onClick={() => navigate("/documentation")}
        >
          Documentation
        </SecondaryButton>
      </div>
    </div>
  );
};

export default Hero;
