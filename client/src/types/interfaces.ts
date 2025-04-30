export interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode; // <svg>, <img>, <span>, etc.
}

export interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}