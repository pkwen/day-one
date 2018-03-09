import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import { BrowserRouter, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
// import passport from "passport";
// import GithubStrategy from "passport-github2";
import NavBar from "./NavBar.js";

// const passport = require("passport");
// const GithubStrategy = require("passport-github2");

require("monaco-editor/min/vs/editor/editor.main.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        code: "initial text",
        cursor: {
          line: 0,
          column: 0
        }
      }
    };
  }

  componentWillMount() {
    // const url = "wss://secret-meadow-50707.herokuapp.com/"; //use this for production
    // const url = "ws://localhost:3001"; //use this for development
    // this.socket = new WebSocket(url);
    // this.socket.wsURL = "wss://secret-meadow-50707.herokuapp.com/"; //use this for production
    // this.socket.wsURL = "ws://localhost:3001"; //use this for development
    // this.socket.onopen = e => {
    //   console.log("opened");
    //   //send state to newly connected users??
    // };
    // this.socket.onmessage = e => {
    //   const parsedData = JSON.parse(e.data);
    //   // console.log("parsedData: ", parsedData);
    //   console.log("this.state (before): ", this.state);
    //   // this.setState({ message: parsedData });
    //   // this.refs.monaco.editor.setPosition(
    //   //   this.state.message.cursor.line,
    //   //   this.state.message.cursor.column
    //   // );
    //   console.log("this.state (after): ", this.state);
    // };
  }

  onChange = e => {
    console.log("onChange invoked");
    // const message = document.getElementById("myTextarea").value;
    // console.log(this.refs.monaco.editor.getPosition());
    console.log(
      "lineNumber: ",
      this.refs.monaco.editor.getPosition().lineNumber
    );
    console.log("column: ", this.refs.monaco.editor.getPosition().column);
    // console.log(
    //   "reason: ",
    //   this.refs.monaco.editor.CursorPositionChangedEvent()
    // );

    const model = this.refs.monaco.editor.getModel();
    const value = model.getValue();

    this.setState({
      message: {
        code: value
      }
    });

    const message = {
      code: value,
      cursor: {
        line: this.refs.monaco.editor.getPosition().lineNumber,
        column: this.refs.monaco.editor.getPosition().column
      }
    };

    // this.socket.send(JSON.stringify(message));
  };

  render() {
    const requireConfig = {
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js",
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.6.1/min/vs"
      }
    };
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <p className="App-intro">
            App State Value: {this.state.message.code}
            {/* Cursor Postion Line: {this.state.cursor.line}
          Cursor Postion Column: {this.state.cursor.column} */}
          </p>

          <Link to="/auth/github">Login using Github (react route)</Link>

          <br />
          <a href="/auth/github">Login using Github (express route)</a>

          <Route
            path="/auth/github"
            exact
            render={() => {
              return <h1>Logging In Using GitHub</h1>;
            }}
          />

          <MonacoEditor
            ref="monaco"
            width="800"
            height="600"
            language="javascript"
            value={this.state.message.code}
            onChange={this.onChange}
            requireConfig={requireConfig}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
