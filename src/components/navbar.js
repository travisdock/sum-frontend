import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <div>
      <Link to="/login" className="nav" >Login</Link>
      <Link to="/about" className="nav" >About</Link>
      <Link to="/signup" className="nav" >Signup</Link>
      <Link to="/dashboard" className="nav" >Dashboard</Link>
    </div>
  )
}

export default navbar;
