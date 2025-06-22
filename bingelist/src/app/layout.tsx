import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/context/authcontext";

export const metadata: Metadata = {
  title: "BingeList",
  description: "A simple app to track what you watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base-100">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
