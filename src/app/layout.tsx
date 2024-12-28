import { Navigation } from "~/components/shared";
import type { Metadata } from "next";
import { inter } from "~/app/fonts";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Todo",
    template: "%s | Todo",
  },
  description: "A simple todo app with authentication and database.",
  applicationName: "Todo",
  appleWebApp: {
    statusBarStyle: "default",
    title: "Todo",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: false,
  },
  authors: {
    name: "Mehdi Parandak",
    url: "https://pyr33x.ir",
  },
  creator: "Mehdi Parandak",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased w-full h-full bg-neutral-950 scroll-smooth selection:bg-neutral-800 selection:text-white relative`}
      >
        <Navigation />
        <main className="min-h-screen flex flex-col items-center justify-center py-32">
          {children}
        </main>
      </body>
    </html>
  );
}
