import { PropsWithChildren } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type Props = PropsWithChildren<{}>

export const Container = ({ children }: Props) => {
  return (
    <div className="">
      <Header />
      <div className="mx-auto max-w-[60rem] px-4 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  )
}
