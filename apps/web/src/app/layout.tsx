import type { Metadata } from 'next';
import { Sarabun } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thai Cooking | อาหารไทย',
  description: 'Explore authentic Thai recipes — สูตรอาหารไทยแท้',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={sarabun.variable}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
