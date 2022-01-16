import { LoginOutlined } from '@ant-design/icons';
import { Form, Input, Button, InputNumber, Divider, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStorage } from '../helpers/getUserStorage';
import useHideMenu from '../hooks/useHideMenu';

const Login = () => {
	const navigate = useNavigate();
	useHideMenu(false);

	const { agent, desk } = getUserStorage();

	useEffect(() => {
		if (agent && desk) {
			return navigate('/desk');
		}
	}, [agent, desk, navigate]);

	const onFinish = ({ name, desk }) => {
		localStorage.setItem('agent', name);
		localStorage.setItem('desk', desk);
		navigate('/desk');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const { Title, Text } = Typography;

	return (
		<>
			<Title level={2}>Login</Title>
			<Text>Set your name and desk number</Text>
			<Divider />
			<Form
				name='agent'
				labelCol={{
					span: 2,
				}}
				wrapperCol={{
					span: 22,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input your name',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Desk'
					name='desk'
					rules={[
						{
							required: true,
							message: 'Please set your desk number',
						},
					]}
				>
					<InputNumber min={1} max={30} />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 20,
						span: 16,
					}}
				>
					<Button type='primary' htmlType='submit' shape='round'>
						Login
						<LoginOutlined />
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Login;
