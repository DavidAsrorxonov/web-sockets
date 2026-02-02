import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Connection Event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (raw) => {
    const message = raw.toString();
    console.log(raw);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Server broadcast: ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.error(`Error ${err} on: ${ip}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is live on ws://localhost:8080");
