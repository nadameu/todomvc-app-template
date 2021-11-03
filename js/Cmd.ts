import { DeepPartial } from "redux";
import { Actions } from "./Actions";
import { STORAGE_ID } from "./constants";
import { Cmd, fromHash, only, State, TodoInfo } from "./types";

export const SAVE: Cmd = (dispatch) =>
	dispatch((state) => {
		const { view, ...saveMe } = state;
		localStorage.setItem(STORAGE_ID, JSON.stringify(saveMe));
		return only(state);
	});

export const LOAD: Cmd = (dispatch) =>
	dispatch((state) => {
		let parsed = {};
		try {
			parsed = JSON.parse(localStorage.getItem(STORAGE_ID) || "{}");
		} catch (_) {}
		const {
			allCompleted = undefined,
			text = "",
			todoCreated = false,
			todos: partialTodos = [],
		} = parsed as DeepPartial<State>;
		const todos = partialTodos
			.map(
				({ completed = false, editing = false, text = "" } = {}): TodoInfo => ({
					completed,
					editing,
					text,
				})
			)
			.filter((x) => x.text !== "");

		return only({
			...state,
			allCompleted,
			text,
			todoCreated,
			todos,
			view: fromHash(window.location.hash),
		});
	});

export const FOCUS_EDITING: Cmd = (dispatch) =>
	dispatch((state) => {
		const editing = document.querySelector(
			".editing .edit"
		) as HTMLInputElement | null;
		if (editing) {
			editing.select();
			editing.focus();
		}
		return only(state);
	});

export const TODO_CREATED: Cmd = (dispatch) => {
	const input = document.querySelector(".new-todo") as HTMLInputElement;
	input.focus();
	dispatch(Actions.CLEAR_TODO_CREATED());
};

let subscribed = false;
export const HASH_CHANGE: Cmd = (dispatch) => {
	if (subscribed) return;
	window.addEventListener("hashchange", function listener() {
		dispatch(Actions.CHANGE_VIEW(fromHash(document.location.hash)));
	});
	subscribed = true;
};
