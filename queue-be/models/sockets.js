const TicketList = require('../models/ticket-list');
class Sockets {
	constructor(io) {
		this.io = io;

		this.ticketList = new TicketList();

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', (socket) => {
			// Listen to event: mensaje-to-server
			socket.on('ticket-request', (data, callback) => {
				const newTicket = this.ticketList.createTicket();
				callback(newTicket);
			});

			socket.on('next-ticket', ({ agent, desk }, callback) => {
				const asignedNextTicket = this.ticketList.asignateTicket(agent, desk);
				callback(asignedNextTicket);
				this.io.emit('new-ticket-asigned', this.ticketList.last13);
			});
		});
	}
}

module.exports = Sockets;
