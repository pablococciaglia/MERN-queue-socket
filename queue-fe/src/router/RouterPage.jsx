import { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Queue from '../pages/Queue';
import Login from '../pages/Login';
import Desk from '../pages/Desk';
import CreateTicket from '../pages/CreateTicket';
import { UiContext } from '../context/UiContextProvider';

const { Sider, Content } = Layout;
const RouterPage = () => {
	const { menu } = useContext(UiContext);
	return (
		<BrowserRouter>
			<Layout style={{ height: '100vh' }}>
				<Sider collapsedWidth='0' breakpoint='md' hidden={menu}>
					<div className='logo' />
					<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
						<Menu.Item key='1' icon={<UserOutlined />}>
							<Link to='/login'>Login</Link>
						</Menu.Item>
						<Menu.Item key='2' icon={<VideoCameraOutlined />}>
							<Link to='/queue'>Queue</Link>
						</Menu.Item>
						<Menu.Item key='3' icon={<UploadOutlined />}>
							<Link to='/createTicket'>Create Ticket</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						<Routes>
							<Route path='login' element={<Login />} />
							<Route path='queue' element={<Queue />} />
							<Route path='createticket' element={<CreateTicket />} />
							<Route path='desk' element={<Desk />} />
							<Route path='*' element={<Navigate to='login' />} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
};

export default RouterPage;
