// src/components/Layout.tsx
import UserMenu from "../pages/UserMenu";
import { auth } from "../firebase/config";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/" className="text-white text-2xl font-bold">
            &lt;Co<span className="text-blue-400">Dev</span>/&gt;
          </a>
          {auth.currentUser && (
            <UserMenu user={{
              displayName: auth.currentUser.displayName,
              email: auth.currentUser.email
            }} />
          )}
        </div>
      </header>
      <main className="p-4 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;