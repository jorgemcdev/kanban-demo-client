import React from 'react';
import PropTypes from 'prop-types';

const RenderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div>
    <label className="control-label">{label}</label>
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <input {...input} className="form-control" placeholder={label} type={type} />
      <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default RenderField;
