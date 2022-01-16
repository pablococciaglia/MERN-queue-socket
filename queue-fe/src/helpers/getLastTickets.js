const url = 'http://localhost:8080/lasttickets';

export const getLastTickets = async () => {
	const resp = await fetch(url);
	const data = await resp.json();
	return data.ticketList;
};
