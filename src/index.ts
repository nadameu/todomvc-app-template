import { Actions } from './Action';
import { CustomEventMap } from './dispatch';
import { Model } from './Model';
import { Handler } from './View';
import { App } from './views/App';
import { loadTodos } from './Storage';
import { fromHash } from './ViewType';

const worker = new Worker('./worker.ts');

let render: Handler<Model> | undefined = undefined;
worker.addEventListener('message', evt => {
	if (evt.data) {
		if (evt.data.command === 'initial-state') {
			render = App(evt.data.state, document.body);
		} else if (render && evt.data.command === 'render') {
			render(evt.data.state);
		}
	}
});

document.addEventListener(
	'action' as any,
	<K extends Actions>({
		detail
	}: {
		detail: { type: K; payload: CustomEventMap[K] };
	}) => {
		worker.postMessage(detail);
	}
);

worker.postMessage({
	type: 'init',
	initialState: {
		todos: loadTodos(),
		toggleAll: false,
		view: fromHash(document.location.hash)
	}
});
window.addEventListener('hashchange', () =>
	worker.postMessage({ type: 'hash', hash: document.location.hash })
);
