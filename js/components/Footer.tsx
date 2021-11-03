import { Fragment, h } from "preact";
import { Actions } from "../Actions";
import { View, ViewState } from "../types";
import { Filter } from "./Filter";

export const Footer: View = (state, dispatch) => {
	const left = state.todos.filter((x) => !x.completed).length;
	return (
		<footer class="footer">
			<span class="todo-count">
				<strong>{left}</strong> item{left > 1 ? "s" : ""} left
			</span>
			<ul class="filters">
				{Filter(state, "#/", ViewState.ALL, "All", dispatch)}
				{Filter(state, "#/active", ViewState.ACTIVE, "Active", dispatch)}
				{Filter(
					state,
					"#/completed",
					ViewState.COMPLETED,
					"Completed",
					dispatch
				)}
			</ul>
			<button
				class="clear-completed"
				hidden={state.todos.length - left === 0}
				onClick={onClick}
			>
				Clear completed
			</button>
		</footer>
	);

	function onClick() {
		dispatch(Actions.CLEAR_COMPLETED());
	}
};
