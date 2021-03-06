import Slug from '@components/Shared/Slug'
import { BCharityPost } from '@generated/bcharitytypes'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

interface Props {
  post: BCharityPost
}

const Commented: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <ChatAlt2Icon className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <Link href={`/posts/${post?.commentOn?.id}`}>
          <a>Commenting to</a>
        </Link>
        <Link href={`/u/${post?.commentOn?.profile?.handle}`}>
          <a>
            <Slug slug={post?.commentOn?.profile?.handle} prefix="@" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Commented
