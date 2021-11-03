import { h, JSX } from "preact";
import { Actions } from "../Actions";
import { View } from "../types";

export const NewTodo: View = ({ text, todoCreated }, dispatch) => {
	return (
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			autofocus
			onInput={onChange}
			onKeyPress={onKeyPress}
			value={todoCreated ? text : undefined}
		/>
	);

	function onChange(evt: JSX.TargetedEvent<HTMLInputElement>) {
		dispatch(Actions.CHANGE_INPUT_TEXT(evt.currentTarget.value));
	}

	function onKeyPress(evt: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
		if (evt.key === "Enter") {
			dispatch(Actions.ADD_TODO());
		}
	}
};
