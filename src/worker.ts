import { Actions } from './Action';
import { CustomEventMap } from './dispatch';
import { Model } from './Model';
import { loadTodos } from './Storage';
import { Todo } from './Todo';
import { fromHash } from './ViewType';

declare const self: Worker;

console.log('This is a worker.');

function mount<model, a>(
	initialState: model,
	listeners: {
		[k in keyof CustomEventMap]: (
			state: model,
			...payload: CustomEventMap[k]
		) => model;
	}
) {
	let state = initialState;
	((self as unknown) as Worker).postMessage({
		command: 'initial-state',
		state
	});
	if (process.env.NODE_ENV === 'development') {
		console.log('initial state', state);
	}
	self.addEventListener('message', evt => {
		if (evt.data.type === 'hash') {
			state = listeners[Actions.ChangeView](state, fromHash(evt.data.hash));
		} else {
			const handler = listeners[evt.data.type as Actions] as (
				state: model,
				...payload: any[]
			) => model;
			state = handler(state, ...evt.data.payload);
		}
		if (process.env.NODE_ENV === 'development') {
			console.log('new state', state);
		}
		render(state);
	});
	const render = (state: model) => {
		self.postMessage({ command: 'render', state });
	};
}

const listeners: {
	[k in keyof CustomEventMap]: (
		state: Model,
		...payload: CustomEventMap[k]
	) => Model;
} = {
	[Actions.AddTodo](state, text) {
		const cleanText = text.trim();
		if (cleanText === '') return state;
		return { ...state, todos: [...state.todos, Todo(text, false)] };
	},
	[Actions.ChangeText](state, index, text) {
		const todos = [...state.todos];
		todos[index] = { ...todos[index], text };
		return { ...state, todos };
	},
	[Actions.ChangeView](state, view) {
		return { ...state, view };
	},
	[Actions.ClearCompleted](state) {
		const todos = state.todos.filter(({ completed }) => !completed);
		return { ...state, toggleAll: false, todos };
	},
	[Actions.DestroyTodo](state, index) {
		const todos = [...state.todos];
		todos.splice(index, 1);
		return { ...state, todos };
	},
	[Actions.ToggleAll](state, completed) {
		const todos = state.todos.map(todo => ({ ...todo, completed }));
		return { ...state, toggleAll: completed, todos };
	},
	[Actions.ToggleTodo](state, index, completed) {
		const todos = [...state.todos];
		todos[index] = { ...todos[index], completed };
		return { ...state, todos };
	}
};

let mounted = false;
self.addEventListener('message', evt => {
	if (mounted) return;
	if (evt.data.type === 'init') {
		mounted = true;
		mount(evt.data.initialState, listeners);
	}
});
