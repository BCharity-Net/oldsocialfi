import ProgramProfile from '@components/Shared/ProgramProfile'
import { Card, CardBody } from '@components/UI/Card'
import { Program } from '@generated/bcharitytypes'
import React from 'react'

interface Props {
  programs: Program[]
}

const List: React.FC<Props> = ({ programs }) => {
  return (
    <Card>
      <CardBody className="space-y-6">
        {programs.map((program: Program, index: number) => (
          <div key={index}>
            <ProgramProfile program={program} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default List
