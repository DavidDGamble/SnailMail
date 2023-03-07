import React from "react";
import PropTypes from 'prop-types'
import * as u from './../utilities/utilities'

const Success = (props) => {
  const postcardInfo = JSON.parse(localStorage.getItem('postcardInfo'))
  const processPostcard = async (info) => {
    if (info == null) return
    const result = await u.createPostcard(info)
    console.log(result)
    localStorage.removeItem('postcardInfo')
  }

  processPostcard(postcardInfo)
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