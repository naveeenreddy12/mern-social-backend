const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/socialdb")
  .then(() => console.log("MongoDB connected!"));

// Attach Socket.IO to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", userRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
