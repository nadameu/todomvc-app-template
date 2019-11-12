import { Model } from '../Model';
import { contramap, Prop, sequence, View, whenChanged } from '../View';

const Count = Prop('strong', 'textContent', (state: number) => String(state));

const Text = View((initialState: 's' | '', root: Node & ParentNode) => {
	const text = root.childNodes[1] as Text;
	render(initialState);
	return whenChanged(initialState, render);
	function render(state: 's' | '') {
		text.textContent = ` item${state} left`;
	}
});

const Combined = contramap(
	({ todos }: Model) => todos.filter(({ completed }) => !completed).length,
	sequence([Count, contramap(count => (count < 2 ? '' : 's'), Text)])
);

export const TodoCount = View((initialState: Model, root: ParentNode) => {
	const todoCount = root.querySelector('.todo-count') as HTMLSpanElement;
	return Combined(initialState, todoCount);
});
