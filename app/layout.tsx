import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who is Jieun? | Welcome to My World",
  description: "안녕하세요! 저는 지은입니다. 저의 관심사를 한번 보시겠어용? 🌟",
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
