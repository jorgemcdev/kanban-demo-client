import React from 'react';
import { Link } from 'react-router';

const Banner = () => (
  <div className="banner">
    <div>
      <h1>KanBan</h1>
      <p>Start planning your Life and Work with this Cool App</p>
      <Link className="btn btn-default" to="/signup">Write your Plans</Link>
    </div>
  </div>
);

export default Banner;
