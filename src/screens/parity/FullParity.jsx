import React from 'react'
import Parity from '../../components/parity/Parity'

const FullParity = () => {
  return (
    <div style={{
        width: '100%',
        minHeight: '95vh',
        background: 'linear-gradient(180deg, #1b5d21, #0a1d24)',
      }}>
      <div className="container">
        <Parity heading="Parity" />
      </div>
    </div>
  )
}

export default FullParity