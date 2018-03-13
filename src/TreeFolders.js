import React from "react";
import { Treebeard } from "react-treebeard";
import { Base64 } from "js-base64";
import GitHub from "./GitHub.js";

let data = {
  name: "root",
  toggled: true,
  children: [
    {
      name: "parent",
      children: [{ name: "child1" }, { name: "child2" }]
    },
    {
      name: "loading parent",
      children: []
    },
    {
      name: "parent",
      children: [
        {
          name: "nested parent",
          children: [{ name: "nested child 1" }, { name: "nested child 2" }]
        }
      ]
    }
  ]
};

class TreeFolders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      cursor: {
        active: true,
        node: []
      }
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  }
  render() {
    this.sync();
    return (
      <Treebeard
        data={this.state.data}
        onToggle={this.onToggle}
        className="tree-folders"
      />
    );
  }
  async sync() {
    this.setState({
      data: await GitHub.syncAll(this.props.token)
    });
  }
}

export default TreeFolders;
