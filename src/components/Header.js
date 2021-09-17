import React, { Component } from "react";
import "../index.css"

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Where is the world?</h1>
        <div>
          <button>
            <i className="fas fa-moon icon"></i>
          </button>
          <span>Dark Mode</span>
        </div>
      </header>
    );
  }
}

export default Header;
