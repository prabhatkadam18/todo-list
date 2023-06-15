import React, { useContext, useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { setAuthToken } from '../commons';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../Contexts';
import { Input } from 'antd';

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { setUser } = useContext(UserContext);

	const onLogin = (username: string, password: string) => {

		const loginPayload = {
			username,
			password,
		}
		
		axios.post("https://dummyjson.com/auth/login", loginPayload)
		.then(response => {
			const token  =  response.data.token;
	
			localStorage.setItem("token", token);
	
			setAuthToken(token);
			const user = {
				username: username,
				name: response.data.firstName + ' ' + response.data.lastName,
				isActive: true,
			}
			setUser(user);
			return <Navigate to="/" />;
		})
		.catch(err => {
			setError('Invalid credentials. Please try again.');
			console.log(err)
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onLogin(username, password);
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<StyledLabel style={{fontWeight: 'bold'}} htmlFor="username">Username:</StyledLabel>
					<Input
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<StyledLabel style={{fontWeight: 'bold'}} htmlFor="password">Password:</StyledLabel>
					<Input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && <p className="error-message">{error}</p>}
				<StyledButton type="submit">Login</StyledButton>
			</form>
		</div>
	);
};

const StyledButton = styled.button`
	padding: 8px 12px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		background-color: #45a049;
	}
`;

const StyledLabel = styled.label`
	fontWeight: bold;
	margin-right: 10px;
	display: flex;
	align-items: center;
`;

export default Login;