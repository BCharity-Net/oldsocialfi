import { Volunteer } from '@generated/bcharitytypes'
import { UsersIcon } from '@heroicons/react/outline'
import { humanize } from '@lib/humanize'
import Link from 'next/link'
import React from 'react'

interface Props {
  volunteer: Volunteer
}

const volunteerOpportunity: React.FC<Props> = ({ volunteer }) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/volunteers/${volunteer?.pubId}`}>
        <a>
          <div className="flex items-center space-x-3">
            <img
              src={
                volunteer?.metadata?.cover?.original?.url
                  ? volunteer?.metadata?.cover?.original?.url
                  : `https://avatar.tobi.sh/${volunteer?.pubId}.png`
              }
              className="w-16 h-16 bg-gray-200 rounded-xl border dark:border-gray-700"
              alt={volunteer?.pubId}
            />
            <div className="space-y-1">
              <div className="">{volunteer?.metadata?.name}</div>
              <div className="text-sm text-gray-500">
                {volunteer?.metadata?.description}
              </div>
              {volunteer?.stats?.totalAmountOfCollects !== 0 && (
                <div className="flex items-center space-x-1 text-sm">
                  <UsersIcon className="w-3 h-3" />
                  <div>
                    {humanize(volunteer?.stats?.totalAmountOfCollects)}{' '}
                    {volunteer?.stats?.totalAmountOfCollects > 1
                      ? 'volunteers'
                      : 'volunteer'}
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

export default volunteerOpportunity
