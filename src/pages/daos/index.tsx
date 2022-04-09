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
    // <a className='text-blue-600 px-12 py-12' href='https://playground.skillwallet.id/'> Welcome to play around by clicking me!</a>
    <div className="py-12 mb-4 bg:size-full bg-white border-b bg-hero">
      <div className="px-12 py-12 ml-12">
        <a
          className="py-12 text-blue-600 underline hover:underline-offset-6 visited:text-purple-600 mt-12 pt-12"
          href="https://playground.skillwallet.id/"
        >
          {' '}
          Please try our Good DAO at the playaround first by clicking me!
        </a>
        <p className="py-12 text-purple-600">
          Cool Degen! Welcome to join Good DAO! Fly to the Moon!
        </p>
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
