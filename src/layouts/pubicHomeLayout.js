import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './../modules/common/header/navBarPublic';

const PublicHomeLayout = (props) => (
  <div>
    <NavBar />
    <div>
      {props.children}
    </div>
  </div>
);

PublicHomeLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicHomeLayout;
