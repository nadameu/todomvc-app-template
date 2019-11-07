import { listen } from './listen';

export const delegate = <
	T extends EventTarget,
	E extends Event,
	U extends HTMLElement
>(
	target: T,
	type: string,
	matchers: string,
	handler: (evt: E, target: U) => void
) =>
	listen(target, type, (evt: E): void => {
		if (evt.target instanceof HTMLElement && evt.target.matches(matchers)) {
			handler(evt, evt.target as U);
		}
	});
