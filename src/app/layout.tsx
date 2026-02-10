import type { Metadata } from "next";
import { Crimson_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Greenwood International Academy | CBSE School in Bangalore",
  description:
    "Greenwood International Academy is a premier CBSE school in Bangalore offering Pre-Nursery to Class 12 education. Admissions open for 2026-27. 12-acre campus, 98.5% board results, and 30+ extracurricular programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonPro.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
