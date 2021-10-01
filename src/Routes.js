import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";



export default class Routes extends Component {

  render() {
    return (
      <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
      </div>
    );
  }
}

