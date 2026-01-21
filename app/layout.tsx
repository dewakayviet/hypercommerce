import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ⭐ 구글 스크립트 컴포넌트 추가

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hyper Commerce",
  description: "No.1 K-Beauty B2B Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* 👇 구글 광고 추적 코드 (Global Site Tag) 시작 👇 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17892215178"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17892215178');
          `}
        </Script>
        {/* 👆 구글 광고 추적 코드 끝 👆 */}

        {children}
      </body>
    </html>
  );
}