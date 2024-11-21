"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";

import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });
// const inter = localFont({
//   src: [
//     {
//       path: "./fonts/inter/Inter_18pt-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/inter/Inter_18pt-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "./fonts/inter/Inter_18pt-Italic.ttf",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "./fonts/inter/Inter_24pt-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "./fonts/inter/Inter_28pt-ExtraBold.ttf",
//       weight: "800",
//       style: "normal",
//     },
//   ],
//   variable: "--font-inter", // Optional: Use CSS variable for custom styling
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
