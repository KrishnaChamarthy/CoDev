import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { RiLockPasswordLine, RiMailLine, RiUserLine } from "react-icons/ri";
import Button from "../components/button";
import SecondaryButton from "../components/secondaryButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => navigate("/documentation")}
        >
          Documentation
        </SecondaryButton>
      </div>

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

      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl relative z-10 border border-gray-800 mx-5">
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Create an Account
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <RiUserLine
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Display Name"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <RiMailLine
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <RiLockPasswordLine
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center py-3"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
