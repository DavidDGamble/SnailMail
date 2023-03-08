import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const [returnHome, setReturnHome] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (returnHome) navigate('/', { replace: true })
  }, [returnHome])

  localStorage.removeItem('postcardInfo')
  return (
    <div>
      <h1>Cancel</h1>
      <h2>Your payment was canceled.</h2>
      <button onClick={() => {setReturnHome(true)}}>Return Home</button>
    </div>
  );
};

export default Cancel;
