import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BoardText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.name
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { id, handleUpdate, handleCancel } = this.props;

    const _render = (
      <div>
        <div className="form-group">
          <textarea
            rows="2"
            maxLength={100}
            onChange={this.handleChange}
            defaultValue={this.state.value}
          >
          </textarea>
          <small>Chars: {this.state.value.length} Max 100</small>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-primary btn-sm"
            id={id}
            name={this.state.value}
            onClick={handleUpdate}
          >Save
          </button>
          <button
            className="btn btn-link btn-sm"
            onClick={handleCancel}
          >Cancel
          </button>
        </div>
      </div>
    );
    return (
      _render
    );
  }
}

BoardText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default BoardText;
