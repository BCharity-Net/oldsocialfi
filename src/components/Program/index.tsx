import { gql, useQuery } from '@apollo/client'
import Feed from '@components/Comment/Feed'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { ProgramFragment } from '@gql/ProgramFragment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Custom404 from 'src/pages/404'

import Details from './Details'

const PROGRAM_QUERY = gql`
  query Post($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        ...ProgramFragment
      }
    }
  }
  ${ProgramFragment}
`

const ViewProgram: NextPage = () => {
  const {
    query: { id }
  } = useRouter()
  const { data, loading } = useQuery(PROGRAM_QUERY, {
    variables: { request: { publicationId: id } },
    skip: !id
  })

  if (loading || !data) return <PageLoading message="Loading program" />
  if (
    !data.publication ||
    data.publication?.metadata?.attributes[0]?.value !== 'community'
  )
    return <Custom404 />

  return (
    <GridLayout className="pt-6">
      <GridItemFour>
        <Details program={data.publication} />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Feed post={data.publication} type="program post" />
      </GridItemEight>
    </GridLayout>
  )
}

export default ViewProgram
