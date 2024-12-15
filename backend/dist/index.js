"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const { createServer } = require('http');
const utilities_1 = require("./utilities");
const server = createServer();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
server.listen(4000, () => {
    console.log('Server is listening on port 4000');
});
let changeStreamInitialized = false;
io.on('connection', (socket) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
        socket.data.sessionId = sessionId;
        console.log('Reconnected client with session ID:', sessionId);
    }
    else {
        console.log('New client connected:', socket.id);
    }
    // Only setup change stream once
    if (!changeStreamInitialized) {
        setupChangeStream();
        changeStreamInitialized = true;
    }
});
function setupChangeStream() {
    return __awaiter(this, void 0, void 0, function* () {
        const chat = yield (0, utilities_1.getLatestChat)();
        const changeStream = chat.watch();
        changeStream.on('change', (change) => {
            if (change.operationType === 'insert' && 'fullDocument' in change) {
                const content = JSON.stringify(change.fullDocument.content);
                const timestamp = JSON.stringify(change.fullDocument.timestamp);
                const role = JSON.stringify(change.fullDocument.role);
                if (io) {
                    io.emit('newDocument', timestamp, content, role);
                }
            }
            else {
                console.log("Change event does not have a fullDocument or is not an insert operation:", change);
            }
        });
    });
}
