import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
const { createServer } = require('http');
import { getLatestChat } from './utilities';
import { ChangeStreamDocument } from 'mongodb';

const server = createServer()
const io = new Server(server, {
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
  } else {
    console.log('New client connected:', socket.id);
  }
  
  // Only setup change stream once
  if (!changeStreamInitialized) {
    setupChangeStream();
    changeStreamInitialized = true;
  }
});

async function setupChangeStream() {
  const chat = await getLatestChat();
  // console.log("chat: ", chat);
  const changeStream = chat.watch();
  changeStream.on('change', (change: ChangeStreamDocument<any>) => {
    if (change.operationType === 'insert' && 'fullDocument' in change) {
      const content = JSON.stringify(change.fullDocument.content);
      const timestamp = JSON.stringify(change.fullDocument.timestamp);
      const role = JSON.stringify(change.fullDocument.role);
      console.log("fullDocument: ", change.fullDocument);
      console.log("content: ", content);
      console.log("timestamp: ", timestamp);
      console.log("role: ", role);
      console.log('--------------------------------');
      if (io) {
        io.emit('newDocument', timestamp, content, role);
      }
    } else {
      console.log("Change event does not have a fullDocument or is not an insert operation:", change);
    }
  });
}