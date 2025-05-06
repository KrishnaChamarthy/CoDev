export type FileSystemItem = {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileSystemItem[];
  isOpen?: boolean;
};

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export interface EditorExplorerProps {
  files: FileSystemItem[];
  selectedFile: string;
  onFileSelect: (path: string) => void;
  onAddFile: (path: string) => void;
  onAddFolder: (path: string) => void;
  onDeleteItem: (path: string, type: "file" | "folder") => void;
  onUpdateFiles: (files: FileSystemItem[]) => void;
}

export interface EditorWorkspaceProps {
  openFiles: string[];
  selectedFile: string;
  setSelectedFile: (file: string) => void;
  setOpenFiles: (files: string[]) => void;
  fileContents: Record<string, string>;
}

export interface FileTabProps {
  fileTitle: string;
  filePath: string;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
}
