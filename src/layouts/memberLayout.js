import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './../modules/common/header/navBar';

const MemberLayout = (props) => (
  <div>
    <NavBar />
    <div className="container-fluid padthis">
      {props.children}
    </div>
  </div>
);

MemberLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MemberLayout;
