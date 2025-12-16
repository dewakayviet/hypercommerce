import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "'No.1 K-Beauty B2B",
  description: "HYPER COMMERCE, create your signature brand",
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 여기서부터 추가된 부분입니다 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  openGraph: {
    title: "'No.1 K-Beauty B2B - HYPER COMMERCE",
    description: "Create your signature brand with the best B2B partner.",
    images: [
      {
        url: "/thumbnail.png", // ⭐ public 폴더에 넣은 파일 이름과 똑같아야 합니다! (앞에 '/' 필수)
        width: 1200,
        height: 630,
        alt: "Hyper Commerce 대표 이미지",
      },
    ],
    type: "website",
  },
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ 여기까지 추가되었습니다 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}