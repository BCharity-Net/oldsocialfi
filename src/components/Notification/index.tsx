import { gql, useQuery } from '@apollo/client'
import { Card } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { PageLoading } from '@components/UI/PageLoading'
import { Spinner } from '@components/UI/Spinner'
import AppContext from '@components/utils/AppContext'
import {
  BCharityNewCollectNotification,
  BCharityNewCommentNotification,
  BCharityNewMirrorNotification
} from '@generated/bcharitytypes'
import { Notification } from '@generated/types'
import { CommentFragment } from '@gql/CommentFragment'
import { PostFragment } from '@gql/PostFragment'
import { BellIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import useInView from 'react-cool-inview'
import Custom404 from 'src/pages/404'

import CollectNotification from './Type/CollectNotification'
import CommentNotification from './Type/CommentNotification'
import FollowerNotification from './Type/FollowerNotification'
import MirrorNotification from './Type/MirrorNotification'

const NOTIFICATIONS_QUERY = gql`
  query Notifications($request: NotificationRequest!) {
    notifications(request: $request) {
      items {
        ... on NewFollowerNotification {
          wallet {
            address
            defaultProfile {
              name
              handle
              picture {
                ... on MediaSet {
                  original {
                    url
                  }
                }
              }
            }
          }
          isFollowedByMe
          createdAt
        }
        ... on NewCommentNotification {
          profile {
            handle
          }
          comment {
            ...CommentFragment
            commentOn {
              ... on Post {
                id
              }
              ... on Comment {
                id
              }
              ... on Mirror {
                id
              }
              __typename
            }
          }
        }
        ... on NewMirrorNotification {
          profile {
            handle
          }
          publication {
            ... on Post {
              ...PostFragment
            }
            ... on Comment {
              ...CommentFragment
            }
          }
        }
        ... on NewCollectNotification {
          wallet {
            address
            defaultProfile {
              handle
            }
          }
          collectedPublication {
            ... on Post {
              ...PostFragment
            }
            ... on Comment {
              ...CommentFragment
            }
          }
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  ${PostFragment}
  ${CommentFragment}
`

const NotificationWrapper = ({ children }: { children: React.ReactChild }) => (
  <div className="flex flex-grow justify-center py-8 px-0 sm:px-6 lg:px-8">
    <div className="space-y-3 w-full max-w-4xl">
      <div className="flex items-center px-5 pb-3 space-x-1.5 text-xl font-bold sm:px-0">
        <BellIcon className="w-6 h-6 text-brand-500" />
        <div>Notifications</div>
      </div>
      <div>{children}</div>
    </div>
  </div>
)

const Notification: NextPage = () => {
  const { currentUser } = useContext(AppContext)
  const { data, loading, error, fetchMore } = useQuery(NOTIFICATIONS_QUERY, {
    variables: {
      request: { profileId: currentUser?.id, limit: 10 }
    }
  })

  const pageInfo = data?.notifications?.pageInfo
  const { observe } = useInView({
    threshold: 1,
    onEnter: () => {
      fetchMore({
        variables: {
          request: {
            profileId: currentUser?.id,
            cursor: pageInfo?.next,
            limit: 10
          }
        }
      })
    }
  })

  if (!currentUser) return <Custom404 />
  if (loading) return <PageLoading message="Loading notifications" />
  if (data?.notifications?.items?.length === 0)
    return (
      <NotificationWrapper>
        <EmptyState
          message={
            <div>
              <span>Inbox zero!</span>
            </div>
          }
          icon={<BellIcon className="w-8 h-8 text-brand-500" />}
        />
      </NotificationWrapper>
    )

  const notifications = data?.notifications?.items

  return (
    <NotificationWrapper>
      <Card className="mx-auto">
        {error && (
          <ErrorMessage
            className="m-5"
            title="Failed to load notification"
            error={error}
          />
        )}
        <div className="divide-y">
          {notifications?.map((notification: Notification, index: number) => (
            <div key={index}>
              {notification.__typename === 'NewFollowerNotification' && (
                <FollowerNotification notification={notification} />
              )}
              {notification.__typename === 'NewCommentNotification' && (
                <CommentNotification
                  notification={notification as BCharityNewCommentNotification}
                />
              )}
              {notification.__typename === 'NewMirrorNotification' && (
                <MirrorNotification
                  notification={notification as BCharityNewMirrorNotification}
                />
              )}
              {notification.__typename === 'NewCollectNotification' && (
                <CollectNotification
                  notification={notification as BCharityNewCollectNotification}
                />
              )}
            </div>
          ))}
        </div>
        {pageInfo?.next && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="sm" />
          </span>
        )}
      </Card>
    </NotificationWrapper>
  )
}

export default Notification
