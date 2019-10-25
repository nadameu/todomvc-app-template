import { html } from "lit-html";
import { State } from "../State";
import { Todos } from "./Todos";
import { store } from "../store";
import { Actions } from "../Action";

export function Main(state: State) {
	return html`
		<section class="main" ?hidden=${state.todos.length === 0}>
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				.checked=${state.allCompleted === true}
				@change=${onChange}
			/>
			<label for="toggle-all">Mark all as complete</label>
			${Todos(state)}
		</section>
	`;
}

function onChange(this: HTMLInputElement) {
	store.dispatch(Actions.toggleAllCompleted(this.checked));
}
