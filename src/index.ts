import { Model } from './Model';
import { Msg } from './Msg';
import { Update } from './Update';
import { Dispatch, View } from './View';
import { App } from './views/App';
import { fromHash } from './ViewType';
import { loadTodos, saveTodos } from './Storage';

const init = (): Model => {
	return {
		todos: loadTodos(),
		toggleAll: false,
		view: fromHash(document.location.hash)
	};
};

const initialState = init();

const update: Update = (state, msg) => {
	switch (msg.type) {
		case 'AddTodo':
			if (msg.text.trim() === '') return state;
			return {
				...state,
				todos: state.todos.concat([{ text: msg.text.trim(), completed: false }])
			};

		case 'ChangeText':
			return {
				...state,
				todos: state.todos.map((todo, index) =>
					index === msg.index ? { ...todo, text: msg.text } : todo
				)
			};

		case 'ChangeView':
			return { ...state, view: msg.view };

		case 'ClearCompleted':
			return {
				...state,
				todos: state.todos.filter(({ completed }) => !completed)
			};

		case 'DestroyTodo':
			return {
				...state,
				todos: state.todos
					.slice(0, msg.index)
					.concat(state.todos.slice(msg.index + 1))
			};

		case 'ToggleAll':
			return {
				...state,
				toggleAll: msg.completed,
				todos: state.todos.map(todo => ({ ...todo, completed: msg.completed }))
			};

		case 'ToggleTodo':
			return {
				...state,
				todos: state.todos.map((todo, index) =>
					index === msg.index ? { ...todo, completed: msg.completed } : todo
				)
			};

		default:
			return state;
	}
};

const mount = (initialState: Model, update: Update, component: View) => {
	let state = initialState;
	console.log('initial state', state);
	const dispatch: Dispatch = msg =>
		setTimeout(() => {
			state = update(state, msg);
			saveTodos(state.todos);
			console.log('new state', state);
			view(state);
		});
	const view = component(dispatch);
	view(state);
};

mount(initialState, update, App);
