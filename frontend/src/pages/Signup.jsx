import React from 'react';
import LoginSignup from '../components/LoginSignup';

function Signup({ onLogin }) {
  return <LoginSignup onLogin={onLogin} isLogin={false} />;
}

export default Signup;