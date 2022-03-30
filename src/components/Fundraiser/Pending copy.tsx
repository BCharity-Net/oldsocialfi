import { gql, useQuery } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Spinner } from '@components/UI/Spinner'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

const OPPORTUNITY_INDEXED_QUERY = gql`
  query HasOpportunityCreated($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        id
      }
    }
  }
`

interface Props {
  txHash: string
}

const Pending: React.FC<Props> = ({ txHash }) => {
  const { data, loading } = useQuery(OPPORTUNITY_INDEXED_QUERY, {
    variables: {
      request: { txHash }
    },
    pollInterval: 1000
  })

  return (
    <div className="p-5 font-bold text-center">
      {loading || !data?.publication?.id ? (
        <div className="space-y-3">
          <Spinner className="mx-auto" />
          <div>Volunteer opportunity creation in progress, please wait!</div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-[40px]">🌿</div>
          <div>Volunteer opportunty created successfully</div>
          <div className="pt-3">
            <Link href={`/posts/${data?.publication?.id}`}>
              <a>
                <Button
                  className="mx-auto"
                  icon={<ArrowRightIcon className="mr-1 w-4 h-4" />}
                >
                  Go to opportunity
                </Button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pending
