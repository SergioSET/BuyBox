import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
// import 'Cliente/app/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Pedidos',
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
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
