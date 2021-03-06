import Slug from '@components/Shared/Slug'
import { BCharityPost } from '@generated/bcharitytypes'
import { CashIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

interface Props {
  fund: BCharityPost
}

const Funded: React.FC<Props> = ({ fund }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <CashIcon className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <div>Funded by</div>
        <Link href={`/u/${fund?.collectedBy?.defaultProfile?.handle}`}>
          <a>
            <Slug slug={fund?.collectedBy?.defaultProfile?.handle} prefix="@" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Funded
