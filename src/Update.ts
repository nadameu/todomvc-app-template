import { Model } from './Model';
import { Todo } from './Todo';
import { Handler } from './View';
import { ViewType } from './ViewType';

const updaters = (() => {
	const updateTodos = (f: (_: Todo[]) => Todo[]) => (state: Model): Model => {
		state.todos = f(state.todos);
		return state;
	};
	return {
		AddTodo(text: string, completed: boolean) {
			const cleanText = text.trim();
			if (cleanText === '') return (state: Model) => state;
			return updateTodos(
				todos => (todos.push(Todo(cleanText, completed)), todos)
			);
		},
		ChangeText(index: number, text: string) {
			return updateTodos(todos => ((todos[index].text = text), todos));
		},
		ChangeView(view: ViewType) {
			return (state: Model) => ({ ...state, view });
		},
		ClearCompleted() {
			return (state: Model) => ({
				...state,
				toggleAll: false,
				todos: state.todos.filter(({ completed }) => !completed)
			});
		},
		DestroyTodo(index: number) {
			return updateTodos(todos => (todos.splice(index, 1), todos));
		},
		ToggleAll(completed: boolean) {
			return (state: Model) => ({
				...state,
				toggleAll: completed,
				todos: state.todos.map(todo => ({ ...todo, completed }))
			});
		},
		ToggleTodo(index: number, completed: boolean) {
			return updateTodos(
				todos => ((todos[index].completed = completed), todos)
			);
		}
	};
})();

export const update = (f: Handler<(_: Model) => Model>) =>
	Object.entries(updaters).reduce(
		(obj, [key, value]: [string, (...args: any[]) => (_: Model) => Model]) => {
			obj[key as keyof typeof updaters] = (...args: any[]) => f(value(...args));
			return obj;
		},
		{} as {
			[k in keyof typeof updaters]: typeof updaters[k] extends (
				...args: infer A
			) => (_: Model) => Model
				? (...args: A) => void
				: never;
		}
	);

type U = ReturnType<typeof update>;
export interface Msg extends U {}
