import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        code: "initial rendered text",
        cursor: {
          line: 3,
          column: 0
        }
      }
    };
  }
  render() {
    const requireConfig = {
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js",
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.6.1/min/vs"
      }
    };
    return (
      <div className="code-editor">
        <MonacoEditor
          ref="monaco"
          width="1100"
          height="600"
          language="javascript"
          value={this.state.message.code}
          onChange={this.onChange}
          requireConfig={requireConfig}
        />
      </div>
    );
  }
}

export default CodeEditor;
