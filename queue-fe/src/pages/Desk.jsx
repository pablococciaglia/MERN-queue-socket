import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';

import { SocketContext } from '../context/SocketContext';
import { getUserStorage } from '../helpers/getUserStorage';
import useHideMenu from '../hooks/useHideMenu';

const Desk = () => {
	const [ticket, setTicket] = useState(null);
	const { socket } = useContext(SocketContext);
	useHideMenu(false);
	const navigate = useNavigate();

	const { agent, desk } = getUserStorage();
	useEffect(() => {
		if (!agent || !desk) {
			return navigate('/login');
		}
	}, [agent, desk, navigate]);

	const exit = () => {
		localStorage.clear();
		return navigate('/login');
	};

	const nextTicket = () => {
		socket.emit('next-ticket', { agent, desk }, (ticket) => {
			if (ticket) {
				setTicket(ticket.number);
			} else {
				setTicket('At this time there are no pending tickets');
			}
		});
	};

	const { Title, Text } = Typography;
	return (
		<>
			<Row>
				<Col span={20}>
					<Title level={2}>{agent}</Title>
					<Text type='success'>Desk number: {desk}</Text>
				</Col>
				<Col span={4} align='right'>
					<Button shape='round' type='danger' onClick={exit}>
						Exit
						<CloseCircleOutlined />
					</Button>
				</Col>
			</Row>
			<Divider />
			{ticket && (
				<Row>
					<Col>
						<Text>Serving the ticket number: </Text>
						<Text style={{ fontSize: 30 }} type='danger'>
							{ticket}
						</Text>
					</Col>
				</Row>
			)}
			<Row>
				<Col offset={18} span={6} align='right'>
					<Button shape='round' type='primary' onClick={nextTicket}>
						Next ticket
						<RightOutlined />
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default Desk;
