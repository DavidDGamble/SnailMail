import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import * as u from './../utilities/utilities'

function AddressForm(props) {
  // const [senderInfo, setSenderInfo] = useState({})
  // const [receiverInfo, setReceiverInfo] = useState({})
  const [senderError, setSenderError] = useState(null)
  const [receiverError, setReceiverError] = useState(null)
  const [viewCheckout, setViewCheckout] = useState(false)

  // const { frontTemplate, backTemplate } = props
  const { postcardInfo, setPostcardInfo } = props

  const handleSubmit = async (sender, receiver) => {
    // const result = await u.createPostcard(bodyInfo)
    
    // if (result.status === 'ready') {
    //   setViewCheckout(true)
    // }
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
      to: sender,
      from: receiver
    }))
    localStorage.setItem('postcardInfo', JSON.stringify(postcardInfo))
    setViewCheckout(true)
  } 

  const navigate = useNavigate()
  useEffect(() => {
    if (viewCheckout) navigate('/checkout', { replace: true })
  }, [viewCheckout])
  
  return (
    <div className="address-form">
      <h1>Sender and Receiver Info</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        const senderInfo = ({
          addressLine1: event.target.toAddress.value,
          city: event.target.toCity.value,
          provinceOrState: event.target.toState.value,
          postalOrZip: event.target.toZip.value,
          firstName: event.target.toFirstName.value,
          lastName: event.target.toLastName.value,
        })
        const receiverInfo = ({
          addressLine1: event.target.fromAddress.value,
          city: event.target.fromCity.value,
          provinceOrState: event.target.fromState.value,
          postalOrZip: event.target.fromZip.value,
          firstName: event.target.fromFirstName.value,
          lastName: event.target.fromLastName.value,
        })
        // setPostcardInfo(Object.assign(postcardInfo, {
        //   to: senderInfo,
        //   from: receiverInfo
        // }))
        // console.log(postcardInfo)
        // const body = {
        //   to: senderInfo,
        //   from: receiverInfo,
        //   frontTempId: postcardInfo.frontTemp,
        //   backTempId: postcardInfo.backTemp
        // }
        handleSubmit(senderInfo, receiverInfo)
      }}>
        {senderError}
        <h3>Sender's Info</h3>
        <input 
          type="text"
          name="toAddress"
          placeholder="Address" 
          required /><br/>
        <input 
          type="text"
          name="toCity"
          placeholder="City"
          required /><br/>
        <input 
          type="text"
          name="toState"
          placeholder="State of Province"
          required /><br/>
        <input 
          type="text"
          name="toZip"
          placeholder="Postal or Zip Code"
          required /><br/>
        <input 
          type="text"
          name="toFirstName"
          placeholder="Sender's First Name"
          required /><br/>
        <input 
          type="text"
          name="toLastName"
          placeholder="Sender's Last Name"
          required />
        {receiverError}
        <h3>Receiver's Info</h3>
        <input 
          type="text"
          name="fromAddress"
          placeholder="Address"
          required /><br/>
        <input 
          type="text"
          name="fromCity"
          placeholder="City"
          required /><br/>
        <input 
          type="text"
          name="fromState"
          placeholder="State of Province"
          required /><br/>
        <input 
          type="text"
          name="fromZip"
          placeholder="Postal or Zip Code"
          required /><br/>
        <input 
          type="text"
          name="fromFirstName"
          placeholder="Receiver's First Name"
          required /><br/>
        <input 
          type="text"
          name="fromLastName"
          placeholder="Receiver's Last Name"
          required /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

AddressForm.propTypes = {
  // senderInfo: PropTypes.object,
  // setSenderInfo: PropTypes.func,
  // receiverInfo: PropTypes.object,
  // setReceiverInfo: PropTypes.func,
  // frontTemplate: PropTypes.string,
  // backTemplate: PropTypes.string
  postcardInfo: PropTypes.object,
  setPostcardInfo: PropTypes.func
}

export default AddressForm