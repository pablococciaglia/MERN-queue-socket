const Ticket = require('./tickets');

class TicketList {
	constructor() {
		this.lastNumber = 0;
		this.pendents = [];
		this.asignedTicket = [];
	}

	get nextNumber() {
		this.lastNumber++;
		return this.lastNumber;
	}

	// Get 3 tickets for the screen and 10 for the history
	get last13() {
		return this.asignedTicket.slice(0, 13);
	}

	createTicket() {
		const newTicket = new Ticket(this.nextNumber);
		this.pendents.push(newTicket);
		return newTicket;
	}

	asignateTicket(agent, desk) {
		if (this.pendents.length === 0) {
			return null;
		}

		const nextTicket = this.pendents.shift();
		nextTicket.agent = agent;
		nextTicket.desk = desk;
		this.asignedTicket.unshift(nextTicket);
		return nextTicket;
	}
}

module.exports = TicketList;
