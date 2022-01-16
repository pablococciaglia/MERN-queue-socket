import { useContext, useEffect } from 'react';
import { UiContext } from '../context/UiContextProvider';

const useHideMenu = (hide) => {
	const { showMenu, hideMenu } = useContext(UiContext);

	useEffect(() => {
		if (hide) {
			hideMenu();
		} else {
			showMenu();
		}
	}, [hide, hideMenu, showMenu]);
};

export default useHideMenu;
