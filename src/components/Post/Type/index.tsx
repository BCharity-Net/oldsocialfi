import 'linkify-plugin-mention'

import { BCharityPost } from '@generated/bcharitytypes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'
import React from 'react'

import Collected from './Collected'
import Commented from './Commented'
import Funded from './Funded'
import FundraisePost from './FundraisePost'
import Mirrored from './Mirrored'
import ProgramPost from './ProgramPost'
import VolunteerPost from './VolunteerPost'

dayjs.extend(relativeTime)

interface Props {
  post: BCharityPost
  type?: string
}

const PostType: React.FC<Props> = ({ post, type }) => {
  const { pathname } = useRouter()
  const postType = post.metadata?.attributes[0]?.value

  return (
    <>
      {post?.__typename === 'Mirror' && <Mirrored post={post} />}
      {(post?.__typename === 'Comment' &&
        type !== 'COMMENT' &&
        postType !== 'program post') ||
        ('fundraise post' && <Commented post={post} />)}
      {post?.collectedBy &&
        postType === 'fundraise' &&
        pathname !== '/notifications' && <Funded fund={post} />}
      {postType === 'fundraise post' && pathname !== '/fundraise/[id]' && (
        <FundraisePost post={post} />
      )}
      {postType === 'volunteer post' && pathname !== '/volunteers/[id]' && (
        <VolunteerPost post={post} />
      )}
      {postType === 'program post' && pathname !== '/programs/[id]' && (
        <ProgramPost post={post} />
      )}
      {(post?.collectedBy && type !== 'COLLECT' && postType !== 'program') ||
        ('fundraise post' && postType !== 'fundraise' && (
          <Collected post={post} />
        ))}
    </>
  )
}

export default PostType
