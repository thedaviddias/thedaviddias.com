import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

export const BaseLayout = ({ children }: Props) => {
  return <>{children}</>
}
