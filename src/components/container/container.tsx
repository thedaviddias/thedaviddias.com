import { useRouter } from 'next/router'
import { FC } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

type ContainerProps = {
  children: React.ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
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
