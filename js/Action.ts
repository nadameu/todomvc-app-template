import { ViewState } from "./ViewState";

export const Actions = {
	addTodo: () => ({ type: "ADD_TODO" as const }),
	changeInputText: (text: string) => ({
		type: "CHANGE_INPUT_TEXT" as const,
		text
	}),
	changeTodoText: (index: number, text: string) => ({
		type: "CHANGE_TODO_TEXT" as const,
		index,
		text
	}),
	changeView: (view: ViewState) => ({
		type: "CHANGE_VIEW" as const,
		view
	}),
	clearCompleted: () => ({
		type: "CLEAR_COMPLETED" as const
	}),
	clearTodoCreated: () => ({
		type: "CLEAR_TODO_CREATED" as const
	}),
	destroyTodo: (index: number) => ({
		type: "DESTROY_TODO" as const,
		index
	}),
	toggleAllCompleted: (completed: boolean | undefined) => ({
		type: "TOGGLE_ALL_COMPLETED" as const,
		completed
	}),
	toggleCompleted: (index: number, completed: boolean) => ({
		type: "TOGGLE_COMPLETED" as const,
		index,
		completed
	}),
	toggleEditing: (index: number) => ({
		type: "TOGGLE_EDITING" as const,
		index
	})
};

export type Action = ReturnType<typeof Actions[keyof typeof Actions]>;
