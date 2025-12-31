export interface CartIconProps {
  itemCount?: number;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

