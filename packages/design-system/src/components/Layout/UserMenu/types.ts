export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface UserMenuProps {
  user?: User | null;
  onLogout?: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }>;
  menuRef?: React.RefObject<HTMLDivElement>;
}

