import React from 'react';
import PropTypes from 'prop-types';
import BoardItem from './boardItem';

const BoardList = ({
  boards, toggleModal, handleEdit, handleUpdate, handleCancel, handleView, editId
}) => {
  const listItems = boards.map((board, key) =>
    <BoardItem
      key={`${board._id}`}
      board={board}
      editId={editId}
      toggleModal={toggleModal}
      handleEdit={handleEdit}
      handleUpdate={handleUpdate}
      handleCancel={handleCancel}
      handleView={handleView}
    />
  );
  return (
    <div>{listItems}</div>
  );
};

BoardList.propTypes = {
  boards: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  editId: PropTypes.string
};

export default BoardList;
