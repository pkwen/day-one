const express = require("express");
const helmet = require("helmet");
const expressEnforcesSSL = require("express-enforces-ssl");
// const PORT = 3001;
const PORT = process.env.PORT || 3001;

//
const http = require("http");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuidv1 = require("uuid/v1");
//

const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      //options for github strategy
      clientID: "57863a3c5df5ea6c3a77",
      clientSecret: "445db6c23a9d4fa27d890839650bf1a3a4cb8ed7",
      callbackURL: "http://localhost:3000/auth/github/redirect"
    },
    () => {
      //passport callback function
    }
  )
);

const app = express();
app.use(passport.initialize());
app.use(passport.session());
// Initialize an express app with some security defaults
app.use(https).use(helmet());

// Application-specific routes
// Add your own routes here!
// app.get("/example-path", async (req, res, next) => {
//   res.json({ message: "Hello World!" });
// });

// Serve static assets built by create-react-app
app.use(express.static("build"));

// If no explicit matches were found, serve index.html

app.use(notfound).use(errors);

//passport js authentication routes
app.get(
  "/auth/github",
  // passport.authenticate("github", { scope: ["repo"] }),
  // console.log("reached app.get /auth/github"),
  function(req, res) {
    res.send("logging in through github");
  }
);

app.get(
  "/auth/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/hello", function(req, res) {
  res.send("hello");
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

//

// Create the WebSockets server
const server = http.createServer(app);
var serverOnPort = server.listen(PORT);
const wss = new SocketServer({ server: serverOnPort });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// let userCount = 0;

// wss.on("connection", ws => {
//   console.log("Client connected");

//   userCount++;
//   console.log("userCount:", userCount);

//   //add userCount (to parsedMessage) to be passed to each client
//   let userCountObj = {
//     type: "userCount",
//     userCount: userCount
//   };

//   console.log("userCountObj:", userCountObj);

//send message to client (userCount number)
var code = "";
wss.on("connection", ws => {
  console.log("Client connected");
  console.log("Client count: " + wss.clients.length);
  //broadcast to all
  wss.broadcast = function broadcast(newMsg) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(newMsg));
      }
    });
  };
  ws.send(JSON.stringify(code));
  // wss.broadcast(code);
  // console.log(wss.clients);
  ws.on("message", message => {
    const newMsg = JSON.parse(message);
    // code = newMsg;

    wss.broadcast(newMsg);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    // const msg = { name: username, type: 'incomingLogOut', userCount: wss.clients.size, id: uuidv4() };
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === ws.OPEN) {
    //     client.send(JSON.stringify(msg));
    //   }
    // });
  });
});

//

function https(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers["x-forwarded-proto"];
    if (proto === "https" || proto === undefined) {
      return next();
    }
    return res.redirect(301, `https://${req.get("Host")}${req.originalUrl}`);
  } else {
    return next();
  }
}

function notfound(req, res, next) {
  res.status(404).send("Not Found");
}

function errors(err, req, res, next) {
  console.log(err);
  res.status(500).send("something went wrong");
}

// app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
