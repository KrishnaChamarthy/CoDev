import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase/config";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Button from "../components/button";
import SecondaryButton from "../components/secondaryButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let errorMessage = "Failed to login. Please check your credentials.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || "Failed to login with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err: any) {
      setError(err.message || "Failed to login with GitHub.");
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
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl relative z-10 border border-gray-800">
        <h1 className="text-white text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <RiMailLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 bg-black border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center py-3"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Logging in...
              </span>
            ) : "Login"}
          </Button>

          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-700 flex-grow"></div>
            <span className="text-gray-500 px-3 text-sm">OR</span>
            <div className="border-t border-gray-700 flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex justify-center items-center py-3 px-4 border border-gray-800 rounded bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <FaGoogle size={20} color="#ffffff" />
              <span className="ml-2 text-white text-sm hidden sm:inline">Google</span>
            </button>
            
            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={loading}
              className="flex justify-center items-center py-3 px-4 border border-gray-800 rounded bg-[#2B3137] hover:bg-[#3f4a56] transition-colors disabled:opacity-50"
            >
              <FaGithub size={20} color="#ffffff" />
              <span className="ml-2 text-white text-sm hidden sm:inline">GitHub</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;