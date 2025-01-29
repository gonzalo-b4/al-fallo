import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import CreateStore from './components/CreateStore';
import ApproveStores from './components/ApproveStores';
import ApprovedStores from './components/ApprovedStores';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  return (
    <div>
      <h1>Marketplace</h1>
      <Register />
      <Login setToken={setToken} setRole={setRole} />
      {token && (
        <>
          {role === 'owner' && <CreateStore token={token} />}
          {role === 'admin' && (
            <>
              <ApproveStores token={token} />
              <ApprovedStores token={token} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
