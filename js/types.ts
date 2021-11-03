import { JSX } from "preact";

export const ViewState = {
	ALL: "ALL",
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED",
} as const;
export type ViewState = typeof ViewState[keyof typeof ViewState];

export function fromHash(hash: string): ViewState {
	switch (hash) {
		case "#/active":
			return ViewState.ACTIVE;

		case "#/completed":
			return ViewState.COMPLETED;

		case "#/":
		default:
			return ViewState.ALL;
	}
}

export interface TodoInfo {
	editing: boolean;
	completed: boolean;
	text: string;
}

export type State = {
	allCompleted: boolean | undefined;
	text: string;
	todos: TodoInfo[];
	todoCreated: boolean;
	view: ViewState;
};

export type Action = { (state: State): ActionResult };
export type ActionResult = [State] | [State, Cmd];
export type Cmd = Handler<Dispatch>;
export type Dispatch = Handler<Action>;
export type Handler<T> = { (_: T): void };
export type Lazy<T> = { (): T };
export type View = { (state: State, dispatch: Dispatch): JSX.Element };

export function only(state: State): ActionResult {
	return [state];
}
export function enqueue(state: State, cmd: Cmd): ActionResult {
	return [state, cmd];
}
