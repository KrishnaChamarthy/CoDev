import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { FiUser, FiSettings, FiLogOut, FiHome } from "react-icons/fi";
import DashboardProjects from "../components/dashboardProjects";
import DashboardProfile from "../components/dashboardProfile";

type PageType = "projects" | "profile" | "settings";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>("projects");
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitial = () => {
    if (!user?.displayName) return "?";
    return user.displayName.charAt(0).toUpperCase();
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setShowDropdown(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "projects":
        return <DashboardProjects />;
      case "profile":
        return <DashboardProfile />;
      case "settings":
        return (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <p className="text-gray-400">Settings page content will go here.</p>
          </div>
        );
      default:
        return <DashboardProjects />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-blue-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-white">&lt;Co</span>
          <span className="text-blue-400">Dev</span>/&gt;
        </Link>

        <div className="flex items-center">
          <div className="mr-4 text-gray-400">
            {currentPage === "projects" && <span>Projects</span>}
            {currentPage === "profile" && <span>Profile</span>}
            {currentPage === "settings" && <span>Settings</span>}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:bg-gray-800 rounded-full p-2 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {getUserInitial()}
              </div>
              <span className="hidden md:inline">
                {user?.displayName || user?.email?.split("@")[0]}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-white text-sm">
                    {user?.displayName || "User"}
                  </p>
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
      </nav>

      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;