import VolunteerOpportunity from '@components/Shared/VolunteerOpportunity'
import { Card, CardBody } from '@components/UI/Card'
import { Volunteer } from '@generated/bcharitytypes'
import React from 'react'

interface Props {
  volunteers: Volunteer[]
}

const List: React.FC<Props> = ({ volunteers }) => {
  return (
    <Card>
      <CardBody className="space-y-6">
        {volunteers.map((volunteer: Volunteer, index: number) => (
          <div key={index}>
            <VolunteerOpportunity volunteer={volunteer} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default List
