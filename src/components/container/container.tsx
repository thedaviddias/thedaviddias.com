import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type Props = PropsWithChildren<{}>

export const Container = ({ children }: Props) => {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header pathname={router.pathname} />
      <div className="flex-grow-1 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {children}
        {/* <Newsletter /> */}
      </div>
      <Footer />
    </div>
  )
}
