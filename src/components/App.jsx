import React, { useState } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import PostcardControl from './PostcardControl';
import { auth } from './../firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './../app.css';

function App() {
  const [signUpSuccess, setSignUpSuccess] = useState(null)
  const [signInSuccess, setSignInSuccess] = useState(null)
  const [signOutSuccess, setSignOutSuccess] = useState(null)
  const [currUser, setCurrUser] = useState(null)

  function doSignUp(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
        setSignOutSuccess(null)
        setCurrUser(auth.currentUser.email)
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}`)
      })
  }

  function doSignIn(event) {
    event.preventDefault()
    const email = event.target.signinEmail.value
    const password = event.target.signinPassword.value
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
        setSignOutSuccess(null)
        setCurrUser(auth.currentUser.email)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      })
  }

  function doSignOut() {
    signOut(auth)
      .then(function () {
        setSignOutSuccess("You have successfully signed out!")
        setSignUpSuccess(null)
        setSignInSuccess(null)
        setCurrUser(null)
      }).catch(function (error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`)
      })
  }

  return (
    <Router>
      <div className="App">
        <Header
          currUserDisplay={currUser} />
        <Routes>
          <Route path="/sign-in" element={
            <SignIn
              onSignUp={doSignUp}
              onSignIn={doSignIn}
              onSignOut={doSignOut}
              signUpMessage={signUpSuccess}
              signInMessage={signInSuccess}
              signOutMessage={signOutSuccess}
            />} />
          <Route path="/" element={
            <PostcardControl />} />
        </Routes>
        {/* <TemplateForm /> */}
      </div>
    </Router>
  )
}

export default App