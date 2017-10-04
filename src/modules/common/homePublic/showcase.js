import React from 'react';
import Image1 from './../../../images/image1.jpg';

const Showcase = () => (
  <div className="container showcase">
    <div className="row">
      <div className=" col-sm-6 col-md-6">
        <div className="showcase-img">
          <img role="presentation" src={Image1} />
        </div>
      </div>
      <div className="col-sm-6 col-md-6">
        <div className="showcase-text">
          <h2>React Sample App </h2>
          <p>
            Kanban is a method for visualizing the flow of work, in order to balance demand with available capacity
            and spot bottlenecks.
          </p>
          <p>
            Work items are visualized to give participants a view of progress and process,
            from start to finish. Team members pull work as capacity permits, rather than work being pushed into
            the process when requested.
          </p>
          <p>
            In knowledge work and software development, this provides a visual process 
            management system which aids decision-making about what,
            when and how much to produce
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Showcase;
