import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Alegreya as FontSans } from 'next/font/google'; // Renamed to FontSans to match usage

const fontSans = FontSans({ // Changed variable name here
  subsets: ['latin'],
  variable: '--font-sans', // This sets the CSS variable
  weight: ['400', '500', '700', '900']
});

export const metadata: Metadata = {
  title: 'RestoAdapt - Gestión de Restaurantes',
  description: 'Gestiona eficientemente las operaciones de tu restaurante.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          fontSans.variable // Apply the CSS variable to the body
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}