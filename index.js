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

app.use(cors({
  origin:"https://mern-social-frontend-one.vercel.app",
  credentials:true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"));

// Attach Socket.IO to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/",(req,res)=>{
  res.send("Hello")
})
app.use("/", userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
