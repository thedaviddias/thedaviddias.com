import clsx from 'clsx'

import Info from '../../../public/images/svg/info.svg'
import Warning from '../../../public/images/svg/warning.svg'

type Type = 'info' | 'warning'

type SidenoteProps = {
  type?: Type
  title: React.ReactNode
  children: React.ReactNode
  className: string
}

const typeStyled: { [key in Type]: string } = {
  info: 'dark:bg-[#182635] bg-indigo-50 border-blue-500',
  warning: 'bg-[#ffa2001a] border-orange-500',
}

export const Sidenote: React.FC<SidenoteProps> = ({
  type = 'info',
  title,
  children,
  className,
}) => {
  const InfoIcon = <Info className="mr-4 h-6 w-6 fill-current text-blue-500" />
  const WarningIcon = <Warning className="mr-4 h-6 w-6 fill-current text-orange-500" />

  return (
    <aside className={clsx('relative rounded-md border-l-4 p-4', typeStyled[type], className)}>
      <div className="flex">
        <div className="py-1">
          {type === 'info' && InfoIcon}
          {type === 'warning' && WarningIcon}
        </div>
        <div>
          <strong className="mb-2 font-bold">{title}</strong>
          <div className="dark:text-white">{children}</div>
        </div>
      </div>
    </aside>
  )
}
