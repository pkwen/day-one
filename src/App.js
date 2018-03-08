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
      value: ""
    };
  }
  componentWillMount() {
    this.socket = new WebSocket("wss://afternoon-waters-66838.herokuapp.com/");
    this.socket.onopen = e => {
      console.log("opened");
    };
    this.socket.onmessage = e => {
      const parsedData = JSON.parse(e.data);
      this.setState({ value: parsedData });
    };
  }
  onChange = e => {
    const model = this.refs.monaco.editor.getModel();
    const value = model.getValue();
    this.setState({
      value: value
    });
    console.log(this.state.value);
    this.socket.send(JSON.stringify(value));
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
          To get started, edit <code>src/App.js</code> and save to reload.
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
