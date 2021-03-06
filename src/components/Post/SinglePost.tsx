import 'linkify-plugin-mention'

import Attachments from '@components/Shared/Attachments'
import IFramely from '@components/Shared/IFramely'
import UserProfile from '@components/Shared/UserProfile'
import { Card, CardBody } from '@components/UI/Card'
import { BCharityPost } from '@generated/bcharitytypes'
import { getURLs } from '@lib/getURLs'
import clsx from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import React from 'react'

import PostActions from './Actions'
import PostBody from './PostBody'
import PostType from './Type'

dayjs.extend(relativeTime)

interface Props {
  post: BCharityPost
  type?: string
  showCard?: boolean
}

const SinglePost: React.FC<Props> = ({ post, type, showCard = true }) => {
  return (
    <Card className={clsx({ 'border-0': !showCard })}>
      <CardBody>
        <PostType post={post} type={type} />
        <div className="flex justify-between pb-4">
          <UserProfile profile={post.profile} />
          <Link href={`/posts/${post.pubId}`}>
            <a className="text-sm text-gray-500" href={`/posts/${post.pubId}`}>
              {dayjs(new Date(post.createdAt)).fromNow()}
            </a>
          </Link>
        </div>
        <PostBody post={post} />
        {post?.metadata?.media?.length > 0 ? (
          <Attachments attachments={post?.metadata?.media} />
        ) : (
          post?.metadata?.content &&
          getURLs(post?.metadata?.content)?.length > 0 && (
            <IFramely url={getURLs(post?.metadata?.content)[0]} />
          )
        )}
      </CardBody>
      <PostActions post={post} />
    </Card>
  )
}

export default SinglePost
