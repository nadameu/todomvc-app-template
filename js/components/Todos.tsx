import { Fragment, h } from "preact";
import { View } from "../types";
import { Todo } from "./Todo";

export const Todos: View = (state, dispatch) => {
	const { todos } = state;
	return (
		<ul class="todo-list">
			{todos.map((info, i) => Todo(state, info, i, dispatch))}
		</ul>
	);
};
