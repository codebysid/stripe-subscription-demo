import './App.css';
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './compo/CheckoutForm';
import {Elements} from '@stripe/react-stripe-js'
import {Routes,Route} from 'react-router-dom'
import Cancel from './compo/Cancel';
import Success from './compo/Success';

const stripe=loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function App() {


  return (
    <div className="App">
      <header className="App-header">
          <Elements stripe={stripe}>
        <Routes>
            <Route path='/' element={<CheckoutForm/>}/> 
            <Route path='/success' element={<Success/>}/> 
            <Route path='/cancel' element={<Cancel/>}/> 


        </Routes>
          </Elements>
      </header>
    </div>
  );
}

export default App;
