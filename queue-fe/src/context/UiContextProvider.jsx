import { createContext, useState } from 'react';

export const UiContext = createContext();

const UiContextProvider = ({ children }) => {
	const [menu, setMenu] = useState(true);
	const showMenu = () => {
		setMenu(false);
	};
	const hideMenu = () => {
		setMenu(true);
	};
	return (
		<UiContext.Provider value={{ menu, showMenu, hideMenu }}>
			{children}
		</UiContext.Provider>
	);
};

export default UiContextProvider;
