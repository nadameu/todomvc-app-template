import { Dispatch, TodoInfo } from "../types";
import { Actions } from "../Actions";
import { State } from "../types";
import { ViewState } from "../types";
import { h, JSX } from "preact";
import { classMap } from "../classMap";

export function Todo(
	state: State,
	info: TodoInfo,
	index: number,
	dispatch: Dispatch
) {
	return (
		<li
			class={classMap({
				editing: info.editing,
				completed: info.completed,
			})}
			hidden={
				(state.view === ViewState.ACTIVE && info.completed) ||
				(state.view === ViewState.COMPLETED && !info.completed)
			}
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					checked={info.completed}
					onChange={onToggleChange}
				/>
				<label onDblClick={onDblClick}>{info.text}</label>
				<button class="destroy" onClick={onClick}></button>
			</div>
			<input class="edit" value={info.text} onKeyUp={onKeyUp} onBlur={onBlur} />
		</li>
	);

	function onBlur(evt: JSX.TargetedEvent<HTMLInputElement>) {
		textShouldBe(evt.currentTarget.value);
	}

	function onClick() {
		dispatch(Actions.DESTROY_TODO(index));
	}

	function onDblClick() {
		dispatch(Actions.TOGGLE_EDITING(index));
	}

	function onKeyUp(evt: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
		if (evt.key === "Enter") {
			textShouldBe(evt.currentTarget.value);
		} else if (evt.key === "Escape") {
			evt.currentTarget.value = info.text;
			textShouldBe(info.text);
		}
	}

	function onToggleChange(evt: JSX.TargetedEvent<HTMLInputElement>) {
		dispatch(Actions.TOGGLE_COMPLETED(index, evt.currentTarget.checked));
	}

	function textShouldBe(text: string) {
		const trimmed = text.trim();
		if (trimmed === "") {
			dispatch(Actions.DESTROY_TODO(index));
		} else {
			dispatch(Actions.CHANGE_TODO_TEXT(index, trimmed));
		}
	}
}
