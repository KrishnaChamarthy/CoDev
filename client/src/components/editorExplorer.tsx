import { useState } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { FiFolder, FiFile, FiFolderPlus, FiChevronRight, FiChevronDown } from "react-icons/fi";

// Updated types for file system structure
type FileSystemItem = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileSystemItem[];
  isOpen?: boolean;
};

type EditorExplorerProps = {
  files: FileSystemItem[];
  onFileSelect: (path: string) => void;
  selectedFile: string;
  onAddFile: (path: string) => void;
  onAddFolder: (path: string) => void;
  onDeleteItem: (path: string, type: 'file' | 'folder') => void;
  onUpdateFiles: (files: FileSystemItem[]) => void;
};

const EditorExplorer = ({
  files,
  onFileSelect,
  selectedFile,
  onAddFile,
  onAddFolder,
  onDeleteItem,
  onUpdateFiles,
}: EditorExplorerProps) => {
  const [newName, setNewName] = useState("");
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [addingIn, setAddingIn] = useState<string>("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    
    const targetPath = addingIn ? 
      `${addingIn}/${newName.trim()}` : 
      newName.trim();
    
    if (isAddingFile) {
      onAddFile(targetPath);
    } else if (isAddingFolder) {
      onAddFolder(targetPath);
    }
    
    setNewName("");
    setIsAddingFile(false);
    setIsAddingFolder(false);
    setAddingIn("");
  };

  const handleDeleteItem = (e: React.MouseEvent, path: string, type: 'file' | 'folder') => {
    e.stopPropagation(); 
    onDeleteItem(path, type);
  };

  const toggleFolder = (folderPath: string) => {
    const updateFolderState = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map(item => {
        if (item.path === folderPath) {
          return { ...item, isOpen: !item.isOpen };
        } else if (item.children) {
          return { ...item, children: updateFolderState(item.children) };
        }
        return item;
      });
    };
    
    onUpdateFiles(updateFolderState(files));
  };

  const startAddingFile = (folderPath: string = "") => {
    setIsAddingFile(true);
    setIsAddingFolder(false);
    setAddingIn(folderPath);
  };

  const startAddingFolder = (folderPath: string = "") => {
    setIsAddingFolder(true);
    setIsAddingFile(false);
    setAddingIn(folderPath);
  };

  const renderItems = (items: FileSystemItem[], depth: number = 0) => {
    return items.map((item) => (
      <div key={item.path} style={{ paddingLeft: `${depth * 12}px` }}>
        {item.type === 'folder' ? (
          <div className="flex flex-col">
            <div 
              className={`cursor-pointer px-2 py-1 rounded-md flex items-center justify-between text-sm
                ${selectedFile === item.path ? 'bg-gray-800 text-blue-400' : 'text-gray-300 hover:bg-gray-900'}`}
              onClick={() => toggleFolder(item.path)}
            >
              <div className="flex items-center flex-1">
                {item.isOpen ? 
                  <FiChevronDown className="w-5 h-5 mr-1" /> : 
                  <FiChevronRight className="w-5 h-5 mr-1" />
                }
                <FiFolder className="w-5 h-5 mr-2 text-blue-300" />
                <span className="truncate">{item.name}</span>
              </div>
              <div className="flex space-x-1">
                <FiFile 
                  className="w-5 h-5 p-[3px] hover:bg-gray-700  rounded-full text-gray-400 hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    startAddingFile(item.path);
                  }}
                />
                <FiFolderPlus 
                  className="w-5 h-5 p-[3px] hover:bg-gray-700  rounded-full text-gray-400 hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    startAddingFolder(item.path);
                  }}
                />
                <MdDeleteOutline 
                  className="w-5 h-5 hover:bg-gray-700 p-0.5 rounded-full text-gray-400 hover:text-red-400"
                  onClick={(e) => handleDeleteItem(e, item.path, 'folder')}
                />
              </div>
            </div>
            
            {item.isOpen && item.children && (
              <div className="ml-2 border-l border-gray-700">
                {renderItems(item.children, depth + 1)}
                
                {addingIn === item.path && (isAddingFile || isAddingFolder) && (
                  <div style={{ paddingLeft: `${(depth + 1) * 12}px` }}>
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
                          setAddingIn("");
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => onFileSelect(item.path)}
            className={`cursor-pointer px-2 py-1 rounded-md flex items-center justify-between text-sm
              ${selectedFile === item.path ? 'bg-gray-800 text-blue-400' : 'text-gray-300 hover:bg-gray-900'}`}
          >
            <div className="flex items-center flex-1">
              <FiFile className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{item.name}</span>
            </div>
            <MdDeleteOutline 
              className="w-5 h-5 hover:bg-gray-700 p-0.5 rounded-full text-gray-400 hover:text-red-400"
              onClick={(e) => handleDeleteItem(e, item.path, 'file')}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="w-full border-b border-gray-800 h-8 flex items-center justify-between pl-5 pr-2">
        <span className="text-gray-400">Explorer</span>
        <div className="flex text-gray-400 gap-2">
          <button onClick={() => startAddingFile()}>
            <AiOutlineFileAdd className="w-5 h-5" />
          </button>
          <button onClick={() => startAddingFolder()}>
            <AiOutlineFolderAdd className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {renderItems(files)}
        
        {addingIn === "" && (isAddingFile || isAddingFolder) && (
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