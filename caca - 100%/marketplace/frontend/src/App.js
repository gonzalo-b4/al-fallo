import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import CreateStore from './components/CreateStore';
import ApproveStores from './components/ApproveStores';
import ApprovedStores from './components/ApprovedStores';
import Welcome from './components/Welcome';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  return (
    <div className="container" id="container">
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} setRole={setRole} />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Welcome role={role} storeName={storeName} />
          {role === 'admin' && (
            <>
              <ApproveStores token={token} role={role} />
              <ApprovedStores token={token} role={role} />
            </>
          )}
          {role === 'owner' && (
            <CreateStore token={token} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
