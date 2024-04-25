import PageIllustration from '@/components/page-illustration'

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

      <PageIllustration />

      {children}

    </main>
  )
}