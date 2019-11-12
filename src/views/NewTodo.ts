import { Actions } from '../Action';
import { dispatch } from '../dispatch';
import * as KeyCode from '../KeyCode';
import { listen } from '../listen';
import { Existing } from '../View';

export const NewTodo = Existing('.new-todo', (newTodo: HTMLInputElement) => {
	listen(newTodo, 'keyup', evt => {
		if (evt.keyCode === KeyCode.ENTER) {
			dispatch(Actions.AddTodo, newTodo.value);
			newTodo.value = '';
		}
	});
});
