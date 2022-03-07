import betterLogging from "better-logging";
import express from "express";
import expressSession from "express-session";
import socketIOSession from "express-socket.io-session";
import { Server } from "socket.io";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import auth from "./controllers/auth.controller.js";
import chat from "./controllers/chat.controller.js";

import model from "./newModel.js";

const port = 8989;
const app = express(); // Create express app.
const server = createServer(app);
const io = new Server(server); // Create socket.io app.

const { Theme } = betterLogging;
betterLogging(console, {
  color: Theme.green,
});

// Enable debug output.
console.logLevel = 4;

// Enhance log messages with timestamps etc.
app.use(
  betterLogging.expressMiddleware(console, {
    ip: { show: true, color: Theme.green.base },
    method: { show: true, color: Theme.green.base },
    header: { show: false },
    path: { show: true },
    body: { show: true },
  })
);

/*
This is a middleware that parses the body of the request into a javascript object.
It's basically just replacing the body property like this:
req.body = JSON.parse(req.body)
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConf = expressSession({
  secret: "Super secret! Shh! Do not tell anyone...",
  resave: true,
  saveUninitialized: true,
});

// Configure session management.
app.use(sessionConf);
io.use(
  socketIOSession(sessionConf, {
    autoSave: true,
    saveUninitialized: true,
  })
);

// Bind REST controllers to /api/*.
app.use("/api", auth.router);
// All chat endpoints require the user to be authenticated.
app.use("/api", auth.requireAuth, chat.router);

// Initialize model.
model.init(io);
// model.createTimeSlot("08:00");
// model.createTimeSlot("12:00");
// model.createTimeSlot("16:00");
// model.createTimeSlot("20:00");

// Handle socket.io connections.
io.on("connection", (socket) => {
  const { session } = socket.handshake;
  session.socketID = socket.id;
  session.save((err) => {
    if (err) console.error(err);
    else console.debug(`Saved socketID: ${session.socketID}`);
  });
});

const currentPath = dirname(fileURLToPath(import.meta.url));
const publicPath = join(currentPath, "..", "..", "client", "dist");

// Serve static files.
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
