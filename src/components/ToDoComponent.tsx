import styled from "styled-components";
import React, { useState, useContext } from "react";
import { TodoType } from "../types";
import { BranchesOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Checkbox from "./Checkbox";
import { TodosContext } from "../Contexts";
import ActionsWrapper from "./ActionsWrapper";
import { Button, Input } from "antd";

interface TodoProps {
	todo: TodoType;
	subTodos?: TodoType[];
};

const Todo: React.FC<TodoProps> = ({ todo, subTodos }) => {
	const [showSubItems, setShowSubItems] = useState(false);
	const [shouldShowCreateItem, setShouldShowCreateItem] = useState(false);
	const [newItemTitle, setNewItemTitle] = useState('');
	const { todos, setTodos } = useContext(TodosContext);

	const toggleSubItems = () => {
		if (showSubItems) {
			setShouldShowCreateItem(false);
		}
		setShowSubItems(!showSubItems);
	};

	const showCreateItem = () => {
		setShowSubItems(true);
		setShouldShowCreateItem(true);
	};

	const discardCreateItem = () => {
		setShouldShowCreateItem(false);
	};

	const addNewItem = () => {
		const newTodo: TodoType = {
			id: new Date().getTime().toString(),
			title: newItemTitle,
			completed: false,
			parentId: todo.id
		};
		const newTodos = todos.map(e => {
			if (e.id === todo.id) {
				if (!e.subItems) {
					e.subItems = [];
				}
				e.subItems.push(newTodo.id);
			}
			return e;
		});
		newTodos.push(newTodo);
		setTodos(newTodos);
		setNewItemTitle('');
		setShouldShowCreateItem(false);
	};


	return (
		<TodoWrapper data-cy={'TodoWrapper'}>
			<TodoContainer data-cy={'TodoContainer'}>
				<Checkbox label={todo.title} id={todo.id} />
				{todo.subItems && (
					<SubItemsCountWrapper data-cy={'SubItemsWrapper'} onClick={toggleSubItems}>
						{todo.subItems?.length > 0 ? todo.subItems.length : null}
						<StyledSubTodoIcon />
					</SubItemsCountWrapper>
				)}
				<ActionsWrapper showCreateItem={showCreateItem} />
			</TodoContainer>
			{showSubItems && (
				<SubItemsWrapper data-cy={'SubItemsWrapper'}>
					{subTodos?.length && subTodos.length > 0 ? subTodos?.map((subItem) => {
						const nestedSubTodos = todos.filter((subTodo: TodoType) => subTodo.parentId === subItem.id);
						return <Todo key={subItem.id} todo={subItem} subTodos={nestedSubTodos} />
					}) : null}
					{
						shouldShowCreateItem && (
							<CreateItemWrapper>
								<CreateItemInput value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
								<CreateItemButton onClick={addNewItem}>
									<CheckCircleOutlined />
								</CreateItemButton>
								<DiscardItemButton onClick={discardCreateItem}>
									<CloseCircleOutlined />
								</DiscardItemButton>
							</CreateItemWrapper>
						)
					}
				</SubItemsWrapper>
			)}	
		</TodoWrapper>
	);
};


const ToDoComponent = () => {
	const { todos } = useContext(TodosContext);

	return (
		<Wrapper data-cy={'Wrapper'}>
			<h3>My Todo</h3>
			<Container data-cy={'Container'}>
				{todos.map((todo: TodoType) => {
					if (todo.parentId) return null;

					const subTodos = todos.filter((subTodo: TodoType) => subTodo.parentId === todo.id);
					// if (todo.subItems?.length) {

					return <Todo data-cy={'Todo'} key={todo.id} todo={todo} subTodos={subTodos} />

				})}
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const TodoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	flex-basis: 60px; 

`;

const TodoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	flex-basis: 60px;
	width: 40rem;
`;

const SubItemsCountWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	flex-basis: 60px;
	width: 60rem;
	font-size: 12px;
	gap: 3px;
	color: #bfbebe;
`;

const SubItemsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-left: 5rem;
`;

const StyledSubTodoIcon = styled(BranchesOutlined)`
	transform: rotate(90deg);
	:hover {
		cursor: pointer;
	}
`;

const CreateItemWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 10px;
`;

const CreateItemInput = styled(Input)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30rem;
`;

const CreateItemButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DiscardItemButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	:hover {
		border-color: red !important;
		color: red !important;
	}
`;


// const ActionsWrapper = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;


export default ToDoComponent;