import { html } from "lit-html";
import { State } from "../State";
import { NewTodo } from "./NewTodo";

export function Header(state: State) {
	return html`
		<header class="header">
			<h1>todos</h1>
			${NewTodo(state)}
		</header>
	`;
}
