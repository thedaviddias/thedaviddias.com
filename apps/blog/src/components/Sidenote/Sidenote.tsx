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
  const InfoIcon = <Info className="fill-current h-6 w-6 text-blue-500 mr-4" />
  const WarningIcon = <Warning className="fill-current h-6 w-6 text-orange-500 mr-4" />

  return (
    <aside className={clsx('border-l-4 p-4 relative rounded-md', typeStyled[type], className)}>
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
