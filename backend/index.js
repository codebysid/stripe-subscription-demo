require('dotenv').config()
const express=require('express')
const cors=require('cors')
const stripe=require('stripe')(process.env.STRIPE_SECRET)
const { v4: uuidv4 } = require('uuid');
const helmet =require('helmet')
const app=express()

app.use(express.json())
app.use(cors())
app.use(helmet())

const store={
    name:"iPangram News Letter",
    price:150,
}

app.post('/checkout',async (req,res)=>{
    const {name ,email,paymentMethod} =req.body
    try{
        
        //Create a customer
        const customer=await stripe.customers.create({
            email,
            name,
            payment_method:paymentMethod,
            invoice_settings:{
                default_payment_method:paymentMethod,
            }
        })
        //Create a Product
        const product=await stripe.products.create({
            name:store.name
        })
        //Create a Subscription
        const subscription=await stripe.subscriptions.create({
            customer:customer.id,
            items:[
                {
                    price_data:{
                        currency:"INR",
                        product:product.id,
                        unit_amount:store.price *100,
                        recurring:{
                            interval:"month"
                        }
                    }
                }
            ],
            payment_settings:{
                payment_method_types:['card'],
                save_default_payment_method:'on_subscription'
            },
            expand:['latest_invoice.payment_intent']
        })
        //Send back the client secret
        res.json({
            message:"Subscription Succesfull",
            clientSecret:subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId:subscription.id
        })
    }catch(err){
        console.log(err)
    }

})

app.listen(5500)