import { gql, useQuery } from '@apollo/client'
import { GridItemSix, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { VolunteerFragment } from '@gql/VolunteerFragment'
import { ChartBarIcon, FireIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import React from 'react'

import List from './List'

const VOLUNTEER_QUERY = gql`
  query (
    $topCommented: ExplorePublicationRequest!
    $topCollected: ExplorePublicationRequest!
  ) {
    topCommented: explorePublications(request: $topCommented) {
      items {
        ... on Post {
          ...VolunteerFragment
        }
      }
    }
    topCollected: explorePublications(request: $topCollected) {
      items {
        ... on Post {
          ...VolunteerFragment
        }
      }
    }
  }
  ${VolunteerFragment}
`

const Volunteers: NextPage = () => {
  const { data, loading } = useQuery(VOLUNTEER_QUERY, {
    variables: {
      topCommented: {
        sources: 'BCharity Volunteer' && 'BCharity Community',
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST'],
        limit: 10
      },
      topCollected: {
        sources:
          'BCharity Volunteer' && 'BCharity Community' && 'Lenster Community',
        sortCriteria: 'TOP_COLLECTED',
        publicationTypes: ['POST'],
        limit: 10
      }
    }
  })

  if (loading || !data)
    return <PageLoading message="Loading volunteer opportunities" />

  return (
    <GridLayout className="pt-6">
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <FireIcon className="w-5 h-5 text-yellow-500" />
          <div>Most Active</div>
        </div>
        <List volunteers={data?.topCommented.items} />
      </GridItemSix>
      <GridItemSix>
        <div className="flex items-center mb-2 space-x-1.5 font-bold text-gray-500">
          <ChartBarIcon className="w-5 h-5 text-green-500" />
          <div>Fastest Growing</div>
        </div>
        <List volunteers={data?.topCollected.items} />
      </GridItemSix>
    </GridLayout>
  )
}

export default Volunteers
