import React from 'react'

import { StatusIndicatorProps } from '@/types'

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  let fillClass = ''

  switch (status) {
    case 'idea':
      fillClass = 'fill-blue-400'
      break
    case 'in-progress':
      fillClass = 'fill-yellow-400'
      break
    case 'completed':
      fillClass = 'fill-green-400'
      break
    case 'on-hold':
      fillClass = 'fill-orange-400'
      break
    case 'cancelled':
      fillClass = 'fill-red-400'
      break
  }

  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium dark:text-white ring-1 ring-inset ring-gray-400 dark:ring-gray-700">
      <svg className={`h-1.5 w-1.5 ${fillClass}`} viewBox="0 0 6 6" aria-hidden="true">
        <circle cx="3" cy="3" r="3" />
      </svg>
      {status}
    </span>
  )
}

export default StatusIndicator
