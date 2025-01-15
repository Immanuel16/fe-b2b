import { Sidebar } from '@/features/@shared/components/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blicicil For Business',
  description: 'Blicicil for business',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen max-w-[100vw] font-openSans">
      <Sidebar />
      <main
        id="content"
        className="z-[12] w-full space-y-8 overflow-y-auto px-6 py-6"
      >
        {children}
      </main>
      {/* glass */}
    </div>
  );
}
