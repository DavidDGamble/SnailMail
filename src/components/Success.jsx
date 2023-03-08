import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

const Success = (props) => {
  const [processed, setProcessed] = useState(false)

  const postcardInfo = JSON.parse(localStorage.getItem('postcardInfo'))
  const processPostcard = async (info) => {
    if (processed || info == null) return console.log(processed)
    const result = await u.createPostcard(info)
    console.log(`Status: ${result.status}`)
    localStorage.removeItem('postcardInfo')
    setProcessed(true)
  }

  useEffect(() => {
    processPostcard(postcardInfo)
  }, [])
  return (
    <div>
      <h1>Success</h1>
      <h2>Thank you for your purchase!</h2>
    </div>
  );
};

Success.propTypes = {
  postcardInfo: PropTypes.object
}

export default Success;