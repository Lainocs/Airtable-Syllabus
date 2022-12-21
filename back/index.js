import { Server } from "socket.io"
import * as dotenv from "dotenv"

const io = new Server({
  cors: {
    origin: "*",
  }
})

dotenv.config()

io.on("connection", (socket) => {
  console.log("connected")
  socket.on("obj", (data) => {
    console.log(data)
    socket.broadcast.emit('data', data)
  })
})

io.listen(process.env.PORT || 3000)