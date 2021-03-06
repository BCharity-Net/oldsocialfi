import 'linkify-plugin-mention'

import { BCharityPost } from '@generated/bcharitytypes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'

import Collect from './Collect'
import Comment from './Comment'
import PostMenu from './Menu'
import Mirror from './Mirror'

dayjs.extend(relativeTime)

interface Props {
  post: BCharityPost
}

const PostActions: React.FC<Props> = ({ post }) => {
  const postType = post.metadata?.attributes[0]?.value

  return (
    <>
      {postType !== 'program' && postType !== 'crowdfund' && (
        <div className="flex gap-6 items-center py-1.5 px-3 text-gray-500 border-t dark:border-gray-800">
          <Comment post={post} />
          <Mirror post={post} />
          {post?.collectModule?.__typename !== 'RevertCollectModuleSettings' &&
            post.__typename !== 'Mirror' && <Collect post={post} />}
          <PostMenu post={post} />
        </div>
      )}
    </>
  )
}

export default PostActions
