import * as Cmd from "./Cmd";
import * as Effects from "./Effects";
import { Action, enqueue, only, ViewState } from "./types";

function createActions(E: typeof Effects) {
	const Actions = {
		ADD_TODO(): Action {
			return (state) => {
				const text = state.text.trim();
				if (text === "") return only(state);
				return enqueue(
					{
						...state,
						todos: [...state.todos, { text, editing: false, completed: false }],
						todoCreated: true,
						text: "",
					},
					(dispatch) => {
						Cmd.TODO_CREATED(dispatch);
						Cmd.SAVE(dispatch);
					}
				);
			};
		},
		CHANGE_INPUT_TEXT(text: string): Action {
			return (state) => enqueue({ ...state, text }, Cmd.SAVE);
		},
		CHANGE_TODO_TEXT(index: number, text: string): Action {
			return (state) =>
				enqueue(
					{
						...state,
						todos: state.todos.map((todo, i) =>
							i !== index ? todo : { ...todo, text, editing: false }
						),
					},
					Cmd.SAVE
				);
		},
		CHANGE_VIEW(view: ViewState): Action {
			return (state) => only({ ...state, view });
		},
		CLEAR_COMPLETED(): Action {
			return (state) =>
				enqueue(
					{
						...state,
						allCompleted: undefined,
						todos: state.todos.filter((x) => !x.completed),
					},
					Cmd.SAVE
				);
		},
		CLEAR_TODO_CREATED(): Action {
			return (state) => enqueue({ ...state, todoCreated: false }, Cmd.SAVE);
		},
		DESTROY_TODO(index: number): Action {
			return (state) =>
				enqueue(
					{
						...state,
						todos: state.todos
							.slice(0, index)
							.concat(state.todos.slice(index + 1)),
					},
					Cmd.SAVE
				);
		},
		TOGGLE_ALL_COMPLETED(completed: boolean | undefined): Action {
			return (state) => {
				if (completed === undefined)
					return enqueue({ ...state, allCompleted: undefined }, Cmd.SAVE);
				return enqueue(
					{
						...state,
						allCompleted: completed,
						todos: state.todos.map((todo) =>
							todo.completed === completed ? todo : { ...todo, completed }
						),
					},
					Cmd.SAVE
				);
			};
		},
		TOGGLE_COMPLETED(index: number, completed: boolean): Action {
			return (state) =>
				enqueue(
					{
						...state,
						todos: state.todos.map((todo, i) =>
							i !== index ? todo : { ...todo, completed }
						),
					},
					Cmd.SAVE
				);
		},
		TOGGLE_EDITING(index: number): Action {
			return (state) =>
				enqueue(
					{
						...state,
						todos: state.todos.map((todo, i) =>
							i !== index ? todo : { ...todo, editing: true }
						),
					},
					(dispatch) => {
						Cmd.FOCUS_EDITING(dispatch);
						Cmd.SAVE(dispatch);
					}
				);
		},
	};
	return Actions;
}

export const Actions = createActions(Effects);
