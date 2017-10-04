import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import { SOCKET_IO_URL } from './../../../config/api';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
  boardsList, boardsNew, boardsReset, boardsUpdate, boardsDelete,
  boardsFomSocket
} from './../actionCreators';
import BoardList from './boardList';
import BoardNew from './boardNew';

import ModalConfirm from './../../common/utils/modal-confirm';

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      editId: '',
      id: ''
    };
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleView = this.handleView.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.socket = io(SOCKET_IO_URL);
    this.handleBoardEvent();
  }

  componentDidMount() {
    this.props.boardsList();
  }

  componentWillUnmount() {
    this.props.boardsReset();
    // this.socket.close();
  }

  handleBoardEvent() {
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
            this.socket.on('board', (message) => {
              this.props.boardsList();
              // this.props.boardsFomSocket(message);
            });
          })
          .on('unauthorized', (msg) => {
            throw new Error(msg.data.type);
          });
      });
    });
    // Failure handler
    promise.then(null, (error) => {
      throw new Error('Error: Socket IO');
    });
  }

  handleNew() {
    this.props.boardsNew(this.socket);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editId: e.target.id });
  }

  handleUpdate(e) {
    e.preventDefault();
    this.setState({ editId: '' });
    this.props.boardsUpdate({ id: e.target.id, name: e.target.name }, this.socket);
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ editId: '' });
  }

  handleView(e) {
    e.preventDefault();
    browserHistory.push(`/lists/${e.target.id}`);
  }

  toggleModal(e) {
    e.preventDefault();
    const id = e.target.id || '';
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      id
    }));
  }

  handleDelete() {
    this.props.boardsDelete(this.state.id, this.socket);
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      id: ''
    }));
  }

  render() {
    const { userId, boards, isLoading, errors } = this.props;

    const _render = (
      <div>
        <BoardList
          userId={userId}
          boards={boards}
          toggleModal={this.toggleModal}
          handleEdit={this.handleEdit}
          handleUpdate={this.handleUpdate}
          handleCancel={this.handleCancel}
          handleView={this.handleView}
          editId={this.state.editId}
        />
        <BoardNew handleNew={this.handleNew} />
        <ModalConfirm
          show={this.state.isOpenModal}
          onClose={this.toggleModal}
          onConfirm={this.handleDelete}
          title="Delete Board"
          text="Do you want to delete this Board ?"
        />
      </div>
    );
    return (
      _render
    );
  }
}

const mapStateToProps = (state) => (
  {
    userId: state.authReducer.user.id,
    boards: state.boardsReducer.boards,
    errors: state.boardsReducer.errors,
    isLoading: state.boardsReducer.isLoading
  }
);

Boards.propTypes = {
  userId: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired,
  boardsList: PropTypes.func.isRequired,
  boardsNew: PropTypes.func.isRequired,
  boardsUpdate: PropTypes.func.isRequired,
  boardsReset: PropTypes.func.isRequired,
  boardsDelete: PropTypes.func.isRequired,
  boardsFomSocket: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  boardsList, boardsNew, boardsReset, boardsUpdate, boardsDelete,
  boardsFomSocket
})(Boards);

