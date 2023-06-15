import { UserType } from "./types";
import axios from 'axios';

export const isUserLoggedIn = (user: UserType) => {
	return localStorage.getItem("token") ? true : false;
	// return false;
}

export const setAuthToken = (token: any) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
	else
		delete axios.defaults.headers.common["Authorization"];
};

export const logout = () => {
	localStorage.removeItem('token');
	window.location.href = '/login';
};