import { $ } from "../$";
import { Model } from "../Model";
import { functions as V, View } from "../View";

export const MainSection: View = dispatch => {
	const main = $(".main") as HTMLElement;
	return V.contramap(
		V.bindProperty(main, "hidden"),
		(state: Model) => state.todos.length <= 0
	);
};
