import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cardsDelete, cardsUpdate } from './../actionCreators';
import { closeModal } from './../../modal/actionCreators';

import CardDetails from './cardDetails';
import CardText from './cardText';

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: ''
    };
    this.Edit = this.Edit.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Close = this.Close.bind(this);
  }

  Edit(e) {
    e.preventDefault();
    this.setState({ editId: e.target.id });
  }

  Cancel() {
    this.setState({ editId: '' });
  }

  Update(data) {
    this.props.cardsUpdate(data, this.props.socket);
    this.setState({ editId: '' });
  }

  Delete(id) {
    this.props.cardsDelete(id, this.props.socket);
    this.props.closeModal();
  }

  Close() {
    this.setState({ editId: '' });
    this.props.closeModal();
  }

  render() {
    const { show, id, cards } = this.props;
    const { editId } = this.state;

    const card = cards.filter((item, index) => item._id === this.props.id)[0];

    // Render nothing if the "show" prop is false
    if (!show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(0,0,0,0.3)',
      whiteSpace: 'normal'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal fade in" role="dialog" style={{ display: 'block' }} role="dialog">

          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={this.Close}
                  className="close"
                  data-dismiss="modal"
                >&times;
                </button>
                <h4 className="modal-title">Card Details</h4>
              </div>

              <div className="modal-body">
                {id === editId ?
                  <CardText
                    id={id}
                    description={card.description}
                    handleUpdate={this.Update}
                    handleCancel={this.Cancel}
                  />
                  :
                  <p>
                    <b id={id} onClick={this.Edit} style={{ cursor: 'pointer' }}>
                      {card.description}
                    </b>
                  </p>
                }
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.Close}
                  className="btn btn-default pull-left"
                  data-dismiss="modal"
                >Close
                </button>
                <button
                  onClick={() => this.Delete(id)}
                  className="btn btn-link"
                >Delete
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

CardModal.propTypes = {
  show: PropTypes.bool,
  cards: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  cardsUpdate: PropTypes.func.isRequired,
  cardsDelete: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
  {
    cards: state.cardsReducer.cards
  }
);


export default connect(mapStateToProps, {
  cardsDelete, cardsUpdate, closeModal
})(CardModal);
