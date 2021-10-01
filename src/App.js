import './App.css';
import React from 'react';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

const Hello = () => {
  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};


export default function App() {
  return (
    <div>
      <header className="App-header">
        <img src='/wkndLOGO.jpg' className="App-logo" alt="logo" />
      </header>
    <HashRouter>
      <div className="menu">
        <Link to="/"><h2>Hello</h2></Link>
        <Link to="/home"><h2>Home</h2></Link>
        <Link to="/login"><h2>Log In</h2></Link>
        <Link to="/signup"><h2>Sign Up</h2></Link>
      </div>
      <Switch>
        <Route path="/" component={Hello} />
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
