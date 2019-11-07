import { Todo } from "./Todo";
import { ViewType } from "./ViewType";

export interface Model {
	todos: Todo[];
	toggleAll: boolean;
	view: ViewType;
}
