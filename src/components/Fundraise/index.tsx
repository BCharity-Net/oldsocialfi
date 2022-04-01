import { gql, useQuery } from '@apollo/client'
import Feed from '@components/Comment/Feed'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { PageLoading } from '@components/UI/PageLoading'
import { FundraiseFragment } from '@gql/FundraiseFragment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Custom404 from 'src/pages/404'

import Details from './Details'

const FUNDRAISE_QUERY = gql`
  query Post($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        ...FundraiseFragment
      }
    }
  }
  ${FundraiseFragment}
`

const ViewFundraise: NextPage = () => {
  const {
    query: { id }
  } = useRouter()
  const { data, loading } = useQuery(FUNDRAISE_QUERY, {
    variables: { request: { publicationId: id } },
    skip: !id
  })

  if (loading || !data)
    return <PageLoading message="Loading Fundraising Campaign" />
  // if (
  //   !data.publication ||
  //   data.publication?.metadata?.attributes[0]?.value !== 'fundraiser'
  // )
  //   return <Custom404 />
  if (
    !data.publication ||
    data.publication?.metadata?.attributes[0]?.value !== 'fundraise'
  )
    return <Custom404 />

  return (
    <GridLayout className="pt-6">
      <GridItemFour>
        <Details fundraise={data.publication} />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Feed post={data.publication} type="fundraise post" />
      </GridItemEight>
    </GridLayout>
  )
}

export default ViewFundraise
