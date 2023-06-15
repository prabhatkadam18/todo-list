
import React, {useContext} from 'react';
import styled from 'styled-components';
import { UserContext } from '../Contexts';
import { Button } from 'antd';
import { logout } from '../commons';


const UserDetailsContainer = () => {

	const { user } = useContext(UserContext);

	return (
		<Wrapper>
			{user && <div>{user.name}</div>}
			<Button type="primary" onClick={logout}>Log Out</Button>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: auto;
	padding: 20px;
	gap: 20px;
`;

export default UserDetailsContainer;