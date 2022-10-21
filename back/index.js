const { Server } = require("socket.io")

const io = new Server({
  cors: {
    origin: "*",
  }
})


io.on("connection", (socket) => {
  console.log("connected")
  socket.on("obj", (data) => {
    console.log(data)
    socket.broadcast.emit('data', data)
  })
})

io.listen(3000)