import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LogoutButton() {
  const history = useNavigate();

  const handleLogout = () => {
    Cookies.remove('user');

    history('/login');
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

export default LogoutButton;
