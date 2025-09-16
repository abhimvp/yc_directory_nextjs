import React from "react";
import Navbar from "@/app/components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      {" "}
      {/* font we will be using */}
      {/* this layout will render a Navbar on top */}
      <Navbar />
      {children}
    </main>
  );
}
