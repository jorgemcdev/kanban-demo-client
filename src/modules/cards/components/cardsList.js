import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newCard, cardsMove } from './../actionCreators';
import { openModal } from './../../modal/actionCreators';

import Card from './card';
import CardNew from './cardNew';

class CardsList extends Component {
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  onMove(data) {
    this.props.cardsMove(data, this.props.socket);
  }

  handleNew(data) {
    this.props.newCard(data, this.props.socket);
  }

  handleDetails(id) {
    this.props.openModal(id);
  }

  render() {
    const { listId, boardId, cards } = this.props;

    const cardFilter = cards.filter((card) =>
      listId === card._list
    );
    const cardListing = cardFilter.map((card, index) =>
      <div key={card._id}>
        <Card
          className="card"
          id={card._id}
          onMove={this.onMove}
          children={card.description}
          sort={card.sort}
          cards={cards}
          listId={listId}
          boardId={boardId}
          handleDetails={this.handleDetails}
        />
      </div>
    );

    const _render = (
      <div>
        <div className="cards">
          {cardListing}
        </div>
        <CardNew
          listId={listId}
          boardId={boardId}
          handleNew={this.handleNew}
        />
      </div>
    );
    return (
      _render
    );
  }
}

CardsList.propTypes = {
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  newCard: PropTypes.func.isRequired,
  cardsMove: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
  {
    cards: state.cardsReducer.cards
  }
);

const mapDispatchToProps = {
  openModal,
  newCard,
  cardsMove
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
