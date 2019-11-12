import { Actions } from '../Action';
import { dispatch } from '../dispatch';
import { listen } from '../listen';
import { Model } from '../Model';
import { contramap, Existing } from '../View';

export const ClearCompleted = contramap(
	({ todos }: Model) => todos.filter(({ completed }) => completed).length <= 0,
	Existing('.clear-completed', (clearCompleted: HTMLButtonElement) => {
		listen(clearCompleted, 'click', () => dispatch(Actions.ClearCompleted));
		return state => {
			clearCompleted.hidden = state;
		};
	})
);
