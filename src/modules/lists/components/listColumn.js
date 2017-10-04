import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ItemTypes from './../../../config/itemTypes';
import CardsList from './../../cards/components/cardsList';
import ListText from './listText';

const ListColumns = ({
  connectDropTarget, listId, boardId, name, cards,
  onAtach, editId, toogleConfModal, handleEdit, handleUpdate, handleCancel,
  socket
}) => {
  const DeleteButton = () => (
    <a
      id={listId}
      onClick={toogleConfModal}
      className="close"
      aria-label="close"
    >&times;
    </a>
  );

  const ListName = () => (
    <p>
      <b id={listId} onClick={handleEdit} style={{ cursor: 'pointer' }}>
        {name}
      </b>
    </p>
  );

  const _render = (
    <li style={{ verticalAlign: top, height: '500px' }}>
      <div className="list">
        {listId === editId ?
          <ListText
            id={listId}
            name={name}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            socket={socket}
          />
        :
          <div>
            <DeleteButton />
            <ListName />
          </div>
        }
        <CardsList
          listId={listId}
          boardId={boardId}
          socket={socket}
        />
      </div>
    </li>
  );

  return connectDropTarget(
    _render
  );
};

const listTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    // Board Id
    const boardId = sourceProps.boardId;
    // Cards Source Id
    const sourceId = sourceProps.id;
    // Cards From List
    const cards = sourceProps.cards;
    // Target List Id
    const targetListId = targetProps.listId;
    // If there is no Cards Atach to List
    if (!targetProps.cards.length) {
      // targetProps.onAtach({ sourceId, targetListId, cards });
      targetProps.onAtach({ boardId, sourceId, targetListId });
    }
  }
};

ListColumns.propTypes = {
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAtach: PropTypes.func.isRequired,
  socket: PropTypes.object
};

export default compose(
  DropTarget(ItemTypes.NOTE, listTarget, connection => ({
    connectDropTarget: connection.dropTarget()
  }))
)(ListColumns);
