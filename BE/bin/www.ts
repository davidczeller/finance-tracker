#!/usr/bin/env node

import app from "../app";
import http from "http";

const port = process.env.PORT || "8000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Server listening on port ${port}`);
} 