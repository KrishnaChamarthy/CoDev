import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckboxCircleFill } from 'react-icons/ri'; 

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-gray-900 rounded-xl border border-gray-800">
        <div className="flex justify-center mb-4">
          <RiCheckboxCircleFill className="text-green-500 text-5xl" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
        <p className="text-gray-300 mb-6">You've successfully authenticated.</p>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Redirecting in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default Success;