import {useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import GuardedRoute from "./components/GuardedRoute";
import Login from "./components/Login";
import { UserContext } from './Contexts';
import { isUserLoggedIn } from './commons';

interface AppRoutesProp {
}

const AppRoutes: React.FC<AppRoutesProp> = props => {

	const userLoggedIn = isUserLoggedIn(useContext(UserContext).user);

	return <Routes>
		<Route element={<GuardedRoute isRouteAccessible={userLoggedIn} redirectUrl='/login' />}>
			<Route path='/' element={<Dashboard />} />
		</Route>
		<Route element={<GuardedRoute isRouteAccessible={!userLoggedIn} redirectUrl='/' />}>
			<Route path='/login' element={<Login />} />
		</Route>
	</Routes>
}


export default AppRoutes;
