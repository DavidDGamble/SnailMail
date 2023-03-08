import React from "react"
// import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import Icon from "./../img/snail-logo.png"
import './../styles/header.css'

function Header(props) {
  // let welcomeMsg = null;
  // if (props.currUserDisplay != null) {
  //   welcomeMsg = `Welcome back, ${props.currUserDisplay}!`
  // } else {
  //   welcomeMsg = "Welcome!";
  // }

  return(
    <div className="header">
      {/* <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/sign-in">Account</Link>
      </div>  */}
      <img className="icon-left" src={Icon} alt="credit-card-icon" />
      <h1>Snail Mail</h1>
      <img className="icon-right" src={Icon} alt="credit-card-icon" />
      {/* <h3 className="welcome-msg">{welcomeMsg}</h3> */}
    </div>
  )
}

Header.propTypes = {
  currUserDisplay: PropTypes.string,
}

export default Header