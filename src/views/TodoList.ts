import { $ } from '../$';
import { Actions } from '../Action';
import { delegate } from '../delegate';
import { dispatch } from '../dispatch';
import * as KeyCode from '../KeyCode';
import { Model } from '../Model';
import { Todo } from '../Todo';
import { View } from '../View';

const createTodoElement = (() => {
	const template = $('.template') as HTMLTemplateElement;
	return (todo: Todo) => {
		const fragment = document.importNode(template.content, true);
		const li = $('li', fragment) as HTMLLIElement;
		const toggle = $('.toggle', fragment) as HTMLInputElement;
		const label = $('label', fragment) as HTMLLabelElement;
		const destroy = $('.destroy', fragment) as HTMLButtonElement;
		const edit = $('.edit', fragment) as HTMLInputElement;

		label.textContent = todo.text;
		li.classList.toggle('completed', todo.completed);
		toggle.checked = todo.completed;
		edit.value = todo.text;

		return { fragment, li, toggle, label, destroy, edit };
	};
})();

const getIndex = (target: HTMLElement): number =>
	Number(target.closest('li')!.dataset.index || '-1');

export const TodoList = View((initialState: Model, root: ParentNode) => {
	const todoList = root.querySelector('.todo-list') as HTMLUListElement;

	delegate(todoList, 'change', '.toggle', (evt, target: HTMLInputElement) => {
		dispatch(Actions.ToggleTodo, getIndex(target), target.checked);
	});

	delegate(todoList, 'click', '.destroy', (evt, target: HTMLButtonElement) => {
		dispatch(Actions.DestroyTodo, getIndex(target));
	});

	delegate(todoList, 'dblclick', 'label', (evt, target: HTMLLabelElement) => {
		const li = target.closest('li')!;
		const edit = li.querySelector('.edit') as HTMLInputElement;
		li.classList.add('editing');
		edit.value = target.textContent || '';
		edit.select();
		edit.focus();
	});

	delegate(
		todoList,
		'keydown',
		'.edit',
		(evt: KeyboardEvent, target: HTMLInputElement) => {
			let doBlur = false;
			if (evt.keyCode === KeyCode.ENTER) {
				doBlur = true;
			} else if (evt.keyCode === KeyCode.ESC) {
				const li = target.closest('li')!;
				const label = li.querySelector('label')!;
				target.value = label.textContent || '';
				doBlur = true;
			}

			if (doBlur) {
				const li = target.closest('li')!;
				li.classList.remove('editing');
			}
		}
	);

	delegate(todoList, 'change', '.edit', (evt, target: HTMLInputElement) => {
		dispatch(Actions.ChangeText, getIndex(target), target.value);
	});

	render(initialState);
	return render;
	function render(state: Model) {
		while (todoList.firstChild) todoList.removeChild(todoList.firstChild);
		state.todos.forEach((todo, index) => {
			const { fragment, li } = createTodoElement(todo);
			li.dataset.index = String(index);
			li.hidden =
				(state.view === 'Active' && todo.completed) ||
				(state.view === 'Completed' && !todo.completed);
			todoList.appendChild(fragment);
		});
	}
});
