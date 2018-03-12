import React, { Component } from "react";

import NavBarTop from "./NavBarTop.js";
import NavBarSide from "./NavBarSide.js";
import CodeEditor from "./CodeEditor.js";
import Console from "./Console.js";

import "./styles/App.css"; //import App.css which is a compilation of all scss files

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarTop />
        <NavBarSide />
        <CodeEditor />
        <Console />
      </div>
    );
  }
}

export default App;
