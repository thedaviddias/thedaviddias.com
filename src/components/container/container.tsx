import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'

type Props = PropsWithChildren<{}>

export const Container = ({ children }: Props) => {
  return (
    <div className="overall-wrapper scrollbar-thick overflow-hidden flex flex-col">
      <Header />
      {children}
    </div>
  )
}
