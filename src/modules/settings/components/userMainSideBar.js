import React from 'react';
import { Link } from 'react-router';

const userMainSideBar = () => (
  <ul className="list-group">
    <li className="list-group-item"><Link to="/settings">User Dashboard</Link></li>
    <li className="list-group-item"><Link to="/details">Edit profile</Link></li>
    <li className="list-group-item"><Link to="/changepass">Change Password</Link></li>
  </ul>
);

export default userMainSideBar;
