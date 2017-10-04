import React from 'react';
import PropTypes from 'prop-types';

const LoadingIcon = ({ isLoading, color }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <i
      className="glyphicon glyphicon-refresh glyphicon-spin"
      style={{ color: color || 'black' }}
    >
    </i>
  );
};

LoadingIcon.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.func
};

export default LoadingIcon;
