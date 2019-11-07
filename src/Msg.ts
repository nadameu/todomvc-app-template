import { Todo } from './Todo';
import { ViewType } from './ViewType';

type IMsg<k extends string, a extends object = {}> = {
	type: k;
} & a;

export interface AddTodo extends IMsg<'AddTodo', Todo> {}
export const AddTodo = (todo: Todo): AddTodo => ({ type: 'AddTodo', ...todo });

export interface ChangeView extends IMsg<'ChangeView', { view: ViewType }> {}
export const ChangeView = (view: ViewType): ChangeView => ({
	type: 'ChangeView',
	view
});

export interface ChangeText
	extends IMsg<'ChangeText', { index: number; text: string }> {}
export const ChangeText = (index: number, text: string): ChangeText => ({
	type: 'ChangeText',
	index,
	text
});

export interface ClearCompleted extends IMsg<'ClearCompleted'> {}
export const ClearCompleted: ClearCompleted = { type: 'ClearCompleted' };

export interface DestroyTodo extends IMsg<'DestroyTodo', { index: number }> {}
export const DestroyTodo = (index: number): DestroyTodo => ({
	type: 'DestroyTodo',
	index
});

export interface TogleAll
	extends IMsg<
		'ToggleAll',
		{
			completed: boolean;
		}
	> {}
export const ToggleAll = (completed: boolean): TogleAll => ({
	type: 'ToggleAll',
	completed
});

export interface ToggleTodo
	extends IMsg<'ToggleTodo', { index: number; completed: boolean }> {}
export const ToggleTodo = (index: number, completed: boolean): ToggleTodo => ({
	type: 'ToggleTodo',
	index,
	completed
});

export type Msg =
	| AddTodo
	| ChangeText
	| ChangeView
	| ClearCompleted
	| DestroyTodo
	| TogleAll
	| ToggleTodo;
