import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = () => {

  const dispatch = useDispatch();
  const [auth, setAuth] = useState(null);
  const { isSignedIn } = useSelector(state => state.authReducer)

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email"
      }).then(() => {
        const auth_ = window.gapi.auth2.getAuthInstance();
        setAuth(auth_)
      })
    })
  }, [])

  useEffect(() => {
    const handleAuthChange = () => {
      if (auth.isSignedIn.get())
        dispatch(signIn(auth.currentUser.get().getId()));
      else
        dispatch(signOut());
    }
    if (auth) {
      handleAuthChange()
      auth.isSignedIn.listen(handleAuthChange);
    }
  }, [auth, dispatch])


  const handleSignIn = () => {
    auth && auth.signIn();
  }

  const handleSignOut = () => {
    auth && auth.signOut();
  }

  const renderAuthButton = () => {
    if (isSignedIn === null) return null
    else if (isSignedIn) return (
      <button className="ui red google button" onClick={() => handleSignOut()}>
        <i className="google icon" />
        Sign Out
      </button>
    )
    else return (
      <button className="ui red google button" onClick={() => handleSignIn()}>
        <i className="google icon" />
        Sign In
      </button>
    )
  }
  return (
    renderAuthButton()
  )
}

export default GoogleAuth