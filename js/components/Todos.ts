import { html } from "lit-html";
import { State } from "../State";
import { Todo } from "./Todo";

export function Todos(state: State) {
	const { todos } = state;
	return html`
		<ul class="todo-list">
			${todos.map((info, i) => Todo(state, info, i))}
		</ul>
	`;
}
