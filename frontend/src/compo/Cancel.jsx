import React from 'react'

const Cancel = () => {
  return (
    <div>
      <div className='successDiv'>
      <span className='successText'>Payment Unsuccessfull ❌</span>
      <button 
      onClick={()=>window.location='/'}
      >Get Back to Home Page</button>
    </div>
    </div>
  )
}

export default Cancel
