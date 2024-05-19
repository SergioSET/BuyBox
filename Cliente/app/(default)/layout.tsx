import PageIllustration from '@/components/page-illustration'
import Header from '@/components/ui/header'

export const metadata = {
  title: 'Perfil - BuyBox',
  description: 'Perfil',
}


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">

        <Header/>

      {children}

    </main>
  )
}