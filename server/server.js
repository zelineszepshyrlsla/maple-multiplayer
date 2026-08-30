const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Maple RPG Multiplayer Server is running!");
});

io.on("connection", (socket) => {
  console.log(`[CONNECT] 플레이어 접속: ${socket.id}`);

  socket.emit("serverMessage", {
    message: "서버에 연결되었습니다!"
  });

  socket.on("disconnect", () => {
    console.log(`[DISCONNECT] 플레이어 퇴장: ${socket.id}`);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[SERVER] 서버 시작: PORT ${PORT}`);
});
