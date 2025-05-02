import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { FiHome, FiLogOut, FiSettings, FiUser, FiMonitor } from "react-icons/fi";
import PrimaryButton from "../components/primaryButton";
import { IoMdAdd } from "react-icons/io";

type PageType = "projects" | "profile" | "settings";

const Editor = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>("projects");
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const getUserInitial = () => {
    if (!user?.displayName) return "?";
    return user.displayName.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-blue-400 text-lg">Loading...</div>
      </div>
    );
  }

  const isMobile = windowWidth !== null && windowWidth < 1024;

  if (isMobile) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <FiMonitor className="text-6xl text-blue-400 mb-6" />
        <h1 className="text-2xl font-bold mb-3 text-center">Desktop Experience Required</h1>
        <p className="text-gray-300 text-center mb-6">
          This collaborative coding environment is optimized for desktop screens.
          Please open CoDev on a computer for the best experience.
        </p>
        <div className="text-center">
          <PrimaryButton onClick={handleLogout} className="px-6 py-2">
            Sign Out
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <nav className="flex justify-between items-center px-2 border-b border-gray-800 h-12 min-h-[3rem] flex-shrink-0">
        <Link to="/" className="text-xl font-bold border-r border-gray-800 py-2 px-4 h-full">
          <span className="text-white">&lt;Co</span>
          <span className="text-blue-400">Dev</span>/&gt;
        </Link>
        <div className="flex items-center border-l border-gray-800 h-full">
          <div className="flex items-center">
            <PrimaryButton className="py-1 mx-4 px-[10px] flex flex-row items-center gap-1">
              <IoMdAdd />
              Invite
            </PrimaryButton>
          </div>
          <div className="flex items-center border-l border-gray-800 pl-4 h-full">
            <div className="mr-4 text-gray-400">Editor</div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-gray-800 rounded-full p-1 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {getUserInitial()}
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-white text-sm">{user?.displayName || "User"}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => navigateTo("projects")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-2 ${
                      currentPage === "projects" ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    <FiHome className={currentPage === "projects" ? "text-blue-400" : "text-gray-400"} />
                    Projects
                  </button>

                  <button
                    onClick={() => navigateTo("profile")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-2 ${
                      currentPage === "profile" ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    <FiUser className={currentPage === "profile" ? "text-blue-400" : "text-gray-400"} />
                    Profile
                  </button>

                  <button
                    onClick={() => navigateTo("settings")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-2 ${
                      currentPage === "settings" ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    <FiSettings className={currentPage === "settings" ? "text-blue-400" : "text-gray-400"} />
                    Settings
                  </button>

                  <div className="border-t border-gray-800 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                    >
                      <FiLogOut className="text-gray-400" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 border-r border-gray-800 p-2 overflow-y-auto">
          <div className="text-gray-400 mb-2">File Explorer</div>
        </div>

        <div className="w-4/5 flex flex-col overflow-hidden">
          <div className="flex-1 border-b border-gray-800 p-2 overflow-hidden flex flex-col">
            <div className="text-gray-400 mb-2 flex-shrink-0">Code Editor</div>
            <div className="flex-1 overflow-auto"></div>
          </div>

          <div className="h-48 p-2 flex-shrink-0 flex flex-col">
            <div className="text-gray-400 mb-2">Terminal</div>
            <div className="flex-1 border border-gray-800 rounded-md overflow-hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
