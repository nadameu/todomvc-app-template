import { Todo } from './Todo';

const STORAGE_KEY = 'todomvc-nadameu';

export const loadTodos = (): Todo[] => {
	const a = localStorage.getItem(STORAGE_KEY) || '[]';
	const b: unknown = JSON.parse(a);
	if (Array.isArray(b)) {
		if (
			(b as unknown[]).every(todo => {
				if (typeof todo !== 'object' || todo === null) return false;
				const keys = Object.keys(todo);
				if (keys.length !== 2) return false;
				if (typeof (todo as Todo).text !== 'string') return false;
				if (typeof (todo as Todo).completed !== 'boolean') return false;
				return true;
			})
		) {
			return b as Todo[];
		}
	}
	return [];
};

export const saveTodos = (todos: Todo[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
