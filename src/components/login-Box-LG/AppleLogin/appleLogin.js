import React, { useState } from 'react';
import firebase from './firebase';

const Login = () => {
  const [error, setError] = useState(null);

  const handleAppleLogin = async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleAppleLogin}>Login with Apple</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
