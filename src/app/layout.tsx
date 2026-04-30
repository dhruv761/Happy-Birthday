import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 24th Birthday 🎂",
  description: "A birthday letter, just for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
