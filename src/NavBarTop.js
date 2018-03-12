import React, { Component } from "react";

class NavBarTop extends Component {
  render() {
    return (
      <div className="navbar-top">
        <nav>
          <a href="/" className="navbar-logo">
            Logo Here
          </a>
          <a href="/" className="navbar-login">
            GitHub Login Here
          </a>
        </nav>
      </div>
    );
  }
}

export default NavBarTop;
