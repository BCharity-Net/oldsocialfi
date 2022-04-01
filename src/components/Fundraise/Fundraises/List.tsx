import FundraiseCampaign from '@components/Shared/FundraiseCampaign'
import { Card, CardBody } from '@components/UI/Card'
import { Fundraise } from '@generated/bcharitytypes'
import React from 'react'

interface Props {
  fundraises: Fundraise[]
}

const List: React.FC<Props> = ({ fundraises }) => {
  return (
    <Card>
      <CardBody className="space-y-6">
        {fundraises.map((fundraise: Fundraise, index: number) => (
          <div key={index}>
            <FundraiseCampaign fundraise={fundraise} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default List
