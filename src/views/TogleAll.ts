import { $ } from "../$";
import { listen } from "../listen";
import { Model } from "../Model";
import { functions as V, View } from "../View";

export const TogleAll: View = dispatch => {
	const togleAll = $(".toggle-all") as HTMLInputElement;
	listen(togleAll, "change", () =>
		dispatch({ type: "ToggleAll", completed: togleAll.checked })
	);
	return V.contramap(
		V.bindProperty(togleAll, "checked"),
		(state: Model) => state.toggleAll
	);
};
