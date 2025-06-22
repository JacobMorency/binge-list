"use client";

import { ReactNode } from "react";

type ClientLayoutProps = {
  children: ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col px-3">{children}</div>
    </div>
  );
};

export default ClientLayout;
