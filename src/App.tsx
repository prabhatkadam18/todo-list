import { useState } from "react";
import AppRoutes from "./AppRoutes";

import { UserContext, TodosContext, defaultState } from "./Contexts";
import { TodoType, UserType } from "./types";
import { setAuthToken } from "./commons";

const token = localStorage.getItem("token");
if (token) {
	setAuthToken(token);
}

function App() {

	const [user, setUser] = useState<UserType>(defaultState.user);
	const [todos, setTodos] = useState<TodoType[]>(defaultState.todos);

	return <UserContext.Provider value={{ user, setUser }}>
		<TodosContext.Provider value={{ todos, setTodos }}>
			<AppRoutes />
		</TodosContext.Provider>
	</UserContext.Provider>;
}

export default App;
