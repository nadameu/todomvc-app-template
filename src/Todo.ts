export interface Todo {
	text: string;
	completed: boolean;
}
export function Todo(text: string, completed: boolean): Todo {
	return { text, completed };
}
