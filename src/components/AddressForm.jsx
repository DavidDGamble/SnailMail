import React from "react";
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

function AddressForm(props) {
  const { senderInfo, setSenderInfo, receiverInfo, setReceiverInfo, frontTemplate, backTemplate } = props
  
  return (
    <div className="address-form">
      <h1>Sender and Receiver Info</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        setSenderInfo({
          addressLine1: event.target.toAddress.value,
          city: event.target.toCity.value,
          provinceOrState: event.target.toState.value,
          postalOrZip: event.target.toZip.value,
          firstName: event.target.toFirstName.value,
          lastName: event.target.toLastName.value,
        })
        setReceiverInfo({
          addressLine1: event.target.fromAddress.value,
          city: event.target.fromCity.value,
          provinceOrState: event.target.fromState.value,
          postalOrZip: event.target.fromZip.value,
          firstName: event.target.fromFirstName.value,
          lastName: event.target.fromLastName.value,
        })
        const body = {
          to: senderInfo,
          from: receiverInfo,
          frontTempId: frontTemplate,
          backTempId: backTemplate
        }
        console.log(senderInfo)
        console.log(receiverInfo)
        const result = u.createPostcard(body)
        console.log(JSON.stringify(result))
      }}>
        <h3>Sender's Info</h3><hr/>
        <input 
          type="text"
          name="toAddress"
          placeholder="Address" 
          required />
        <input 
          type="text"
          name="toCity"
          placeholder="City"
          required />
        <input 
          type="text"
          name="toState"
          placeholder="State of Province"
          required />
        <input 
          type="text"
          name="toZip"
          placeholder="Postal or Zip Code"
          required />
        <input 
          type="text"
          name="toFirstName"
          placeholder="Sender's First Name"
          required />
        <input 
          type="text"
          name="toLastName"
          placeholder="Sender's Last Name"
          required />
        <h3>Receiver's Info</h3><hr/>
        <input 
          type="text"
          name="fromAddress"
          placeholder="Address"
          required />
        <input 
          type="text"
          name="fromCity"
          placeholder="City"
          required />
        <input 
          type="text"
          name="fromState"
          placeholder="State of Province"
          required />
        <input 
          type="text"
          name="fromZip"
          placeholder="Postal or Zip Code"
          required />
        <input 
          type="text"
          name="fromFirstName"
          placeholder="Receiver's First Name"
          required />
        <input 
          type="text"
          name="fromLastName"
          placeholder="Receiver's Last Name"
          required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

// addressLine1: '47 Dietz Ave S',
// city: 'Las Vegas',
// provinceOrState: 'NV',
// postalOrZip: '12345',
// firstName: 'John',
// lastName: 'Adams',

AddressForm.propTypes = {
  senderInfo: PropTypes.object,
  setSenderInfo: PropTypes.func,
  receiverInfo: PropTypes.object,
  setReceiverInfo: PropTypes.func,
  frontTemplate: PropTypes.string,
  backTemplate: PropTypes.string
}

export default AddressForm