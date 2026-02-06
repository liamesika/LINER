import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "LINER - אלגברה לינארית",
  description: "מערכת לימוד לאלגברה לינארית מבוססת על החומרים שלך",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="google-site-verification" content="PM2b5bKCR8PwiLrcetI7XdVHV9cN2By4kGvChWuUIqE" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
