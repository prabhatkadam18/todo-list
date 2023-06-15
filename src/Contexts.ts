import { createContext } from 'react';
import { TodoType, TodosContextType, UserType, UserContextType } from './types';

export const defaultState: {
	user: UserType,
	todos: TodoType[],
} = {
	user: {
		name: null,
		username: null,
		isActive: false,
	},
	todos: [
		{
			id: '1',
			title: "Item 1",
			completed: false,
			subItems: [
				'2', '3'
			],
		},
		{
			id: '5',
			title: "Item 2",
			completed: false,
		},
		{
			id: '2',
			title: "Subitem 1.1",
			completed: false,
			parentId: '1',
		},
		{
			id: '3',
			title: "Subitem 1.2",
			completed: false,
			subItems: [
				'4'
			],
			parentId: '1',

		},
		{
			id: '4',
			title: "Subsubitem 1.2.1",
			completed: false,
			parentId: '3',
		},
	],
}

export const UserContext = createContext<UserContextType>({
	user: defaultState.user,
	setUser: () => {},
});

export const TodosContext = createContext<TodosContextType>({
	todos: defaultState.todos,
	setTodos: () => {},
});
