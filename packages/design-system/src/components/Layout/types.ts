export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationProps {
  links: NavLink[];
  currentPath: string;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  placeholder?: string;
}

export interface CartIconProps {
  itemCount?: number;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

export interface LogoProps {
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
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

export interface HeaderProps {
  LogoComponent: React.ReactNode;
  SearchBarComponent: React.ReactNode;
  NavigationComponent: React.ReactNode;
  CartIconComponent: React.ReactNode;
  UserMenuComponent: React.ReactNode;
  MobileMenuComponent: React.ReactNode;
}

export interface FooterProps {
  newsletterEmail: string;
  onNewsletterEmailChange: (email: string) => void;
  onNewsletterSubmit: (e: React.FormEvent) => void;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    target?: string;
    rel?: string;
    children: React.ReactNode;
  }>;
}

