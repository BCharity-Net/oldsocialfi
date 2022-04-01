import { Program } from '@generated/bcharitytypes'
import { UsersIcon } from '@heroicons/react/outline'
import { humanize } from '@lib/humanize'
import Link from 'next/link'
import React from 'react'

interface Props {
  program: Program
}

const ProgramProfile: React.FC<Props> = ({ program }) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/programs/${program?.pubId}`}>
        <a>
          <div className="flex items-center space-x-3">
            <img
              src={
                program?.metadata?.cover?.original?.url
                  ? program?.metadata?.cover?.original?.url
                  : `https://avatar.tobi.sh/${program?.pubId}.png`
              }
              className="w-16 h-16 bg-gray-200 rounded-xl border dark:border-gray-700"
              alt={program?.pubId}
            />
            <div className="space-y-1">
              <div className="">{program?.metadata?.name}</div>
              <div className="text-sm text-gray-500">
                {program?.metadata?.description}
              </div>
              {program?.stats?.totalAmountOfCollects !== 0 && (
                <div className="flex items-center space-x-1 text-sm">
                  <UsersIcon className="w-3 h-3" />
                  <div>
                    {humanize(program?.stats?.totalAmountOfCollects)}{' '}
                    {program?.stats?.totalAmountOfCollects > 1
                      ? 'members'
                      : 'member'}
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

export default ProgramProfile
