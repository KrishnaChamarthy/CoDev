import { VscRunAll } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import Editor from "@monaco-editor/react";
import { EditorWorkspaceProps, FileTabProps } from "../types/interfaces";

const EditorWorkspace = ({
  openFiles,
  selectedFile,
  setSelectedFile,
  setOpenFiles,
  fileContents,
}: EditorWorkspaceProps) => {
  const handleCloseFile = (file: string) => {
    const updatedFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(updatedFiles);

    if (selectedFile === file) {
      if (updatedFiles.length > 0) {
        setSelectedFile(updatedFiles[0]);
      } else {
        setSelectedFile("Welcome");
      }
    }
  };

  const getFileNameFromPath = (path: string): string => {
    return path.split("/").pop() || path;
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-2 border-b border-gray-800 h-8 gap-20 flex-shrink-0">
        <div className="h-full flex items-center flex-1 border-r border-gray-800 overflow-x-auto scrollbar-hide mt-1">
          {openFiles.map((file) => (
            <FileTab
              key={file}
              fileTitle={getFileNameFromPath(file)}
              filePath={file}
              isSelected={selectedFile === file}
              onSelect={() => setSelectedFile(file)}
              onClose={() => handleCloseFile(file)}
            />
          ))}
        </div>
        <div className="h-full flex items-center px-5 border-l ml-10 border-gray-800 text-gray-400">
          <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-800 transition duration-200 ease-in-out">
            <VscRunAll />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden m-1">
        {selectedFile === "Welcome" ? (
          <WelcomeComponent />
        ) : (
          <Editor
            height="100%"
            language={getLanguageFromFileName(selectedFile)}
            value={fileContents[selectedFile] || ""}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollbar: { vertical: "hidden", horizontal: "hidden" },
            }}
          />
        )}
      </div>
    </div>
  );
};

const FileTab = ({
  fileTitle,
  isSelected,
  onSelect,
  onClose,
}: FileTabProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-2 px-3 h-full cursor-pointer border border-gray-800 rounded-t-md mr-1 border-b-0
        ${
          isSelected
            ? "bg-gray-900 text-blue-400"
            : "hover:bg-gray-800 text-gray-300"
        }`}
    >
      <span className="truncate max-w-[100px]">{fileTitle}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="p-1 bg-blue-500 hover:bg-blue-600 rounded-full"
      >
        <IoMdClose className="w-2 h-2 text-black" />
      </button>
    </div>
  );
};

const WelcomeComponent = () => (
  <div className="h-full w-full flex flex-col items-center justify-center text-gray-300">
    <h1 className="text-3xl font-bold text-blue-400 mb-4">Welcome to CoDev</h1>
    <p className="text-lg text-center max-w-xl">
      Select a file from the explorer to start editing, or create a new one to
      begin coding collaboratively.
    </p>
  </div>
);

function getLanguageFromFileName(fileName: string): string {
  if (fileName.endsWith(".tsx") || fileName.endsWith(".ts"))
    return "typescript";
  if (fileName.endsWith(".js") || fileName.endsWith(".jsx"))
    return "javascript";
  if (fileName.endsWith(".json")) return "json";
  if (fileName.endsWith(".css")) return "css";
  if (fileName.endsWith(".html")) return "html";
  if (fileName.endsWith(".md")) return "markdown";
  return "plaintext";
}

export default EditorWorkspace;
