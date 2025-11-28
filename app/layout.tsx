import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who is Jieun? | Welcome to My World",
  description:
    "안녕하세요! 저는 지은입니다. 3D 갤러리를 통해 제 세계를 탐험해보세요 🌟",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
