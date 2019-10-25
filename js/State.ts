import { TodoInfo } from "./TodoInfo";
import { ViewState } from "./ViewState";

export type State = {
	allCompleted: boolean | undefined;
	text: string;
	todos: TodoInfo[];
	todoCreated: boolean;
	view: ViewState;
};
