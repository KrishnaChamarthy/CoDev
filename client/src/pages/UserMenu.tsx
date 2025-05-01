// src/components/UserMenu.tsx
import { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';

interface User {
  displayName: string | null;
  email: string | null;
}

const UserMenu = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-800 rounded-full p-1 pr-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          {user.displayName ? getInitials(user.displayName) : 'U'}
        </div>
        <span className="text-white text-sm hidden md:inline">
          {user.displayName || (user.email ? user.email.split('@')[0] : 'User')}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50">
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-white text-sm">{user.displayName || 'User'}</p>
            <p className="text-gray-400 text-xs truncate">{user.email || ''}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
          >
            <FiLogOut />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;