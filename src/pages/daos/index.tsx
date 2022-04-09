import { InitSwAuth } from '@skill-wallet/auth'
import { useEffect } from 'react'
import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sw-auth': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

function DAO() {
  useEffect(() => {
    InitSwAuth()
  }, [])

  return (
    <div className="py-12 mb-4 bg:size-full bg-white border-b bg-hero">
      <div className="px-12 py-12 ml-12">
        <p className="py-12 text-blue-600">Welcome to your DAO!</p>
        <sw-auth
          use-dev="true"
          use-button-options="true"
          partner-key="80e7fd51b5f9056a9d2dac8aef923ba79800b806"
        ></sw-auth>
      </div>
    </div>
  )
}

export default DAO
