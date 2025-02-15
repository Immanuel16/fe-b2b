import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/features/@shared/components/app-provider';
import { ThemeProvider } from '@/features/@shared/components/theme-provider';
import { MenuProvider } from '@/features/@shared/context/menu';
import bg from '@/../public/bg.png';
import { SpinnerProvider } from '@/features/@shared/context/spinner';
import MainLayout from '@/features/@shared/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blicicil for Business',
  description: 'This is dashboard for blicicil for business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'left top',
        }}
      >
        <AppProvider>
          <MenuProvider>
            <ThemeProvider>
              <SpinnerProvider>
                <MainLayout>{children}</MainLayout>
              </SpinnerProvider>
            </ThemeProvider>
          </MenuProvider>
        </AppProvider>
      </body>
    </html>
  );
}
