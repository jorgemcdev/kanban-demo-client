import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Gliph from './../../common/utils/glyph';
import ModalConfirm from './../../common/utils/modal-confirm';
import LoadingIcon from './../../common/utils/loading-icon';

import { UPLOADS_URL } from './../../../config/api';

class NavBarMember extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      isOpen: false,
      isOpenLogout: false
    };
    this.navbarToggle = this.navbarToggle.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleBlurDropdown = this.handleBlurDropdown.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  navbarToggle() {
    this.setState(prevState => (
      { isToggleOn: !prevState.isToggleOn }
    ));
  }

  handleDropdown(e) {
    e.preventDefault();
    if (e.target.id) {
      let isOpen = this.refs[e.target.id].getAttribute('class');
      isOpen = (isOpen === 'dropdown' ? 'dropdown open' : 'dropdown');
      this.refs[e.target.id].setAttribute('class', isOpen);
    }
  }

  handleBlurDropdown(e) {
    e.preventDefault();
    if (e.target.id) {
      let isOpen = this.refs[e.target.id].getAttribute('class');
      isOpen = (isOpen === 'dropdown open' && 'dropdown');
      this.refs[e.target.id].setAttribute('class', isOpen);
    }
  }

  toggleModal() {
    this.setState(prevState => (
      { isOpenLogout: !prevState.isOpenLogout }
    ));
  }

  handleLogout() {
    this.toggleModal();
    this.props.logout();
  }

  render() {
    const { name, avatar, isLoadingBoards, isLoadingLists, isLoadingCards } = this.props;

    const _render = (
      <div>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Kanban</Link>
              <button
                aria-expanded="false"
                className="navbar-toggle collapsed"
                onClick={this.navbarToggle}
                type="button"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div
              id="isToggle"
              className={(this.state.isToggleOn ? 'navbar-collapse collapse' : 'navbar-collapse')}
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/" style={{ width: '35px' }}>
                    <LoadingIcon
                      color="white"
                      isLoading={isLoadingBoards || isLoadingLists || isLoadingCards}
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/">Boards</Link>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  {avatar ?
                    <img
                      src={`${avatar}`}
                      role="presentation"
                      width="45px"
                      height="45px"
                    />
                  :
                    <Avatar name={name} value="86%" size={45} />}
                </li>
                <li ref="drop1" className="dropdown" onMouseLeave={this.handleBlurDropdown}>
                  <a
                    id="drop1"
                    href="#"
                    onClick={this.handleDropdown}
                    className="dropdown"
                  >
                   {name} <b className="caret"></b>
                  </a>
                  <ul role="menu" className="dropdown-menu">
                    <li><a href="#" onClick={this.toggleModal}>
                      <Gliph icon="glyphicon-log-out" text=" Logout" /></a>
                    </li>
                    <li className="divider"></li>
                    <li>
                      <Link to="/settings"><Gliph icon="glyphicon-cog" text=" Settings" /></Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ModalConfirm
          show={this.state.isOpenLogout}
          onClose={this.toggleModal}
          onConfirm={this.handleLogout}
          title="Logout"
          text="Do you want to Logout ?"
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
    isLoadingBoards: state.boardsReducer.isLoading,
    isLoadingLists: state.listsReducer.isLoading,
    isLoadingCards: state.cardsReducer.isLoading
  }
);

NavBarMember.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  logout: PropTypes.func.isRequired,
  isLoadingBoards: PropTypes.bool.isRequired,
  isLoadingLists: PropTypes.bool.isRequired,
  isLoadingCards: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(NavBarMember);
