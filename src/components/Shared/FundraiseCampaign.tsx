import { Fundraise } from '@generated/bcharitytypes'
import { UsersIcon } from '@heroicons/react/outline'
import { humanize } from '@lib/humanize'
import Link from 'next/link'
import React from 'react'

interface Props {
  fundraise: Fundraise
}

const FundraiseCampaign: React.FC<Props> = ({ fundraise }) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/fundraises/${fundraise?.pubId}`}>
        <a>
          <div className="flex items-center space-x-3">
            <img
              src={
                fundraise?.metadata?.cover?.original?.url
                  ? fundraise?.metadata?.cover?.original?.url
                  : `https://avatar.tobi.sh/${fundraise?.pubId}.png`
              }
              className="w-16 h-16 bg-gray-200 rounded-xl border dark:border-gray-700"
              alt={fundraise?.pubId}
            />
            <div className="space-y-1">
              <div className="">{fundraise?.metadata?.name}</div>
              <div className="text-sm text-gray-500">
                {fundraise?.metadata?.description}
              </div>
              {fundraise?.stats?.totalAmountOfCollects !== 0 && (
                <div className="flex items-center space-x-1 text-sm">
                  <UsersIcon className="w-3 h-3" />
                  <div>
                    {humanize(fundraise?.stats?.totalAmountOfCollects)}{' '}
                    {fundraise?.stats?.totalAmountOfCollects > 1
                      ? 'donors'
                      : 'donor'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default FundraiseCampaign
