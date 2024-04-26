
import PageIllustration from '@/components/page-illustration'

export const metadata = {
  title: 'Crear Pedido - BuyBox',
  description: 'Layout para pedidos',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <main className="grow">

      <PageIllustration />

      {children}

    </main>
  )
}
