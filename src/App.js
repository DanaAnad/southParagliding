import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home.js";
import Admin from "./Pages/Admin.js";
import Login from "./components/Login.js";
import {Helmet} from "react-helmet";
import useToken from "./useToken.js";


export default function App () {

    const {token, setToken} = useToken();
  
    return (
      <div>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap" as="style"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"/>
      <Router>
      <div className = "body" >
        <Helmet>
        <title>South-Paragliding</title>
        <meta name="description" 
              content="South Paragling"
              />
        <meta name="keywords"
              content="parapanta, parapantism, Craiova, Romania, south paragliding, paragliding, zbor cu parapanta"
              />
        </Helmet>
          <nav className="routes">
            <ul>
              <li key = 'SP-homepage' >
                  <Link to='/'>South-Paragliding</Link>
                </li>
                <li key = 'admin' >
                  <Link to='/admin'>South-Para-Admin</Link>
                </li>
            </ul>
          </nav>
          <Switch>
            {token ?<Route path="/admin" component={Admin} /> : <Route path="/admin" render={(props) =>(<Login {...props} setToken={setToken}/>)}/>} 
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router> 
      </div> 
    );
}


