import React from "react";
import "./styles/globals.css";
import AppShell from "./components/AppShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-svh">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
} 