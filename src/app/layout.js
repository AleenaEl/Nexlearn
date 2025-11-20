import { Inter } from "next/font/google"
import "./globals.css";

import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  weight:["100","200","300","400","500","600","700","800"]
})


export const metadata = {
  title: "NexLearn – Online Exam",
  description: "Online MCQ exam platform built with Next.js.",
  keywords: "online test, exam, MCQ, next.js exam test",
  icons: { icon: '/favicon.png' },
  robots: "index, follow",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body
       
      >
        <ReduxProvider>
          <QueryProvider>

          {children}
          </QueryProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
