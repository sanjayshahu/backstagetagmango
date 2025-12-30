import { Be_Vietnam_Pro } from 'next/font/google';
import './global.css';
import { QueryProvider } from '@/lib/query-provider';
import { ModalTrackingProvider } from '@/lib/modal-tracking-context';
import { AuthGateProvider } from '@/lib/auth-gate-context';
import { Toaster } from '@/components/ui/sonner';

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Backstage Pass',
  description: 'Access exclusive content from your favorite creators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const isDark = theme === 'dark' ||
                    ((!theme || theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${beVietnamPro.variable} font-sans antialiased bg-background`}
      >
        <QueryProvider>
          <Toaster position="top-center" />
          <ModalTrackingProvider>
            <AuthGateProvider>
              {children}
            </AuthGateProvider>
          </ModalTrackingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
