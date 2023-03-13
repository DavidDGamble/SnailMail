import React, { useState } from "react";
import PropTypes from 'prop-types'
import './../styles/home.css'

function Home(props) {
  return(
    <div className="home">
        {/* <h5>Create an account and sign in to save all the postcards you create and contacts!</h5> */}
        <h1>Welcome to Snail Mail!</h1>
        <h2>How Snail Mail Works</h2>
        <p>Hit the button below to get started creating and sending a postcard with the image of your choice to your friends and family.  On the next page you will have the opportunity to upload an image as well as a message to preview the front and back of your postcard.  After setting up your postcard continue to the next page where you will fill out the addresses of the sender and receiver.  After the addresses provided are verified you will be taken to a stripe payment page.  After a successful payment your postcard information will be sent off to be printed and shipped the following day.</p>
        <button className="main-btn" onClick={props.handleTemplateForm}>Send A Postcard!</button>
      </div>
  )
}

Home.propTypes = {
  handleTemplateForm: PropTypes.func
}

export default Home