import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TodosContext } from "../Contexts";

interface CheckboxProps {
  label: string;
  id: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, id }) => {
	// const [isChecked, setIsChecked] = useState(false);
	const { todos, setTodos } = useContext(TodosContext);
	const isChecked = todos.find(todo => todo.id === id)?.completed;

	const toggleCheckbox = () => {
		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					completed: !todo.completed
				};
			}
			return todo;
		});
		setTodos(newTodos);
	};

	return (
		<CheckboxWrapper data-cy={'CheckboxWrapper'}>
			<StyledCheckbox data-checked={isChecked} onClick={toggleCheckbox} >
				<CheckCircleOutlined />
			</StyledCheckbox>
			<StyledLabel onClick={toggleCheckbox} data-checked={isChecked} htmlFor={label}>{label}</StyledLabel>
		</CheckboxWrapper>
	);
};

const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const StyledCheckbox = styled.div`
	:hover {
		color: #4caf50;
		cursor: pointer;
	}
	&[data-checked="true"] {
		color: #4caf50;
	}
`;

const StyledLabel = styled.label`
	font-size: 16px;
	cursor: pointer;
	&[data-checked="true"] {
		color: #4caf50;
		text-decoration: line-through;
	}
	user-select: none;
`;

export default Checkbox;