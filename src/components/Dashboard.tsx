import React from 'react';
import styled from 'styled-components';
import ToDoComponent from './ToDoComponent';
import UserDetailsContainer from './UserDetailsContainer';

const Dashboard = () => {
	return (
		<Container data-cy="Container" >
			<UserDetailsContainer />
			<Heading data-cy="Heading">
				<h1>To Do</h1>
			</Heading>
			<Content>
				<ToDoComponent />
			</Content>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Heading = styled(Container)`
	flex-direction: row;
`;
const Content = styled(Container)`
	flex-direction: row;
`;

export default Dashboard;
