import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getLastTickets } from '../helpers/getLastTickets';

const Queue = () => {
	const { socket } = useContext(SocketContext);
	useHideMenu(true);
	const { Title, Text } = Typography;
	const [ticketList, setTicketList] = useState([]);

	useEffect(() => {
		socket.on('new-ticket-asigned', (ticketList) => {
			setTicketList(ticketList);
		});

		return () => {
			socket.off('new-ticket-asigned');
		};
	}, [socket, ticketList]);

	useEffect(() => {
		getLastTickets().then(setTicketList); // .then(ticketList => setTicketList(ticketList))
	}, []);

	return (
		<>
			<Title level={1}>Ticket number</Title>
			<Row>
				<Col span={12} align='center'>
					<List
						dataSource={ticketList.slice(0, 3)}
						renderItem={(item) => (
							<List.Item>
								<Card
									style={{ width: 300, marginTop: 16 }}
									actions={[
										<Tag color='volcano'>{item.agent}</Tag>,
										<Tag color='magenta'>Desk: {item.desk}</Tag>,
									]}
								>
									<Title>No. {item.number}</Title>
								</Card>
							</List.Item>
						)}
					/>
				</Col>
				<Col span={12} align='center'>
					<Divider>History</Divider>
					<List
						dataSource={ticketList.slice(3)}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									title={`Ticket No. ${item.number}`}
									description={
										<>
											<Text type='secondary'>Desk</Text>
											<Tag color='magenta'>{item.number}</Tag>
											<Text type='secondary'>Agent</Text>
											<Tag color='volcano'>{item.agent}</Tag>
										</>
									}
								/>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
			{/* 			<Row style={{ marginTop: 100 }}>
				<Col span={14} offset={6} align='center'>
					<Text level={2}>Your Number </Text>
					<br />
					<Text level={2} type='success' style={{ fontSize: 55 }}>
						55
					</Text>
				</Col>
			</Row> */}
		</>
	);
};

export default Queue;
