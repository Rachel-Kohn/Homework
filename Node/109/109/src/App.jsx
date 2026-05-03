import { useState } from 'react';
import PostsWithComments from './PostsWithComments';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {!user ? (
        <>
          {showRegister ? (
            <>
              <Register setUser={setUser} />
              <p onClick={() => setShowRegister(false)}>Login instead</p>
            </>
          ) : (
            <>
              <Login setUser={setUser} />
              <p onClick={() => setShowRegister(true)}>Register instead</p>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Welcome {user}</h1>
          <PostsWithComments user={user} />
        </>
      )}
    </>
  );
}

export default App;