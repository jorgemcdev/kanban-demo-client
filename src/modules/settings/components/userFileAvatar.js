import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const UserFileAvatar = ({ onImageDrop }) => (
  <div>
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={onImageDrop}
    >
      <p>&nbsp;Drop an image or click to select a file to upload.</p>
    </Dropzone>
  </div>
);

UserFileAvatar.propTypes = {
  uploadedAvatar: PropTypes.string,
  avatar: PropTypes.string,
  onImageDrop: PropTypes.func.isRequired
};

export default UserFileAvatar;
