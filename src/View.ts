export interface Handler<a> {
	(_: a): void;
}

export interface SubscriptionToken {
	(): void;
}

export interface View<model, a> {
	(initialState: model, root: a): Handler<model>;
}
export function View<model, a>(
	view: (initialState: model, root: a) => Handler<model> | void
): View<model, a> {
	return function View(initialState, root) {
		const render = view(initialState, root);
		if (render) return render;
		return function renderNothing(_) {};
	};
}

export function sequence<model, a>(views: View<model, a>[]): View<model, a> {
	return function viewSequence(initialState, root) {
		const renders = views.map(view => view(initialState, root));
		return function renderSequence(state) {
			renders.forEach(render => render(state));
		};
	};
}

export function contramap<model, submodel, a>(
	f: (_: model) => submodel,
	view: View<submodel, a>
): View<model, a> {
	return function viewContramap(initialState, root) {
		const initialSubstate = f(initialState);
		const render = view(initialSubstate, root);
		return function renderContramap(state) {
			render(f(state));
		};
	};
}

export function whenChanged<model>(
	initialState: model,
	handler: Handler<model>
): Handler<model> {
	let state = initialState;
	return function renderWhenChanged(newState) {
		if (newState !== state) {
			state = newState;
			handler(newState);
		}
	};
}

export function Existing<T extends HTMLElement, model, a extends ParentNode>(
	selector: string,
	makeRenderSubscribe: (element: T) => Handler<model> | void
): View<model, a> {
	return function viewExisting(initialState, root) {
		const element = root.querySelector(selector) as T;
		const render = makeRenderSubscribe(element);
		if (render) {
			render(initialState);
			return whenChanged(initialState, render);
		}
		return _ => {};
	};
}

export function Prop<T extends HTMLElement, K extends keyof T, model>(
	selector: string,
	prop: K,
	f: (_: model) => T[K]
) {
	return contramap(
		f,
		Existing(selector, (element: T) => state => {
			element[prop] = state;
		})
	);
}
