import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Fira_Code, Inter, Geist_Mono, Geist, Nunito_Sans, Nunito} from "next/font/google";


const fira = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'],
  weight: "variable",
})

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ['latin'],
  weight: "variable"
})

const geist_sans = Geist({
  variable: "--font-geist_sans",
  subsets: ['latin'],
  weight: "variable"
})

const nunito_sans = Nunito_Sans({
  variable: "--font-nunito_sans",
  subsets: ['latin'],
  weight: "variable"
})

const nunito= Nunito({
  variable: "--font-nunito",
  subsets: ['latin'],
  weight: "variable"
})


export const metadata: Metadata = {
  title: "My Portfolio - Rainier Sapin",
  description:
    "Showcasing my journey as a software engineer, featuring my projects, skills, and experience in web and mobile development.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning 
    className={`${fira.variable} ${inter.variable} ${geist_mono.variable} ${geist_sans.variable} ${nunito_sans.variable} ${nunito.variable}`}>
      <body className={`antialiased bg-white dark:bg-black`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
