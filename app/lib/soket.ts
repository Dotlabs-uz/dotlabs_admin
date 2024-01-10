const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", async (socket: any) => {
	console.log(socket.io);
});

httpServer.listen(5000, () => {
	console.log("Server is listening to the port 5000");
});
