import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router } from 'react-router';

// Load history
import { history } from './../store/configure-store.js';

// load Routes
import publicRoutes from './publicRoutes';
import memberRoutes from './memberRoutes';


// Public / Member Routes
const activeRoutes = (props) => {
  let myActiveRoutes;

  if (props.role === 'Member') {
    myActiveRoutes = memberRoutes;
  } else {
    myActiveRoutes = publicRoutes;
  }

  return (
    <Router history={history} key={Math.random()}>
      {myActiveRoutes}
    </Router>
  );
};

const mapStateToProps = (state) => (
  {
    role: state.authReducer.user.role
  }
);

activeRoutes.propTypes = {
  role: PropTypes.string
};

export default connect(mapStateToProps, null)(activeRoutes);
