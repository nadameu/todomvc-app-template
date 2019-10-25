import { html } from "lit-html";
import { Actions } from "../Action";
import { State } from "../State";
import { store } from "../store";
import { ViewState } from "../ViewState";
import { Filter } from "./Filter";

export function Footer(state: State) {
	const left = state.todos.filter(x => !x.completed).length;
	return html`
		<footer class="footer">
			<!-- This should be \`0 items left\` by default -->
			<span class="todo-count"
				><strong>${left}</strong> item${left > 1 ? "s" : ""} left</span
			>
			<!-- Remove this if you don't implement routing -->
			<ul class="filters">
				${Filter(state, "#/", ViewState.ALL, "All")}
				${Filter(state, "#/active", ViewState.ACTIVE, "Active")}
				${Filter(state, "#/completed", ViewState.COMPLETED, "Completed")}
			</ul>
			<!-- Hidden if no completed items are left ↓ -->
			<button
				class="clear-completed"
				?hidden=${state.todos.length - left === 0}
				@click=${onClick}
			>
				Clear completed
			</button>
		</footer>
	`;
}

function onClick() {
	store.dispatch(Actions.clearCompleted());
}
