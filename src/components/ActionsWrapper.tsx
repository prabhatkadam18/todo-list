import React from 'react';
import { DownOutlined, EllipsisOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styled from 'styled-components';


interface ActionsWrapperProps {
	showCreateItem: () => void;
};

const ActionsWrapper: React.FC<ActionsWrapperProps> = ({showCreateItem}) => {
	const items: MenuProps['items'] = [
		{
			key: 'add-item',
			label: (
				<>
					Add item
				</>
			),
			onClick: () => {
				showCreateItem();
			}
		},
	];

	
	return <Dropdown menu={{ items }} trigger={['click']}>
		<StyledSpace>
			<EllipsisOutlined /> 
		</StyledSpace>
	</Dropdown>
};

const StyledSpace = styled(Space)`
	:hover {
		cursor: pointer;
	}
	margin-left: auto;
`;


export default ActionsWrapper;