import { View, contramap } from '../View';
import { Model } from '../Model';
import { saveTodos } from '../Storage';
import { Todo } from '../Todo';

export const PersistTodos = contramap(
	(state: Model) => state.todos,
	View(() => (todos: Todo[]) => {
		saveTodos(todos);
	})
);
