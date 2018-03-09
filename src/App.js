import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
// import MessageList from "./MessageList.js";
// import ChatBar from "./ChatBar.js";
// import NavBar from "./NavBar.js";
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
    const url = "wss://secret-meadow-50707.herokuapp.com/";
    this.socket = new WebSocket(url);
    this.socket.wsURL = "wss://secret-meadow-50707.herokuapp.com/";

    this.socket.onopen = e => {
      console.log("opened");
      //send state to newly connected users??
    };

    this.socket.onmessage = e => {
      const parsedData = JSON.parse(e.data);
      this.setState({ message: parsedData });
    };
  }

  onChange = e => {
    const message = {
      code: e,
      cursor: {
        line: this.refs.monaco.editor.getPosition().lineNumber,
        column: this.refs.monaco.editor.getPosition().column
      }
    };
    // const model = this.refs.monaco.editor.getModel();
    // const value = model.getValue();
    // this.setState({
    //   value: value
    // });
    this.socket.send(JSON.stringify(message));
    // this.setState({
    //   cursor: {
    //     line: this.refs.monaco.editor.getPosition().lineNumber,
    //     column: this.refs.monaco.editor.getPosition().column
    //   }
    // });
    // console.log(this.state.value);
    // const cursor = this.state.cursor;
    // const cursorLine = this.refs.monaco.editor.getPosition().lineNumber;
    // const cursorColumn = this.refs.monaco.editor.getPosition().column;

    console.log(this.refs.monaco.editor.getPosition());
    console.log(
      "lineNumber: ",
      this.refs.monaco.editor.getPosition().lineNumber
    );
    console.log("column: ", this.refs.monaco.editor.getPosition().column);
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
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">
          App State Value: {this.state.value}
          {/* Cursor Postion Line: {this.state.cursor.line}
          Cursor Postion Column: {this.state.cursor.column} */}
        </p>
        <MonacoEditor
          ref="monaco"
          width="800"
          height="600"
          language="javascript"
          value={this.state.value}
          onChange={this.onChange}
          requireConfig={requireConfig}
        />
      </div>
    );
  }
}

export default App;
