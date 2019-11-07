import { Action } from "./Action";

export const dispatch = (action: Action) => {
	document.dispatchEvent(
		new CustomEvent("action-dispatched", { detail: action })
	);
};
