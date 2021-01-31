import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Review from './containers/Review/Review'
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/http://www.i2ce.in/:id" exact component={Review} />
      </Switch>
    </div>
  );
}

export default App;
