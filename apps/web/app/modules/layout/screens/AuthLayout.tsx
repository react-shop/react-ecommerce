"use client";

import { HeaderWrapper } from "@/app/modules/layout/components";
import { useMe, useLogout } from "@react-shop/sdk";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { data: user } = useMe();
  const { mutate: logout } = useLogout();

  // TODO: Get cart item count from cart context/hook when implemented
  const cartItemCount = 0;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderWrapper
        user={user}
        cartItemCount={cartItemCount}
        onLogout={handleLogout}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}

