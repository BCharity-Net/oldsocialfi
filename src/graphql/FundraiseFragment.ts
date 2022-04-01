import { gql } from '@apollo/client'

export const FundraiseFragment = gql`
  fragment FundraiseFragment on Post {
    pubId: id
    metadata {
      name
      description
      content
      attributes {
        value
      }
      cover {
        original {
          url
        }
      }
    }
    stats {
      totalAmountOfCollects
      totalAmountOfComments
    }
    createdAt
  }
`
