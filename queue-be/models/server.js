// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Http server
		this.server = http.createServer(this.app);

		// Socket config
		this.io = socketio(this.server, {
			/* configuraciones */
		});

		// Sockts init
		this.sockets = new Sockets(this.io);
	}

	middlewares() {
		// Public directory
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		// CORS
		this.app.use(cors());

		// Get last tickets
		this.app.get('/lasttickets', (req, res) => {
			res.json({
				ok: true,
				ticketList: this.sockets.ticketList.last13,
			});
		});
	}

	execute() {
		// Middlewares init
		this.middlewares();

		// Server init
		this.server.listen(this.port, () => {
			console.log('Server corriendo en puerto:', this.port);
		});
	}
}

module.exports = Server;
