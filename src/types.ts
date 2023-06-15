
export type UserType = {
	name: string | null;
	username: string | null;
	isActive: boolean;
};


export type UserContextType = {
	user: UserType
	setUser: (user: UserType) => void;
};

export type TodoType = {
	id: string;
	title: string;
	completed: boolean;
	subItems?: string[];
	parentId?: string;
};

export type TodosContextType = {
	todos: TodoType[];
	setTodos: (todos: TodoType[]) => void;
};
