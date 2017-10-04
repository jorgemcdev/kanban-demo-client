import React from 'react';
import PropTypes from 'prop-types';

import Glyph from './../../common/utils/glyph';

const CardNew = ({ listId, boardId, handleNew }) => (
  <div className="list-add">
    <button className="btn btn-prymary" onClick={() => handleNew({ listId, boardId })}>
      <Glyph icon="glyphicon-plus" />
    </button>
  </div>
);

CardNew.propTypes = {
  handleNew: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default CardNew;
