import { $ } from "../$";
import { Model } from "../Model";
import { functions as V, View } from "../View";

export const FooterSection: View = dispatch => {
	const footer = $(".footer") as HTMLElement;
	return V.contramap(
		V.bindProperty(footer, "hidden"),
		(state: Model) => state.todos.length <= 0
	);
};
