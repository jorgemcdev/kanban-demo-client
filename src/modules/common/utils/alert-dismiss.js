import React from 'react';
import PropTypes from 'prop-types';

const AlertDismiss = ({ style, onDismiss, title, text }) => (
  <div className={`alert alert-dismissable ${style} fade in`}>
    <a
      onClick={onDismiss}
      className="close"
      data-dismiss="alert"
      aria-label="close"
    >&times;
    </a>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

AlertDismiss.propTypes = {
  style: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default AlertDismiss;
