import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './../modules/common/header/navBarPublic';
import Footer from './../modules/common/footer/footerMain';

const PublicLayout = (props) => (
  <div>
    <NavBar />
    <div className="container padthis">
      {props.children}
    </div>
    <Footer />
  </div>
);

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicLayout;
