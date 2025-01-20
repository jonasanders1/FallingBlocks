import { io } from "socket.io-client";

type Board = (string | null)[][];

export const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

export const initializeMultiplayerGame = (roomId: string) => {
  socket.emit("join_room", roomId);

  socket.on("opponent_board_update", (board: Board) => {
    // TODO: Create an opponent board store and update it here
    console.log("Received opponent board update:", board);
  });

  socket.on("opponent_score_update", (score: number) => {
    // TODO: Create an opponent score store and update it here
    console.log("Received opponent score update:", score);
  });

  // Send your updates to opponent
  const sendBoardUpdate = (board: Board) => {
    socket.emit("board_update", { roomId, board });
  };

  return { sendBoardUpdate };
};
