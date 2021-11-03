import { Fragment, h, JSX } from "preact";
import { Actions } from "../Actions";
import { View } from "../types";
import { Todos } from "./Todos";

export const Main: View = (state, dispatch) => {
	return (
		<section class="main" hidden={state.todos.length === 0}>
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				checked={state.allCompleted === true}
				onChange={onChange}
			/>
			<label for="toggle-all">Mark all as complete</label>
			{Todos(state, dispatch)}
		</section>
	);

	function onChange(evt: JSX.TargetedEvent<HTMLInputElement>) {
		dispatch(Actions.TOGGLE_ALL_COMPLETED(evt.currentTarget.checked));
	}
};
