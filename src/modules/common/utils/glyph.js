import React from 'react';
import PropTypes from 'prop-types';

const Glyph = ({ icon, text }) => (
  <div>
    <span className={`glyphicon ${icon}`} aria-hidden="true"></span>{text}
  </div>
);

Glyph.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default Glyph;
