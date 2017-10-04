import React from 'react';
import { Route } from 'react-router';

// Import Layout
import MemberLayout from './../layouts/memberLayout';

// Import Components
import Boards from './../modules/boards/components/boards';
import Lists from './../modules/lists/components/lists';
import userMain from './../modules/settings/components/userMain';

import NotFound from './../modules/common/notFound/404';

// Require Auth from protected Routes
import requireAuth from './../utils/requireAuth';

// Require Roles Constants: ROLE_1: 'Member' ROLE_2: 'Admin'
import { ROLE_1 } from './../config/roles';

// Public Routing
const MemberRoutes = (
  <Route component={MemberLayout}>
    <Route path="/" component={requireAuth(Boards, ROLE_1)} />
    <Route path="/lists/:id" component={requireAuth(Lists, ROLE_1)} />
    <Route path="/settings" component={requireAuth(userMain, ROLE_1)} />
    <Route path="/details" component={requireAuth(userMain, ROLE_1)} />
    <Route path="/changepass" component={requireAuth(userMain, ROLE_1)} />
    <Route path="*" component={requireAuth(NotFound, ROLE_1)} />
  </Route>
);

export default MemberRoutes;
