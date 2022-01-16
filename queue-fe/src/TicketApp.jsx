import SocketProvider from './context/SocketContext';
import UiContextProvider from './context/UiContextProvider';
import RouterPage from './router/RouterPage';

const TicketApp = () => {
	return (
		<SocketProvider>
			<UiContextProvider>
				<RouterPage />
			</UiContextProvider>
		</SocketProvider>
	);
};

export default TicketApp;
