import React from 'react';
import PropTypes from 'prop-types';

import Glyph from './../../common/utils/glyph';

const ListAdd = (props) => (
  <div className="list-add">
    <button className="btn btn-default" onClick={() => props.handleNew(props.boardId)}>
      <Glyph icon="glyphicon-plus" text=" New List" />
    </button>
  </div>
);

ListAdd.propTypes = {
  handleNew: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired
};

export default ListAdd;
