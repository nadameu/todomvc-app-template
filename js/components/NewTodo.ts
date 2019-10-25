import { html } from "lit-html";
import { Actions } from "../Action";
import { State } from "../State";
import { store } from "../store";

export function NewTodo({ text, todoCreated }: State) {
	return html`
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			autofocus
			@change=${onChange}
			@keypress=${onKeyPress}
			.value=${todoCreated ? text : null}
		/>
	`;
}

function onChange(this: HTMLInputElement, evt: Event) {
	store.dispatch(Actions.changeInputText(this.value));
}

function onKeyPress(this: HTMLInputElement, evt: KeyboardEvent) {
	if (evt.key === "Enter") {
		this.blur();
		store.dispatch(Actions.addTodo());
	}
}
