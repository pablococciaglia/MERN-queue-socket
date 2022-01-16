import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import useHideMenu from '../hooks/useHideMenu';

const CreateTicket = () => {
	useHideMenu(true);

	const { socket } = useContext(SocketContext);
	const { Title, Text } = Typography;
	const [NewticketNumber, setNewTicketNumber] = useState(null);
	const newNumber = () => {
		socket.emit('ticket-request', null, (ticket) => {
			setNewTicketNumber(ticket);
		});
	};
	return (
		<>
			<Row>
				<Col span={14} offset={6} align='center'>
					<Title level={3}>Push the button to get your number</Title>
					<Button
						type='primary'
						shape='round'
						icon={<DownloadOutlined />}
						size='large'
						onClick={newNumber}
					>
						New ticket
					</Button>
				</Col>
			</Row>
			{NewticketNumber && (
				<Row style={{ marginTop: 100 }}>
					<Col span={14} offset={6} align='center'>
						<Text level={2}>Your Number </Text>
						<br />
						<Text level={2} type='success' style={{ fontSize: 55 }}>
							{NewticketNumber.number}
						</Text>
					</Col>
				</Row>
			)}
		</>
	);
};

export default CreateTicket;
