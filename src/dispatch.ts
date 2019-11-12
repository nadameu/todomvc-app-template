import { Actions } from './Action';
import { ViewType } from './ViewType';

export interface CustomEventMap {
	[Actions.AddTodo]: [string];
	[Actions.ChangeText]: [number, string];
	[Actions.ChangeView]: [ViewType];
	[Actions.ClearCompleted]: [];
	[Actions.DestroyTodo]: [number];
	[Actions.ToggleAll]: [boolean];
	[Actions.ToggleTodo]: [number, boolean];
}

export const dispatch = <K extends Actions>(
	type: K,
	...payload: CustomEventMap[K]
) =>
	document.dispatchEvent(
		new CustomEvent('action', { detail: { type, payload } })
	);
