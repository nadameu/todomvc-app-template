import { $ } from '../$';
import { listen } from '../listen';
import { Model } from '../Model';
import * as Msg from '../Msg';
import { functions as V, View } from '../View';

export const ClearCompleted: View = dispatch => {
	const clearCompleted = $('.clear-completed') as HTMLButtonElement;
	listen(clearCompleted, 'click', () => dispatch(Msg.ClearCompleted));
	return V.contramap(
		V.bindProperty(clearCompleted, 'hidden'),
		(state: Model) =>
			state.todos.filter(({ completed }) => completed).length <= 0
	);
};
