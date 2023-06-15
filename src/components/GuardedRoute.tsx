import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
	isRouteAccessible: boolean;
	redirectUrl: string;
};

const GuardedRoute: React.FC<GuardedRouteProps> = props => {
	const { isRouteAccessible, redirectUrl } = props;
	return isRouteAccessible ? <Outlet /> : <Navigate to={redirectUrl} />;
};

export default GuardedRoute;