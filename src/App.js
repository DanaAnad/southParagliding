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
import useToken from "./components/Admin/useToken.js";


export default function App () {
  const {token, setToken} = useToken();
    return (
      <div>
         <Helmet>
            <title>South Paragliding</title>
            <meta name="description" content="South Paragling - adrenalina, distractie si voie buna."/>
            <meta name="keywords" content="tandem, zbor cu parapanta in tandem, tandem paragliding, south paragliding, parapanta, parapantism Craiova,zbor cu parapanta Parang, zbor cu parapanta Romania, paragliding in Romania"/>
        </Helmet>
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap" as="style"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"/>
        <Router>
        <div className = "body" >
            <nav className="routes">
              <ul>
                <li key = 'SP-homepage' >
                    <Link to='/'>South-Paragliding</Link>
                  </li>
                  <li key = 'admin' >
                    <Link to='/sp'>South-Para-Admin</Link>
                  </li>
              </ul>
            </nav>
            <Switch>
              {token ?
                <Route path ="/sp" render={(props) => (<Admin {...props} setToken={setToken}/>)}/> 
              : 
                <Route path="/sp" render={(props) => (<Login {...props} setToken={setToken}/>)}/>}
                <Route exact path="/" component={Home}/>
            </Switch>
          </div>
        </Router> 
      </div> 
    );
}


