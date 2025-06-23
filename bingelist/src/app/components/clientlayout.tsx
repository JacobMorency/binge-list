"use client";

import { ReactNode } from "react";
import { useAuth } from "@/app/context/authContext";
import BottomNav from "@/app/components/bottomnav";

type ClientLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
};

const ClientLayout = ({ children, header }: ClientLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {header && (
        <header className="bg-base-200 p-4 text-center">
          <h1 className="text-primary-content text-2xl">{header}</h1>
        </header>
      )}

      <div className="flex flex-1 flex-col px-3 text-primary-content">
        {children}
      </div>
      {user && <BottomNav />}
    </div>
  );
};

export default ClientLayout;
