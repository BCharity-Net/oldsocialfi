import { gql, useQuery } from '@apollo/client'
import { GridItemSix, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { FundraiseFragment } from '@gql/FundraiseFragment'
import { ChartBarIcon, FireIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import React from 'react'

import List from './List'

const FUNDRAISE_QUERY = gql`
  query (
    $topCommented: ExplorePublicationRequest!
    $topCollected: ExplorePublicationRequest!
  ) {
    topCommented: explorePublications(request: $topCommented) {
      items {
        ... on Post {
          ...FundraiseFragment
        }
      }
    }
    topCollected: explorePublications(request: $topCollected) {
      items {
        ... on Post {
          ...FundraiseFragment
        }
      }
    }
  }
  ${FundraiseFragment}
`

const Fundraises: NextPage = () => {
  const { data, loading } = useQuery(FUNDRAISE_QUERY, {
    variables: {
      topCommented: {
        sources: 'BCharity Fundraise',
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST'],
        limit: 10
      },
      topCollected: {
        sources: 'BCharity Fundraise',
        sortCriteria: 'TOP_COLLECTED',
        publicationTypes: ['POST'],
        limit: 10
      }
    }
  })

  if (loading || !data)
    return <PageLoading message="Loading fundraise campaign" />

  return (
    <GridLayout className="pt-6">
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <FireIcon className="w-5 h-5 text-yellow-500" />
          <div>Most Active</div>
        </div>
        <List fundraises={data?.topCommented.items} />
      </GridItemSix>
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <ChartBarIcon className="w-5 h-5 text-green-500" />
          <div>Fastest Growing</div>
        </div>
        <List fundraises={data?.topCollected.items} />
      </GridItemSix>
    </GridLayout>
  )
}

export default Fundraises
