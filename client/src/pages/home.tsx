import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import Hero from '../components/hero'; // Import the Hero component

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserInitial = () => {
    if (!user?.displayName) return '?';
    return user.displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Show Hero only if user is not logged in */}
      {!user && <Hero />}

      {/* Navigation - moved inside conditional rendering */}
      {user && (
        <nav className="flex justify-between items-center p-4 border-b border-gray-800">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">&lt;Co</span>
            <span className="text-blue-400">Dev</span>/&gt;
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:bg-gray-800 rounded-full p-2 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {getUserInitial()}
              </div>
              <span className="hidden md:inline">{user.displayName || user.email?.split('@')[0]}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-white text-sm">{user.displayName || 'User'}</p>
                  <p className="text-gray-400 text-xs truncate">{user.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                  <FiUser className="text-gray-400" />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                  <FiSettings className="text-gray-400" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <FiLogOut className="text-gray-400" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Main Content - only show if user is logged in */}
      {user && (
        <main className="max-w-7xl mx-auto p-4">
          <div className="text-center py-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-400">CoDev</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Collaborate with developers around the world on exciting projects
            </p>
            
            <div className="mt-10">
              <h2 className="text-2xl mb-4">Hello, {user.displayName || 'Developer'}!</h2>
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;