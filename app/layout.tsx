import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Tensor",
  description: "Tensor AI — Automated Math Test Generator & Grading Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="fixed -top-40 -left-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-indigo-600/15 blur-[80px] sm:blur-[130px] pointer-events-none -z-10" />
        <div className="fixed -bottom-40 -right-40 w-80 h-80 sm:w-[50vw] sm:h-[50vw] rounded-full bg-purple-600/15 blur-[80px] sm:blur-[130px] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
