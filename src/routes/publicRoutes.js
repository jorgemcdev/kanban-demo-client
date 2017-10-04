import React from 'react';
import { Route } from 'react-router';

// Import Layout
import PublicHomeLayout from './../layouts/pubicHomeLayout';
import PublicLayout from './../layouts/pubicLayout';

// Import Components
import Home from './../modules/common/homePublic/home';
import NotFound from './../modules/common/notFound/404';
import SignUp from './../modules/auth/components/signup';
import Login from './../modules/auth/components/login';
import PassRequest from './../modules/auth/components/passRequest';
import PassReset from './../modules/auth/components/passReset';

// Public Routing
const PublicRoutes = (
  <div>
    <Route component={PublicHomeLayout}>
      <Route path="/" component={Home} />
    </Route>
    <Route component={PublicLayout}>
      <Route path="signup" component={SignUp} />
      <Route path="login" component={Login} />
      <Route path="password-request" component={PassRequest} />
      <Route path="password-reset/:token" component={PassReset} />
      <Route path="/*" component={NotFound} />
    </Route>
  </div>
);

export default PublicRoutes;
