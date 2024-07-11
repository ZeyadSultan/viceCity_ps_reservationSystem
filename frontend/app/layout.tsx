import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/providers/react-query-provider";
import { MainNavItem } from "@/types";
import MainNav from "@/components/main-nav";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vice City",
  description: "",
};

const routes: MainNavItem[] = [
  {
    title: "New Reservation",
    href: "/new-reservation",
    disabled: false,
  },
  {
    title: "Rooms",
    href: "/rooms",
    disabled: false,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-[100vh] grid grid-rows-[auto_1fr] ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="z-40 bg-background px-8">
            <div className="max-w-screen-lg w-full mx-auto flex h-20 items-center justify-between py-6">
              <MainNav items={routes} />
              <ThemeModeToggle />
            </div>
          </header>
          <main className="max-w-screen-lg w-full mx-auto px-8">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
