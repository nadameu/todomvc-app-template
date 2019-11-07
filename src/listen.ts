export const listen = <T extends EventTarget, E extends Event>(
	target: T,
	type: string,
	handler: (evt: E, target: T) => void
) => {
	const _handler = (evt: Event) => {
		handler(evt as E, target);
	};
	target.addEventListener(type, _handler);
	return () => target.removeEventListener(type, _handler);
};
