import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import Collectors from '@components/Shared/Collectors'
import { Modal } from '@components/UI/Modal'
import AppContext from '@components/utils/AppContext'
import { Volunteer } from '@generated/bcharitytypes'
import { ClockIcon, HashtagIcon, UsersIcon } from '@heroicons/react/outline'
import { humanize } from '@lib/humanize'
import { linkifyOptions } from '@lib/linkifyOptions'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Linkify from 'linkify-react'
import React, { useContext, useState } from 'react'

import Join from './Join'

dayjs.extend(relativeTime)

export const HAS_JOINED_QUERY = gql`
  query DoesFollow($request: HasCollectedRequest!) {
    hasCollected(request: $request) {
      results {
        collected
      }
    }
  }
`

interface Props {
  volunteer: Volunteer
}

const Details: React.FC<Props> = ({ volunteer }) => {
  const { currentUser } = useContext(AppContext)
  const [showMembersModal, setShowMembersModal] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const { loading: joinLoading } = useQuery(HAS_JOINED_QUERY, {
    variables: {
      request: {
        collectRequests: {
          publicationIds: volunteer.pubId,
          walletAddress: currentUser?.ownedBy
        }
      }
    },
    skip: !currentUser || !volunteer,
    onCompleted(data) {
      setJoined(data?.hasCollected[0]?.results[0]?.collected)
    }
  })

  const MetaDetails = ({
    children,
    icon
  }: {
    children: React.ReactChild
    icon: React.ReactChild
  }) => (
    <div className="flex gap-2 items-center">
      {icon}
      <div>{children}</div>
    </div>
  )

  return (
    <div className="px-5 mb-4 sm:px-0">
      <div className="space-y-5">
        <div className="relative w-32 h-32 sm:w-72 sm:h-72">
          <img
            src={
              volunteer?.metadata?.cover?.original?.url
                ? volunteer?.metadata?.cover?.original?.url
                : `https://avatar.tobi.sh/${volunteer?.pubId}.svg`
            }
            className="w-32 h-32 bg-gray-200 rounded-xl ring-8 ring-gray-50 sm:w-72 sm:h-72 dark:bg-gray-700 dark:ring-black"
            alt={volunteer?.pubId}
          />
        </div>
        <div className="pt-3 space-y-1">
          <div className="flex gap-1.5 items-center text-2xl font-bold truncate">
            <div className="truncate">{volunteer?.metadata.name}</div>
          </div>
        </div>
        <div className="space-y-5">
          {volunteer?.metadata.description && (
            <div className="mr-0 leading-7 sm:mr-10 linkify">
              <Linkify tagName="div" options={linkifyOptions}>
                {volunteer?.metadata.description}
              </Linkify>
            </div>
          )}
          {joinLoading ? (
            <div className="w-28 rounded-lg h-[34px] shimmer" />
          ) : joined ? (
            <div className="py-0.5 px-2 text-sm text-white rounded-lg shadow-sm bg-brand-500 w-fit">
              Volunteer
            </div>
          ) : (
            <Join volunteer={volunteer} setJoined={setJoined} />
          )}
          <div className="space-y-2">
            <MetaDetails icon={<HashtagIcon className="w-4 h-4" />}>
              {volunteer?.pubId}
            </MetaDetails>
            <MetaDetails icon={<UsersIcon className="w-4 h-4" />}>
              <>
                <button onClick={() => setShowMembersModal(!showMembersModal)}>
                  {humanize(volunteer?.stats?.totalAmountOfCollects)}{' '}
                  {volunteer?.stats?.totalAmountOfCollects > 1
                    ? 'volunteers'
                    : 'volunteer'}
                </button>
                <Modal
                  title={
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="w-5 h-5 text-brand-500" />
                      <div>Volunteers</div>
                    </div>
                  }
                  size="md"
                  show={showMembersModal}
                  onClose={() => setShowMembersModal(!showMembersModal)}
                >
                  <Collectors pubId={volunteer.pubId} />
                </Modal>
              </>
            </MetaDetails>
            <MetaDetails icon={<UsersIcon className="w-4 h-4" />}>
              <div>
                {humanize(volunteer?.stats?.totalAmountOfComments)}{' '}
                {volunteer?.stats?.totalAmountOfComments > 1 ? 'posts' : 'post'}
              </div>
            </MetaDetails>
            <MetaDetails icon={<ClockIcon className="w-4 h-4" />}>
              {dayjs(new Date(volunteer?.createdAt)).fromNow()}
            </MetaDetails>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
