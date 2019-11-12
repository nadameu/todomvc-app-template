// export const Msg = {
// 	AddTodo: (todo: Todo) => ({ type: 'AddTodo', ...todo } as const),
// 	ChangeView: (view: ViewType) => ({ type: 'ChangeView', view } as const),
// 	ChangeText: (index: number, text: string) =>
// 		({ type: 'ChangeText', index, text } as const),
// 	ClearCompleted: () => ({ type: 'ClearCompleted' } as const),
// 	DestroyTodo: (index: number) => ({ type: 'DestroyTodo', index } as const),
// 	ToggleAll: (completed: boolean) =>
// 		({ type: 'ToggleAll', completed } as const),
// 	ToggleTodo: (index: number, completed: boolean) =>
// 		({ type: 'ToggleTodo', index, completed } as const)
// };

// export type Msg = ReturnType<typeof Msg[keyof typeof Msg]>;
export { Msg } from './Update';
