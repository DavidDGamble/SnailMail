import React, { useState } from "react";
import { auth } from './../firebase';
import PropTypes from "prop-types";

function SignIn(props) {
  let currVisibleState = null

  if (auth.currentUser != null) {
    currVisibleState =
      <div className="signOut">
        {props.signUpMessage}
        {props.signInMessage}
        {props.signOutMessage}
        <h2>Sign Out</h2>
        <button className="signout-btn" onClick={props.onSignOut}>Sign out</button>
      </div>
  } else {
    currVisibleState =
      <div className="signIn">
        <h2>Sign Up</h2>
        {props.signUpMessage}
        <form onSubmit={props.onSignUp}>
          <input
            type='text'
            name='email'
            placeholder='Email' /><br /><br />
          <input
            type='password'
            name='password'
            placeholder='Password' /><br />
          <button className="main-btn" type='submit'>Sign up</button>
        </form><br /><br />

        <h2>Sign In</h2>
        {props.signInMessage}
        <form onSubmit={props.onSignIn}>
          <input
            type='text'
            name='signinEmail'
            placeholder='Email' /><br /><br />
          <input
            type='password'
            name='signinPassword'
            placeholder='Password' /><br />
          <button className="main-btn" type='submit'>Sign in</button>
        </form><br /><br />
      </div>
  }

  return (
    <div className="sign-in">
      {currVisibleState}
    </div>
  )
}

SignIn.propTypes = {
  onSignUp: PropTypes.func,
  onSignOut: PropTypes.func,
  onSignIn: PropTypes.func,
  signUpMessage: PropTypes.string,
  signInMessage: PropTypes.string,
  signOutMessage: PropTypes.string,
}

export default SignIn