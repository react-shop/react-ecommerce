export interface NavLink {
  href: string;
  label: string;
}

export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface MobileMenuProps {
  user?: User | null;
  onLogout?: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  navLinks: NavLink[];
  currentPath: string;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }>;
}

