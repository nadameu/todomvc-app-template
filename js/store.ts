import { createStore, DeepPartial } from "redux";
import { Action } from "./Action";
import { STORAGE_ID } from "./constants";
import { State } from "./State";
import { TodoInfo } from "./TodoInfo";
import { fromHash } from "./ViewState";

const initialState = ((): State => {
	const {
		allCompleted = undefined,
		text = "",
		todoCreated = false,
		todos: partialTodos = []
	} = JSON.parse(localStorage.getItem(STORAGE_ID) || "{}") as DeepPartial<
		State
	>;
	const todos = partialTodos
		.map(x => x || {})
		.map(
			({ completed = false, editing = false, text = "" }): TodoInfo => ({
				completed,
				editing,
				text
			})
		)
		.filter(x => x.text !== "");

	return {
		allCompleted,
		text,
		todoCreated,
		todos,
		view: fromHash(window.location.hash)
	};
})();

export const store = createStore(
	(state: State = initialState, action: Action): State => {
		console.log("Action dispatched:", action);
		switch (action.type) {
			case "ADD_TODO": {
				const text = state.text.trim();
				if (text === "") return state;
				return {
					...state,
					todos: [...state.todos, { text, editing: false, completed: false }],
					todoCreated: true,
					text: ""
				};
			}

			case "CHANGE_INPUT_TEXT":
				return { ...state, text: action.text };

			case "CHANGE_TODO_TEXT":
				return {
					...state,
					todos: state.todos.map((todo, i) =>
						i !== action.index
							? todo
							: { ...todo, text: action.text, editing: false }
					)
				};

			case "CHANGE_VIEW":
				return { ...state, view: action.view };

			case "CLEAR_COMPLETED":
				return {
					...state,
					allCompleted: undefined,
					todos: state.todos.filter(x => !x.completed)
				};

			case "CLEAR_TODO_CREATED":
				return { ...state, todoCreated: false };

			case "DESTROY_TODO":
				return {
					...state,
					todos: state.todos
						.slice(0, action.index)
						.concat(state.todos.slice(action.index + 1))
				};

			case "TOGGLE_ALL_COMPLETED":
				if (action.completed === undefined)
					return { ...state, allCompleted: undefined };
				return {
					...state,
					allCompleted: action.completed,
					todos: state.todos.map(todo =>
						todo.completed === action.completed
							? todo
							: { ...todo, completed: action.completed as boolean }
					)
				};

			case "TOGGLE_COMPLETED":
				return {
					...state,
					todos: state.todos.map((todo, i) =>
						i !== action.index ? todo : { ...todo, completed: action.completed }
					)
				};

			case "TOGGLE_EDITING":
				return {
					...state,
					todos: state.todos.map((todo, i) =>
						i !== action.index ? todo : { ...todo, editing: true }
					)
				};

			default:
				return state;
		}
	}
);
