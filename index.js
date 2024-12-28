import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO logic
io.on("connection", (socket) => {
    console.log("the new socket is connected: ");
    // console.log("New socket connected:", socket);
    socket.on("chat", (payload) => {
        console.log("Received payload:", payload);
        // console.log(payload)
        io.emit("chat", payload);
    });
});

// Start the server
server.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});
