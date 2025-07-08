import { Outfit } from 'next/font/google';
import './globals.css';
import '@/styles/_keyframe-animations.scss'
import '@/styles/_variables.scss'

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <NextTopLoader showSpinner={false} />
        <Toaster/>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
