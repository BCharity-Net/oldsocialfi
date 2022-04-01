import { gql, useQuery } from '@apollo/client'
import { GridItemSix, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { ProgramFragment } from '@gql/ProgramFragment'
import { ChartBarIcon, FireIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import React from 'react'

import List from './List'

const PROGRAM_QUERY = gql`
  query (
    $topCommented: ExplorePublicationRequest!
    $topCollected: ExplorePublicationRequest!
  ) {
    topCommented: explorePublications(request: $topCommented) {
      items {
        ... on Post {
          ...ProgramFragment
        }
      }
    }
    topCollected: explorePublications(request: $topCollected) {
      items {
        ... on Post {
          ...ProgramFragment
        }
      }
    }
  }
  ${ProgramFragment}
`

const Programs: NextPage = () => {
  const { data, loading } = useQuery(PROGRAM_QUERY, {
    variables: {
      topCommented: {
        sources:
          'BCharity Program' && 'BCharity Community' && 'Lenster Community',
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST'],
        limit: 10
      },
      topCollected: {
        sources:
          'BCharity Program' && 'Bcahrity Community' && 'Lenster Community',
        sortCriteria: 'TOP_COLLECTED',
        publicationTypes: ['POST'],
        limit: 10
      }
    }
  })

  if (loading || !data) return <PageLoading message="Loading program" />

  return (
    <GridLayout className="pt-6">
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <FireIcon className="w-5 h-5 text-yellow-500" />
          <div>Most Active</div>
        </div>
        <List programs={data?.topCommented.items} />
      </GridItemSix>
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <ChartBarIcon className="w-5 h-5 text-green-500" />
          <div>Fastest Growing</div>
        </div>
        <List programs={data?.topCollected.items} />
      </GridItemSix>
    </GridLayout>
  )
}

export default Programs
