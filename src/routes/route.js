import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../containers/home/home.container';
import Gejala from '../containers/gejala/gejala.container';
import Penyakit from '../containers/penyakit/penyakit.container';
import Rules from '../containers/rules/rules.container';
import CreateRules from '../containers/rules/create-rules.container';
import NoMatch from '../containers/404.container';
import Login from '../containers/login.container';

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/gejala' component={Gejala}/>
      <Route path='/rules/create' component={CreateRules}/>
      <Route path='/rules' component={Rules}/>
      <Route path='/penyakit' component={Penyakit}/>
      <Route path='/' component={Home} exact/>
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default Routes