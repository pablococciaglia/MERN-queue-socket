// Server Model: Express server + socket.io configured
const Server = require('./models/server');

// Package to read the environment file
require('dotenv').config();

// Server init
const server = new Server();

// Execute server
server.execute();
