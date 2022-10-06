import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Adm001 from '../pages/Adm001';
import Main from '../pages/Main';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/liberacao" component={Adm001} isPrivate />
  </Switch>
);

export default Routes;
