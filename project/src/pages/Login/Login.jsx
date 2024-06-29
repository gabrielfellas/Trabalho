import React, { useState } from 'react';
import InputDefault from '../../components/InputDefault';
import { Link } from 'react-router-dom';

import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("campo vazio")
      return
    }
    if (password.length < 8) {
      alert("Certifique-se que a senha tem no minimo oito caracteres")
      return
    }
  };

  return (
    <div className='container'>
      <div className='card'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <InputDefault id='username' placeholder='Username' value={username} action={handleUsernameChange} />
          </div>
          <div>
            <InputDefault id='password' placeholder='Password' value={password} action={handlePasswordChange} />
          </div>
          {
            (username && password.length >= 8) ? <Link to={'/Home'}><button>Login</button></Link> : <button disabled='true'>Login</button>
          }
        </form>
      </div>
    </div>
  );
}

export default Login;