import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListText extends Component {
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
            rows="3"
            maxLength={50}
            onChange={this.handleChange}
            defaultValue={this.state.value}
          >
          </textarea>
          <p><small>Chars: {this.state.value.length} Max 50</small></p>
        </div>
        <div className="form-group">
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleUpdate({ id, name: this.state.value })}
            >Save
            </button>
            <button
              className="btn btn-link btn-sm"
              onClick={handleCancel}
            >Cancel
            </button>
          </div>
        </div>
      </div>
    );
    return (
      _render
    );
  }
}

ListText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ListText;
