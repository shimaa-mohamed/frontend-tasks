import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../index.scss";
import Details from "./Details";
import MainPage from "./MainPage";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../utils/themes";
class App extends Component {
  state = {
    theme: "dark",
  };
  toggleTheme = () => {
    this.state.theme === "dark"
      ? this.setState({ theme: "light" })
      : this.setState({ theme: "dark" });
  };
  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <GlobalStyles />
        <Router>
          <Route
            exact
            path="/"
            render={() => <MainPage toggleTheme={this.toggleTheme} />}
          />
          <Route
            path="/details/:countryCode"
            render={({ match }) => (
              <Details
                toggleTheme={this.toggleTheme}
                countryCode={match.params.countryCode}
              />
            )}
          />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
