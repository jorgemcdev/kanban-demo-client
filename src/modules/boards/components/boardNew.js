import React from 'react';
import PropTypes from 'prop-types';

import Glyph from './../../common/utils/glyph';

const BoardNew = ({ handleNew }) => (
  <div className="col-xs-4 col-sm-2">
    <button className="btn btn-default" onClick={handleNew}>
      <Glyph icon="glyphicon-plus" text=" New Board" />
    </button>
  </div>
);

BoardNew.propTypes = {
  handleNew: PropTypes.func.isRequired
};

export default BoardNew;
