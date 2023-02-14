import React from 'react'
import '../App.css'
const Success = () => {
  return (
    <div className='successDiv'>
      <span className='successText'>Subscription is Active ✅</span>
      <button 
      onClick={()=>window.location='/'}
      >Get Back to Home Page</button>
    </div>
  )
}

export default Success
