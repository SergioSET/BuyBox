import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
// import 'Cliente/app/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Usuarios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
