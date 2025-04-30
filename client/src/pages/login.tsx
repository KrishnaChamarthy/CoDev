import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/primaryButton";
import SecondaryButton from "../components/secondaryButton";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
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
          Documentation
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
        className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl relative z-10 border border-gray-800"
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
          transform: "perspective(1000px) rotateX(1deg)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shadow-xl relative"
            style={{
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
              transform: "perspective(1000px) rotateY(-15deg) rotateX(10deg)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-gray-600 border-l-gray-600 animate-spin-slow"
              style={{
                animationDuration: "10s",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              }}
            ></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black opacity-20"></div>
          </div>
        </div>

        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Don't have an account yet?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <RiMailLine className="text-gray-400" size={20} />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <RiLockPasswordLine className="text-gray-400" size={20} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <PrimaryButton
              onClick={() => handleSubmit({ preventDefault: () => {} })}
              className="w-full justify-center py-[8px]"
            >
              Login
            </PrimaryButton>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-gray-500 px-2">OR</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex justify-center items-center py-3 px-4 border border-gray-800 rounded bg-red-500"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FaGoogle size={20} color="#ffffff" />
            </button>
            
            <button
              type="button"
              className="flex justify-center items-center py-3 px-4 border border-gray-800 rounded bg-[#2B3137]"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FaGithub size={20} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
