import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import BoardText from './boardText';
import Glyph from './../../common/utils/glyph';

const BoardItem = (props) => {
  const {
    editId, board, toggleModal, handleEdit,
    handleUpdate, handleCancel, handleView
  } = props;

  const DeleteButton = () => (
    <a
      id={board._id}
      onClick={toggleModal}
      className="close"
      aria-label="close"
    >&times;
    </a>
  );

  const BoardName = () => (
    <p>
      <b id={board._id} onClick={handleEdit} style={{ cursor: 'pointer' }}>
        {board.name}
      </b>
    </p>
  );

  const ViewButton = () => (
    <div className="view-button">
      <button
        id={board._id}
        onClick={handleView}
        type="button"
        className="btn btn-secundary"
      >
        <span id={board._id} className="glyphicon glyphicon-list" aria-hidden="true"></span>
      </button>
    </div>
  );

  const _render = (
    <div className="col-xs-12 col-sm-6 col-md-3">
      <div className="boards">
        <div>
          {editId === board._id ?
            <BoardText
              id={board._id}
              name={board.name}
              handleUpdate={handleUpdate}
              handleCancel={handleCancel}
            /> :
            <div>
              <DeleteButton />
              <BoardName />
              <ViewButton />
            </div>
          }
        </div>
      </div>
    </div>
  );
  return (
    _render
  );
};

BoardItem.propTypes = {
  editId: PropTypes.string,
  board: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired
};

export default BoardItem;
