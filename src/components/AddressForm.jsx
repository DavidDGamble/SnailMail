import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import * as u from './../utilities/utilities'
import './../styles/addressForm.css'

function AddressForm(props) {
  const [senderError, setSenderError] = useState(null)
  const [receiverError, setReceiverError] = useState(null)
  const [viewCheckout, setViewCheckout] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { postcardInfo, setPostcardInfo } = props

  const handleSubmit = async (sender, receiver) => {
    setLoading(true)
    setSenderError(null)
    setReceiverError(null)
    const senderResult = await u.createContact(sender)
    const receiverResult = await u.createContact(receiver)
    console.log(`SENDER: ${senderResult.addressStatus}`)
    console.log(`RECEIVER: ${receiverResult.addressStatus}`)

    if (senderResult.addressStatus === 'failed') {
      setSenderError("Address could not be verified.")
      return
    }
    if (receiverResult.addressStatus === 'failed') {
      setReceiverError("Address could not be verified.")
      return
    }

    setPostcardInfo(Object.assign(postcardInfo, {
      to: receiver,
      from: sender
    }))
    localStorage.setItem('postcardInfo', JSON.stringify(postcardInfo))
    setLoading(false)
    setViewCheckout(true)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (viewCheckout) navigate('/checkout', { replace: true })
  }, [viewCheckout])

  return (
    <div className="address-form">
      <button className="main-btn" onClick={props.handleTemplateForm} type="submit" disabled={isLoading} style={{marginRight: 1.5 + 'rem'}}>Back to Postcard</button>
      <button className="main-btn" onClick={props.handleHome} type="submit" disabled={isLoading}>Return Home</button>
      <h1>Sender and Receiver Info</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        const senderInfo = ({
          addressLine1: event.target.toAddress.value,
          city: event.target.toCity.value,
          provinceOrState: event.target.toState.value,
          postalOrZip: event.target.toZip.value,
          countryCode: event.target.toCountryCode.value,
          firstName: event.target.toFirstName.value,
          lastName: event.target.toLastName.value,
        })
        const receiverInfo = ({
          addressLine1: event.target.fromAddress.value,
          city: event.target.fromCity.value,
          provinceOrState: event.target.fromState.value,
          postalOrZip: event.target.fromZip.value,
          countryCode: event.target.fromCountryCode.value,
          firstName: event.target.fromFirstName.value,
          lastName: event.target.fromLastName.value,
        })
        handleSubmit(senderInfo, receiverInfo)
      }}>
        {senderError}
        <h3>Sender's Info</h3>
        <input
          type="text"
          name="toAddress"
          placeholder={postcardInfo.from != null ? postcardInfo.from.addressLine1 : "Address"}
          required /><br />
        <input
          type="text"
          name="toCity"
          placeholder="City"
          required /><br />
        <input
          type="text"
          name="toState"
          placeholder="State of Province"
          required /><br />
        <input
          type="text"
          name="toZip"
          placeholder="Postal or Zip Code"
          required /><br />
        <input
          type="text"
          name="toCountryCode"
          placeholder="2 Letter Country Code"
          maxLength={2}
          required /><br />
        <input
          type="text"
          name="toFirstName"
          placeholder="Sender's First Name"
          required /><br />
        <input
          type="text"
          name="toLastName"
          placeholder="Sender's Last Name" />
        {receiverError}
        <h3>Receiver's Info</h3>
        <input
          type="text"
          name="fromAddress"
          placeholder="Address"
          required /><br />
        <input
          type="text"
          name="fromCity"
          placeholder="City"
          required /><br />
        <input
          type="text"
          name="fromState"
          placeholder="State of Province"
          required /><br />
        <input
          type="text"
          name="fromZip"
          placeholder="Postal or Zip Code"
          required /><br />
        <input
          type="text"
          name="fromCountryCode"
          placeholder="2 Letter Country Code"
          maxLength={2}
          required /><br />
        <input
          type="text"
          name="fromFirstName"
          placeholder="Receiver's First Name"
          required /><br />
        <input
          type="text"
          name="fromLastName"
          placeholder="Receiver's Last Name" /><br />
        <button className="main-btn" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  )
}

AddressForm.propTypes = {
  postcardInfo: PropTypes.object,
  setPostcardInfo: PropTypes.func,
  handleTemplateForm: PropTypes.func,
  handleHome: PropTypes.func
}

export default AddressForm