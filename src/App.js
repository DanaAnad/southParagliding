import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./Pages/Home.js";
import Admin from "./Pages/Admin.js";



export default class App extends React.Component {

  render() {
    return (
      <Router>
      <div className = "body" >
          <nav className="routes">
            <ul>
            <li key = 'SP-homepage' >
                <Link to='/'>South-Paragliding</Link>
              </li>
              <li key = 'admin' >
                <Link to='/admin'>Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/admin" component={Admin}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  };

}
