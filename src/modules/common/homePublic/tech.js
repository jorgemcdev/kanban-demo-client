import React from 'react';
import Image1 from './../../../images/image1.jpg';

// Load Images
import reactImage from './../../../images/react.png';
import reduxImage from './../../../images/redux.png';
import webpackImage from './../../../images/webpack.png';
import nodeImage from './../../../images/node.png';
import socketioImage from './../../../images/socketio.png';
import mongodbImage from './../../../images/mongodb.jpg';
import herokuImage from './../../../images/heroku.jpg';
import cloudinaryImage from './../../../images/cloudinary.png';
import mailgunImage from './../../../images/mailgun.png';

const Tech = () => (
  <div className="container showcase">
    <div className="row">
      <div className="col-sm-6 col-md-6">
        <div className="showcase-text">
          <h2>What we use</h2>
          <b>Backend</b>
          <p>Nodejs, Express, MongoDB</p>

          <b>FrontEnd</b>
          <p>React, Redux, Webpack 2, Redux Thunk, Redux Form, Drag'N Drop: react-dnd, sass</p>

          <b>RealTime</b>
          <p>Socket.io</p>

          <b>Providers</b>
          <p>Heroku, mLAB, Mailgun</p>
        </div>
      </div>
      <div className=" col-sm-6 col-md-6">
        <div className="showcase-img">
          <div className="row text-center">
            <div className="col-xs-6 col-md-4">
              <h4 className="center-align">React</h4>
              <img src={reactImage} alt="react" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Redux</h4>
              <img src={reduxImage} alt="redux" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Webpack</h4>
              <img src={webpackImage} alt="webpack" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Node</h4>
              <img src={nodeImage} alt="react" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Socket.io</h4>
              <img src={socketioImage} alt="socketio" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>MongoDb</h4>
              <img src={mongodbImage} alt="mongodb" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Heroku</h4>
              <img src={herokuImage} alt="heroku" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Cloudinary</h4>
              <img src={cloudinaryImage} alt="cloudinary" className="img-thumbnail img-responsive" />
            </div>
            <div className="col-xs-6 col-md-4">
              <h4>Mailguun</h4>
              <img src={mailgunImage} alt="mailgun" className="img-thumbnail img-responsive" />
            </div>                                    
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Tech;
