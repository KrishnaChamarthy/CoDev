import { FiCode, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DashboardProjects = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          <FiPlus className="text-white" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-800 rounded-lg">
          <FiCode className="text-blue-400 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-400 text-center mb-6">
            Create your first project to get started with collaborative coding
          </p>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors" onClick={() => navigate("/editor")}>
            <FiPlus className="text-white" />
            <span>Create Project</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardProjects;
