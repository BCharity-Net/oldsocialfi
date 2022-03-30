import { gql, useQuery } from '@apollo/client'
import { GridItemSix, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { PostFragment } from '@gql/PostFragment'
import { ChartBarIcon, FireIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import React from 'react'

import List from './List'

const FUNDRAISER_QUERY = gql`
  query (
    $topCommented: ExplorePublicationRequest!
    $topCollected: ExplorePublicationRequest!
  ) {
    topCommented: explorePublications(request: $topCommented) {
      items {
        ... on Post {
          ...PostFragment
        }
      }
    }
    topCollected: explorePublications(request: $topCollected) {
      items {
        ... on Post {
          ...PostFragment
        }
      }
    }
  }
  ${PostFragment}
`

const Communities: NextPage = () => {
  const { data, loading } = useQuery(FUNDRAISER_QUERY, {
    variables: {
      topCommented: {
        sources: 'Lenster Community',
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST'],
        limit: 10
      },
      topCollected: {
        sources: 'Lenster Community',
        sortCriteria: 'TOP_COLLECTED',
        publicationTypes: ['POST'],
        limit: 10
      }
    }
  })

  if (loading || !data) return <PageLoading message="Loading community" />

  return (
    <GridLayout className="pt-6">
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <FireIcon className="w-5 h-5 text-yellow-500" />
          <div>Most Active</div>
        </div>
        <List communities={data?.topCommented.items} />
      </GridItemSix>
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <ChartBarIcon className="w-5 h-5 text-green-500" />
          <div>Fastest Growing</div>
        </div>
        <List communities={data?.topCollected.items} />
      </GridItemSix>
    </GridLayout>
  )
}

export default Communities
