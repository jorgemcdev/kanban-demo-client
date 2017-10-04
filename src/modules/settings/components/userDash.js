import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { boardsList } from './../../boards/actionCreators';

class UserDash extends Component {

  componentWillMount() {
    this.props.boardsList();
  }

  render() {
    const count = this.props.boards.length;

    const _render = (
      <div className="panel panel-default">
        <div className="panel-heading">
          User Dashboard&nbsp;
        </div>
        <div className="panel-body">

          <div className="col-xs-12 col-md-8">
            <h3>
              Use the side Bar to change your Details
            </h3>
          </div>

          <div className="col-xs-12 col-md-4">
            <div className="well">
              <h2>
                <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                &nbsp;Boards
              </h2>
              <h3> <b>{count}</b> Active</h3>
            </div>
          </div>

        </div>
      </div>
    );

    return (
      _render
    );
  }
}

UserDash.propTypes = {
  boardsList: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => (
  {
    boards: state.boardsReducer.boards,
    isLoading: state.boardsReducer.isLoading
  }
);

export default connect(mapStateToProps, { boardsList })(UserDash);
