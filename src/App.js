import './App.css';
import React from 'react';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';


export default function App() {
  return (
    <div>
      <header className="App-header">
        <img src='/wkndLOGO.jpg' className="App-logo" alt="logo" />
      </header>
    <HashRouter>
      <div className="menu">
        <div className="menuItem"><Link to="/home"><h2>Home</h2></Link></div>
        <div className="menuItem"><Link to="/login"><h2>Log In</h2></Link></div>
        <div className="menuItem"><Link to="/signup"><h2>Sign Up</h2></Link></div>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path = "/login" component={Login} />
        <Route path = "/signup" component={Signup} />
      </Switch>
    </HashRouter>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src='/wkndLOGO.jpg' className="App-logo" alt="logo" />
//       </header>
//       <body>
//         <p>This is a test</p>
//       </body>
//     </div>
//   );
// }

// export default App;
