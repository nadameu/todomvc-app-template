import { Todo } from './Todo';

const STORAGE_KEY = 'todomvc-nadameu';

function isTodo(object: unknown): object is Todo {
	if (typeof object !== 'object' || object === null) return false;
	const keys = Object.keys(object);
	return (keys.length === 2) && (typeof (object as Todo).text === 'string') && (typeof (object as Todo).completed === 'boolean');
}

function assertIsArray(object:unknown): asserts object is unknown[] {
	if (!Array.isArray(object)) throw 0
}

function assertIsTodos(object: unknown): asserts object is Todo[] {
	assertIsArray(object);
	if(!object.every(isTodo)) throw 0;
}

export const loadTodos = (): Todo[] => {
	try {
		const text = localStorage.getItem(STORAGE_KEY) || '[]';
		const parsed = JSON.parse(text);
		assertIsTodos(parsed);
		return parsed;
	} catch (_) {
		return [];
	}
};

export const saveTodos = (todos: Todo[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
