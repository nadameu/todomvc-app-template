import { $ } from "../$";
import { Model } from "../Model";
import { functions as V, View } from "../View";

export const TodoCount: View = dispatch => {
	const todoCount = $(".todo-count") as HTMLSpanElement;
	return V.contramap(
		V.whenChanged(0, count => {
			if (count < 2) {
				todoCount.innerHTML = `<strong>${count}</strong> item left`;
			} else {
				todoCount.innerHTML = `<strong>${count}</strong> items left`;
			}
		}),
		(state: Model) => state.todos.filter(({ completed }) => !completed).length
	);
};
