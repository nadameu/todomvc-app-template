const resolvedPromise = Promise.resolve();
export function setImmediate(f: () => void) {
	resolvedPromise.then(f).catch((error) =>
		setTimeout(() => {
			throw error;
		})
	);
}
