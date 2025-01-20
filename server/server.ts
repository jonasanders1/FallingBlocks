import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);  
    // Handle room logic
  });

  socket.on('board_update', ({ roomId, board }) => {
    socket.to(roomId).emit('opponent_board_update', board);
  });

  socket.on('score_update', ({ roomId, score }) => {
    socket.to(roomId).emit('opponent_score_update', score);
  });
});

server.listen(3000);
