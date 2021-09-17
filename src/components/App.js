import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../index.scss";
import Details from "./Details";
import MainPage from "./MainPage";
class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/details/:countryCode" component={Details} />
      </Router>
    );
  }
}

export default App;
