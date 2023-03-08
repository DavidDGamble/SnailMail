import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './../styles/cancel.css'

const Cancel = () => {
  const [returnHome, setReturnHome] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (returnHome) navigate('/', { replace: true })
  }, [returnHome])

  localStorage.removeItem('postcardInfo')
  return (
    <div className="cancel">
      <h1>Cancel</h1>
      <h2>Your payment was canceled.</h2>
      <button className="main-btn" onClick={() => {setReturnHome(true)}}>Return Home</button>
    </div>
  )
}

export default Cancel
