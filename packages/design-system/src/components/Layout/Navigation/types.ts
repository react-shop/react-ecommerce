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

