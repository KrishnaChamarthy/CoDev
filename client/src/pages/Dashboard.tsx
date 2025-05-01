// src/pages/Dashboard.tsx
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dashboard content here */}
      </div>
      <Link 
        to="/" 
        className="mt-6 inline-block text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default Dashboard;