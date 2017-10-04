import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { cardsAtach, cardsFromSocket, loadCards } from './../../cards/actionCreators';
import {
  loadLists, newList, listsReset, listsUpdate, listsDelete,
  listsFomSocket
} from './../actionCreators';

import { API_URL, TIME_OUT, SOCKET_IO_URL } from './../../../config/api';

import ListColumn from './listColumn';
import ListNew from './listNew';

import ModalConfirm from './../../common/utils/modal-confirm';
import CardModal from './../../cards/components/cardModal';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: '',
      isOpenModal: false,
      listId: ''
    };
    // Handle Drag n Drop
    this.onAtach = this.onAtach.bind(this);

    // Handle List Operations
    this.toogleConfModal = this.toogleConfModal.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.socket = io(SOCKET_IO_URL);
    this.handleListEvent(this.props.boardId);
  }

  componentDidMount() {
    this.props.loadLists(this.props.boardId);
  }

  componentWillUnmount() {
    this.props.listsReset();
    this.socket.close();
  }

  //  Atach Card To Non Empty List
  onAtach(data) {
    this.props.cardsAtach(data, this.socket);
  }

  // Update props if emited
  handleListEvent(boardId) {
    // Promise to read JWT
    const promise = new Promise((resolve, reject) => {
      try {
        const jwt = localStorage.getItem('id_token');
        resolve(jwt);
      } catch (e) {
        reject(e);
      }
    });
    // Success handler
    promise.then((jwt) => {
      this.socket.on('connect', () => {
        this.socket
          .emit('authenticate', { token: jwt }) // send the jwt
          .on('authenticated', () => {
            this.socket.on('list', (message) => {
              this.props.loadLists(boardId);
              // this.props.listsFomSocket(message);
             // this.props.loadCards(boardId);
            });
            /*
            this.socket.on('card', (message) => {
              this.props.cardsFromSocket(message);
            });
            */
          })
          .on('unauthorized', (msg) => {
            // console.info(`unauthorized: ${JSON.stringify(msg.data)}`);
            throw new Error(msg.data.type);
          });
      });
    });
    // Failure handler
    promise.then(null, (error) => {
      // console.log('Error IO Authentication');
    });
  }

  // Toogle Confirm Modal
  toogleConfModal(e) {
    e.preventDefault();
    const id = e.target.id || '';
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      listId: id || ''
    }));
  }

  handleNew(boardId) {
    this.props.newList(boardId, this.socket);
  }
  // Enter in List Edit Mode
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editId: e.target.id });
  }

  // Update List
  handleUpdate(data) {
    this.setState({ editId: '' });
    this.props.listsUpdate({ id: data.id, name: data.name }, this.socket);
  }

  // Delete List
  handleDelete() {
    this.props.listsDelete(this.state.listId, this.socket);
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      listId: ''
    }));
  }

  // Cancel Edit List
  handleCancel(e) {
    e.preventDefault();
    this.setState({ editId: '' });
  }

  render() {
    const listColumn = this.props.lists.map((list, key) => {
      const cards = this.props.cards.filter(card => card._list === list._id);
      return (
        <ListColumn
          key={list._id}
          listId={list._id}
          boardId={list._board}
          name={list.name}
          cards={cards}
          onAtach={this.onAtach}
          editId={this.state.editId}
          toogleConfModal={this.toogleConfModal}
          handleEdit={this.handleEdit}
          handleUpdate={this.handleUpdate}
          handleCancel={this.handleCancel}
          socket={this.socket}
        />
      );
    });

    const _render = (
      <div className="scroll-horizontal">
        <ul className="list-inline">
          {listColumn}
          <li style={{ verticalAlign: top, height: '500px' }}>
            <div className="list-new">
              <ListNew
                handleNew={this.handleNew}
                boardId={this.props.boardId}
              />
            </div>
          </li>
        </ul>
        <ModalConfirm
          show={this.state.isOpenModal}
          onClose={this.toogleConfModal}
          onConfirm={this.handleDelete}
          title="Delete List"
          text="Do you want to delete this List and All the Cards ?"
        />
        <CardModal
          id={this.props.modal.id}
          show={this.props.modal.show}
          socket={this.socket}
        />
      </div>
    );

    return (
      _render
    );
  }
}

Lists.propTypes = {
  boardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  loadLists: PropTypes.func.isRequired,
  newList: PropTypes.func.isRequired,
  listsReset: PropTypes.func.isRequired,
  listsUpdate: PropTypes.func.isRequired,
  listsDelete: PropTypes.func.isRequired,
  listsFomSocket: PropTypes.func.isRequired,
  cardsFromSocket: PropTypes.func.isRequired,
  loadCards: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  modal: PropTypes.object.isRequired,
  cardsAtach: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => (
  {
    boardId: ownProps.params.id,
    userId: state.authReducer.user.id,
    lists: state.listsReducer.lists,
    isLoading: state.listsReducer.isLoading,
    cards: state.cardsReducer.cards,
    modal: state.modalReducer
  }
);

const mapDispatchToProps = {
  loadLists, newList, listsUpdate, listsDelete, listsReset, cardsAtach,
  listsFomSocket, cardsFromSocket, loadCards
};

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Lists);
