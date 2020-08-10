import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MenuPage from './pages/menu/menu'
import MesaPage from './pages/mesa/mesa';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MenuPage}></Route>
        <Route exact path="/mesa" component={MesaPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
