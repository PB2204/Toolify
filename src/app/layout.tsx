import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AnimatedShapes } from '@/components/AnimatedShapes';
import { CustomCursor } from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Toolify',
  description: '100+ essential developer and designer tools in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased h-full flex flex-col bg-background')}>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <CustomCursor />
            <div className="absolute inset-0 -z-10 h-full w-full bg-background" />
            <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />
            <AnimatedShapes />
            <Navbar />
            <div className="flex-grow relative z-10">
              {children}
            </div>
            <Footer />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
