import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connect } from "./utils/db.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

config({
  path: "./config.env",
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  // Joining a specific trade room
  socket.on('joinTradeRoom', (tradeId) => {
    console.log(`Socket ${socket.id} joining trade room ${tradeId}`);
    socket.join(tradeId);
  });

  // Leaving a trade room
  socket.on('leaveTradeRoom', (tradeId) => {
    console.log(`Socket ${socket.id} leaving trade room ${tradeId}`);
    socket.leave(tradeId);
  });

  // Handling new offers and broadcasting to the trade room
  socket.on('newOffer', (tradeId, offer) => {
    console.log(`New offer on trade ${tradeId}: ${JSON.stringify(offer)}`);
    io.to(tradeId).emit('offerReceived', offer);
  });

});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
  console.log(process.env.MONGO_URI);
});

connect();
