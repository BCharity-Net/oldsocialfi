import Slug from '@components/Shared/Slug'
import { BCharityPost } from '@generated/bcharitytypes'
import { UsersIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

interface Props {
  post: BCharityPost
}

const ProgramPost: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <UsersIcon className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <Link href={`/posts/${post?.commentOn?.id}`}>
          <a>Posted on</a>
        </Link>
        <Link href={`/programs/${post?.commentOn?.id}`}>
          <a>
            <Slug slug={post?.commentOn?.metadata?.name} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ProgramPost
