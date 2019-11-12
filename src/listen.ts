export const listen = <
	T extends EventTarget,
	K extends keyof HTMLElementEventMap
>(
	target: T,
	type: K,
	handler: (evt: HTMLElementEventMap[K], target: T) => void
) => {
	const _handler = (evt: Event) => {
		handler(evt as HTMLElementEventMap[K], target);
	};
	target.addEventListener(type, _handler);
	return () => target.removeEventListener(type, _handler);
};
