export const queueMicrotask = (f: () => void): void =>
	void Promise.resolve()
		.then(f)
		.catch(err =>
			setTimeout(() => {
				throw err;
			})
		);
