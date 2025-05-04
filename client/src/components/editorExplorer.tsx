import { useState } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { EditorExplorerProps } from "../types/interfaces";

const EditorExplorer = ({
  files,
  onFileSelect,
  selectedFile,
  onAddFile,
  onAddFolder,
}: EditorExplorerProps) => {
  const [newName, setNewName] = useState("");
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    if (isAddingFile) {
      onAddFile(newName.trim());
    } else if (isAddingFolder) {
      onAddFolder(newName.trim());
    }
    setNewName("");
    setIsAddingFile(false);
    setIsAddingFolder(false);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full border-b border-gray-800 h-8 flex items-center justify-between pl-5 pr-2">
        <span className="text-gray-400">Explorer</span>
        <div className="flex text-gray-400 gap-2 mt-1">
          <button
            onClick={() => {
              setIsAddingFile(true);
              setIsAddingFolder(false);
            }}
          >
            <AiOutlineFileAdd className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsAddingFolder(true);
              setIsAddingFile(false);
            }}
          >
            <AiOutlineFolderAdd className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {files.map((file) => (
          <div
            key={file}
            onClick={() => onFileSelect(file)}
            className={`cursor-pointer px-2 py-1 rounded-md text-sm truncate ${
              selectedFile === file
                ? "bg-gray-800 text-blue-400"
                : "text-gray-300 hover:bg-gray-900"
            }`}
          >
            {file}
          </div>
        ))}

        {(isAddingFile || isAddingFolder) && (
          <input
            autoFocus
            type="text"
            placeholder={isAddingFile ? "New file name" : "New folder name"}
            className="w-full px-2 py-1 bg-gray-800 text-white rounded-md outline-none text-sm"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleAdd}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") {
                setIsAddingFile(false);
                setIsAddingFolder(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EditorExplorer;
