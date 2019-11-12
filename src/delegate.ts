import { listen } from './listen';

export const delegate = <
	T extends EventTarget,
	K extends keyof HTMLElementEventMap,
	U extends HTMLElement
>(
	target: T,
	type: K,
	matchers: string,
	handler: (evt: HTMLElementEventMap[K], target: U) => void
) =>
	listen(target, type, (evt: HTMLElementEventMap[K]): void => {
		if (evt.target instanceof HTMLElement && evt.target.matches(matchers)) {
			handler(evt, evt.target as U);
		}
	});
