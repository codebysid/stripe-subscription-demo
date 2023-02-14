import React, { useState } from 'react'
import {useElements , useStripe , CardElement} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
    const [name ,setName]=useState('')
    const [email,setEmail]=useState('')

    const stripe=useStripe()
    const elementsHook=useElements()

    const subscribe=async()=>{
        try{
            const paymentMethod=await stripe.createPaymentMethod({
                type:'card',
                card:elementsHook.getElement('card')
            })

            const data=await fetch('http://localhost:5500/checkout',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name,
                    email,
                    paymentMethod:paymentMethod && paymentMethod.paymentMethod.id
                })
            })
            const res=await data.json()
            const confirm=await stripe.confirmCardPayment(res.clientSecret)
            if(confirm.error){
                window.location='/cancel'
                return null
            }

            window.location='/success'

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="paymentForm">
        <input type="text" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Name"
        />
        
        <input type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
        />
        <div>
      <CardElement/>
      </div>
      <button
      onClick={subscribe}
      >Subscribe to iPangrams's NewsLetter</button>
    </div>
  )
}

export default CheckoutForm
