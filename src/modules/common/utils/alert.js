import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ style, title, text }) => (
  <div className={`alert ${style} fade in`}>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

Alert.propTypes = {
  style: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default Alert;
