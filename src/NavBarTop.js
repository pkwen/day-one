import React, { Component } from "react";

class NavBarTop extends Component {
  render() {
    return (
      <div className="navbar-top">
        {/* <h1>This is NavBarTop h1</h1>
        <h2>This is NavBarTop h2</h2> */}
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
