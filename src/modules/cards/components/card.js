import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ItemTypes from './../../../config/itemTypes';
import Glyph from './../../common/utils/glyph';

const Card = ({
  connectDragSource, connectDropTarget, onMove, handleDetails,
  id, listId, boardId, children, isDragging, isOver, cards, sort, ...props
}) => (
  compose(connectDragSource, connectDropTarget)(
    <div>
      <div
        style={{
          opacity: isDragging || isOver ? 0 : 1
        }} {...props}
      >
        <div className="name">{children}</div>
        <div className="options">
          <button
            type="button"
            id={id}
            onClick={() => handleDetails(id)}
            className="close"
            data-dismiss="modal"
          >
            <Glyph
              id={id}
              icon="glyphicon-option-vertical"
            />
          </button>
        </div>
      </div>
    </div>
  )
);

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      cards: props.cards,
      listId: props.listId,
      boardId: props.boardId
    };
  },
  endDrag(props) {
    return {
      id: props.id,
      cards: props.cards,
      listId: props.listId,
      boardId: props.boardId
    };
  }
};

const cardTarget = {
  drop(targetProps, monitor) {
    // target
    const targetId = targetProps.id;
    const targetListId = targetProps.listId;

    // Source
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceListId = sourceProps.listId;
    const boardId = sourceProps.boardId;
    if (sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetListId, targetId, sourceListId, boardId });
    }
  }
};

export default compose(
  DragSource(ItemTypes.NOTE, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Card);

