import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { MenuPage } from './pages/menu/menu'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MenuPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
