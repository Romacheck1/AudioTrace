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
  title: {
    default: "SoundTrace - Track All Your Audio Content",
    template: "%s | SoundTrace"
  },
  description: "Discover and track songs, podcasts, audiobooks, movies, streams, YouTube videos, news, radio, and interviews all in one place. Your one-stop shop for finding all things audio related.",
  keywords: ["music", "podcasts", "audiobooks", "streaming", "audio content", "songs", "movies", "youtube", "news", "radio", "interviews", "audio tracking"],
  authors: [{ name: "SoundTrace" }],
  creator: "SoundTrace",
  publisher: "SoundTrace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SoundTrace - Track All Your Audio Content",
    description: "Discover and track songs, podcasts, audiobooks, movies, streams, and more all in one place.",
    siteName: "SoundTrace",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoundTrace - Track All Your Audio Content",
    description: "Discover and track songs, podcasts, audiobooks, movies, streams, and more all in one place.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
