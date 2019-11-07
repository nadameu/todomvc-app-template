import { Handler, View } from "./defs";

export const contramap = <a, b>(
	handler: Handler<a>,
	f: (_: b) => a
): Handler<b> => state => handler(f(state));

export const whenChanged = <a>(
	initialState: a,
	handler: Handler<a>
): Handler<a> => {
	let state = initialState;
	return newState => {
		if (newState !== state) {
			state = newState;
			handler(newState);
		}
	};
};

export const bindProperty = <T extends Node, K extends keyof T>(
	node: T,
	prop: K
) =>
	whenChanged(node[prop], newValue => {
		node[prop] = newValue;
	});

export const combine2 = <a>(cx: View<a>, cy: View<a>): View<a> => dispatch => {
	const vx = cx(dispatch);
	const vy = cy(dispatch);
	return state => {
		vx(state);
		vy(state);
	};
};

export const combine = <a>(cs: View<a>[]): View<a> => {
	switch (cs.length) {
		case 0:
			return _dispatch => _state => {};

		case 1:
			return cs[0];

		case 2:
			return combine2(cs[0], cs[1]);

		default: {
			const leftLength = cs.length >> 1; // Integer divide by 2;
			const left = combine(cs.slice(0, leftLength));
			const right = combine(cs.slice(leftLength));
			return combine2(left, right);
		}
	}
};
