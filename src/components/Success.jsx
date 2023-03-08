import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as u from './../utilities/utilities'

const Success = () => {
  const [processed, setProcessed] = useState(false)
  const [returnHome, setReturnHome] = useState(false)

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

  const navigate = useNavigate()
  useEffect(() => {
    if (returnHome) navigate('/', { replace: true })
  }, [returnHome])
  
  return (
    <div>
      <h1>Success</h1>
      <h2>Thank you for your purchase!</h2>
      <button onClick={() => {setReturnHome(true)}}>Return Home</button>
    </div>
  );
};

export default Success;