import React from 'react';
import LoginSignup from '../components/LoginSignup';

function Login({ onLogin }) {
  return <LoginSignup onLogin={onLogin} isLogin={true} />;
}

export default Login;