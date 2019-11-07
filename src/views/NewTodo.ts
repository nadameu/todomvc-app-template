import { $ } from "../$";
import * as KeyCode from "../KeyCode";
import { listen } from "../listen";
import { View } from "../View";

export const NewTodo: View = dispatch => {
	const newTodo = $(".new-todo") as HTMLInputElement;
	listen(newTodo, "keyup", (evt: KeyboardEvent) => {
		if (evt.keyCode === KeyCode.ENTER) {
			dispatch({ type: "AddTodo", text: newTodo.value, completed: false });
			newTodo.value = "";
		}
	});
	return () => {};
};
