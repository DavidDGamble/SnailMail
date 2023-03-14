import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useNavigate } from "react-router-dom"
import CardIcon from "./../img/snail-logo.png"
import './../styles/checkout.css'

let stripePromise

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
  }

  return stripePromise
}

const Checkout = () => {
  const [returnHome, setReturnHome] = useState(false)
  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const item = {
    price: process.env.REACT_APP_PRICE_ID,
    quantity: 1
  }
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  }

  const redirectToCheckout = async () => {
    setLoading(true)
    localStorage.setItem('paid', 'true')

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout(checkoutOptions)
    console.log("Stripe checkout error", error)

    if (error) {
      setStripeError(error.message)
      localStorage.removeItem('paid')
    }
    setLoading(false)
  }

  if (stripeError) alert(stripeError)

  const navigate = useNavigate()
  useEffect(() => {
    if (returnHome) {
      localStorage.removeItem('postcardInfo')
      navigate('/', { replace: true })
    }
  }, [returnHome])

  return (
    <div className="checkout">
      <div className="stripe">
        <h1>Stripe Checkout</h1>
        <p className="checkout-title">Snail Mail Postcard</p>
        <h1 className="checkout-price">$2.50</h1>
        <iframe src="https://giphy.com/embed/cw7d2Xn45rpi8" width="480" height="270" frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/channelfrederator-animation-channel-frederator-snails-cw7d2Xn45rpi8"></a></p>
        <button
          className="checkout-button"
          onClick={redirectToCheckout}
          disabled={isLoading}
        >
          <div className="grey-circle">
            <div className="purple-circle">
              <img className="icon" src={CardIcon} alt="credit-card-icon" />
            </div>
          </div>
          <div className="text-container">
            <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
          </div>
        </button><br /><br />
      </div>
      <button className="main-btn" onClick={() => { setReturnHome(true) }}>Return Home</button>
    </div>
  )
}

export default Checkout
