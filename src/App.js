import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
// import MessageList from "./MessageList.js";
// import ChatBar from "./ChatBar.js";
// import NavBar from "./NavBar.js";
import { Base64 } from "js-base64";
import GitHub from './github.js';
require("monaco-editor/min/vs/editor/editor.main.css");
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      file: "https://api.github.com/repos/subclinical/boat/contents/weakend.md",
      res: "",
      value: "",
      sha: ""
    };
  }


  // pullContent = async () => {
  //   const response = await fetch("https://api.github.com/repos/subclinical/day-one/contents/weakend.md");
  //   const body = await response.json();
  //   console.log(body);

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  // pushContent = async () => {
  //   const response = await fetch(
  //     "https://api.github.com/repos/subclinical/day-one/contents/weakend.md",
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Authorization": "token " //Insert Token here to authenticate pushing 
  //       },
  //       body: JSON.stringify({
  //         "content": Base64.encode(this.state.value),
  //         "message": "Straight outta Polaris",
  //         "sha": this.state.sha
  //       })
  //     }
  //   );
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // }

  // fetchToken = async () => {
  //   this.clientCode = window.location.href.replace("http://localhost:3000/auth/login?code=", "");
  //   this.urlurl = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${this.clientCode}`;
  //   const response = await fetch(
  //     `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=2437e80c83661e9e530f&client_secret=b0ae333d9094c5597743cb2fd658cf8b5188aabb&code=${this.clientCode}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json'
  //       }
  //     }
  //   )
  //   const body = await response.json();
  //   console.log(this.clientCode.replace('http://localhost:3000/auth/login?code=', ''));
  //   return body;
  // }

  componentDidMount() {
    let url = "wss://afternoon-waters-66838.herokuapp.com/";
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = e => {
      console.log("opened");
    };
    this.socket.onmessage = e => {
      const parsedData = JSON.parse(e.data);
      // console.log(Date.now() + " state change observed");
      this.setState({ value: parsedData });
      // setInterval(this.setState({ value: parsedData }), 500);
    };
  }

  //GET request returning a file from github
  onPull = () => {
    GitHub.pullContent('subclinical', 'boat', 'weakend.md')
      .then(res => this.setState({ value: Base64.decode(res.content), sha: res.sha }))
      .catch(err => console.log(err));
  }

  //PUT request updating the current file being edited
  onPush = () => {
    GitHub.pushContent(this.state.file, 'Straight outta Polaris', this.state.value, this.state.sha, this.state.token)
      .then(res => {
        this.setState({ res: Base64.decode(res.content) });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  //called after logging in with Github to retrieve a token used for further github auth
  onAuth = () => {
    const clientCode = window.location.href.match(/\?code=(.*)/)[1];
    GitHub.fetchToken(clientCode)
      .then(res => {
        this.setState({ token: res.access_token })
        console.log(res)
      })
      .catch(err => console.log(err));
  }

  //updates state and rerenders editor
  onChange = e => {
    const model = this.refs.monaco.editor.getModel();
    // console.log(model)
    // model.validatePosition({ lineNumber: 1, column: 2 });
    const value = model.getValue();
    this.setState({
      value: value
    });
    this.socket.send(JSON.stringify(value));
    // console.log(this.state.value);
  };

  growTree = () => {
    // GitHub.populateTree('facebook', 'create-react-app')
    GitHub.listRepos(this.state.token)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const requireConfig = {
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js",
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.6.1/min/vs"
      }
    };
    return <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. App State: {this.state.res}
        </p>
        {/* <p className="App-intro">{this.state.response}</p> */}
        <button className="grow-tree" onClick={this.growTree}>
          Populate Tree
        </button>
        <a className="gh-login" href="https://github.com/login/oauth/authorize?client_id=2437e80c83661e9e530f">
          Log In with GitHub
        </a>
        <button className="get-token" onClick={this.onAuth}>
          Get Token
        </button>
        <button className="get-hub" onClick={this.onPull}>
          Fetch Data
        </button>
        <button className="push-hub" onClick={this.onPush}>
          Update Data
        </button>
        <MonacoEditor ref="monaco" width="800" height="600" language="javascript" value={this.state.value} onChange={this.onChange} requireConfig={requireConfig} />
      </div>;
  }
}
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: "Michael", // optional. if currentUser is not defined, it means the user is Anonymous
//       prevUser: "",
//       messages: [],
//       userCount: 0
//     };
//   }
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(userCountObj));
//     }
//   });

//   ws.on("message", function incoming(message) {
//     // console.log("received a messge");
//     let parsedMessage = JSON.parse(message);

//     parsedMessage.id = uuidv1();

//     //add message "type" depending on the message receied from the client
//     if (parsedMessage.type === "postMessage") {
//       parsedMessage.type = "incomingMessage";
//     } else if (parsedMessage.type === "postImage") {
//       parsedMessage.type = "incomingImage";
//       console.log("received image");
//     } else if (parsedMessage.type === "postNotification") {
//       parsedMessage.type = "incomingNotification";
//     }

//     //send message to client (message)
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(parsedMessage));
//       }
//     });
//   });

//   // Set up a callback for when a client closes the socket. This usually means they closed their browser.
//   ws.on("close", () => {
//     console.log("Client disconnected");
//     userCount--;
//     console.log("userCount:", userCount);
//   });
// });
//   componentDidMount() {
//     // console.log("componentDidMount <App />");
//     this.ws = new WebSocket("wss://enigmatic-temple-17196.herokuapp.com/");

//     //when server broadcasts a message, take this message and update the App state and render the incoming message
//     this.ws.onmessage = event => {
//       const parsedData = JSON.parse(event.data);
//       // console.log("parsedData:", parsedData);

//       switch (parsedData.type) {
//         case "userCount":
//           this.setState({ userCount: parsedData.userCount });
//           // console.log("this.state after userCount Message:", this.state);
//           break;
//         case "incomingMessage":
//         case "incomingNotification":
//         case "incomingImage":
//           const updatedMessages = this.state.messages.concat(parsedData);
//           this.setState({ messages: updatedMessages });
//           // console.log("this.state after updatedMessages:", this.state);
//           break;
//       }
//     };
//   }

//   render() {
//     // console.log("Rendering <App />");
//     return (
//       <div>
//         <NavBar userCount={this.state.userCount} />
//         <MessageList allMessages={this.state.messages} />
//         <ChatBar
//           currentUser={this.state.currentUser}
//           onSubmit={this.onSubmit}
//           onNotification={this.onNotification}
//         />
//       </div>
//     );
//   }

//   //when user hits "Enter", send message object (with item.type = postMessage) to server, server will then broadcast message to the right client (or all client)
//   onSubmit = item => {
//     const imageExtension = /(\.jpg|\.gif|\.jpeg|\.png)/;
//     if (item.content.match(imageExtension)) {
//       item.type = "postImage";
//       console.log("found image");
//       this.ws.send(JSON.stringify(item));
//     } else {
//       item.type = "postMessage";
//       this.ws.send(JSON.stringify(item));
//     }
//   };

//   //when user hits "Enter", send message object (with item.type = postNotification) to server, server will then broadcast message to the right client (or all client)
//   onNotification = item => {
//     item.type = "postNotification";
//     this.setState({ currentUser: item.currentUser }); //set state of currentUser in App component so when it's passed back down to ChatBar, the updated user will be included
//     this.ws.send(JSON.stringify(item));
//   };
// }

export default App;
