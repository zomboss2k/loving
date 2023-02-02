const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối đến Database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT || 8080, () =>
  console.log(`Server đang chạy với PORT ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "*", //phép tất cả các trang đều cors được.
    credentials: true,
  },
}); // thêm cái cors này để tránh bị Exception

global.onlineUsers = new Map();
// Handle khi có connect từ client tới
io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-Receive", data.msg);
    }
  });
  socket.on("disconnect", () => {
    console.log("Client Ngắt kết nối"); // Khi client disconnect thì log ra terminal.
  });
});
