import React, { Component } from "react";
import "../index.scss";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Where is the world?</h1>
          <button onClick={this.props.toggleTheme}>
            <i className="fas fa-moon icon"></i>
          
          <span>Dark Mode</span>
          </button>
      </header>
    );
  }
}

export default Header;
