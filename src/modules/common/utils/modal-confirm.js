import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, title, text, onClose, onConfirm }) => {
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
  };

  // The modal "window"
  const modalStyle = {
    display: 'block'
  };

  return (
    <div className="backdrop" style={backdropStyle}>
      <div className="modal fade in" role="dialog" style={modalStyle} role="dialog">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" onClick={onClose} className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <p>{text}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onConfirm}
                className="btn btn-primary"
                data-dismiss="modal"
              >Confirm
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-default"
                data-dismiss="modal"
              >Cancel
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string
};

export default Modal;
