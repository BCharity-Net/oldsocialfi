import { gql } from '@apollo/client'

export const VolunteerFragment = gql`
  fragment VolunteerFragment on Post {
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
