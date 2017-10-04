import React from 'react';
import PropTypes from 'prop-types';

import SideBar from './userMainSideBar';
import UserDash from './userDash';
import UserDetails from './userDetails';
import UserChangePass from './userChangePass';

const userMain = (props) => {
  const path = props.location.pathname || 'none';
  let _render;
  switch (path) {
    case '/details':
      _render = <UserDetails />;
      break;
    case '/changepass':
      _render = <UserChangePass />;
      break;
    default:
      _render = <UserDash />;
      break;
  }
  return (
    <div>
      <div className="col-sm-3">
        <SideBar />
      </div>
      <div className="col-sm-9">
       {_render}
      </div>
    </div>
  );
};

userMain.propTypes = {
  location: PropTypes.object
};

export default userMain;
