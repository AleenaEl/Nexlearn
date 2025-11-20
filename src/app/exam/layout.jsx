"use client";

import Navbar from "@/components/navbar/navbar";

export default function ExamLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-[#F4FCFF]">
      <Navbar />

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
