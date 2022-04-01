import { gql } from '@apollo/client'

export const ProgramFragment = gql`
  fragment ProgramFragment on Post {
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
