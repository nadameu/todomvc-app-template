import { TodoInfo } from "../TodoInfo";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { store } from "../store";
import { Actions } from "../Action";
import { State } from "../State";
import { ViewState } from "../ViewState";

export function Todo(state: State, info: TodoInfo, index: number) {
	return html`
		<li
			class=${classMap({
				editing: info.editing,
				completed: info.completed
			})}
			?hidden=${(state.view === ViewState.ACTIVE && info.completed) ||
				(state.view === ViewState.COMPLETED && !info.completed)}
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					.checked=${info.completed}
					@change=${onToggleChange}
				/>
				<label @dblclick=${onDblClick}>${info.text}</label>
				<button class="destroy" @click=${onClick}></button>
			</div>
			<input
				class="edit"
				.value=${info.text}
				@keyup=${onKeyUp}
				@blur=${onBlur}
			/>
		</li>
	`;

	function onBlur(this: HTMLInputElement, evt: Event) {
		textShouldBe(this.value);
	}

	function onClick(this: HTMLButtonElement, evt: Event) {
		store.dispatch(Actions.destroyTodo(index));
	}

	function onDblClick(this: HTMLLabelElement, evt: Event) {
		store.dispatch(Actions.toggleEditing(index));
	}

	function onKeyUp(this: HTMLInputElement, evt: KeyboardEvent) {
		if (evt.key === "Enter") {
			textShouldBe(this.value);
		} else if (evt.key === "Escape") {
			this.value = info.text;
			textShouldBe(info.text);
		}
	}

	function onToggleChange(this: HTMLInputElement, evt: Event) {
		store.dispatch(Actions.toggleCompleted(index, this.checked));
	}

	function textShouldBe(text: string) {
		const trimmed = text.trim();
		if (trimmed === "") {
			store.dispatch(Actions.destroyTodo(index));
		} else {
			store.dispatch(Actions.changeTodoText(index, trimmed));
		}
	}
}
