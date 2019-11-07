export interface Incr<a> {
	value: a;
	subscribe(f: (_: a) => void): () => void;
	update(newValue: a): void;
}

export function Incr<a>(
	value: a,
	subscribe: (f: (_: a) => void) => () => void,
	equals = (x: a, y: a) => x === y
): Incr<a> {
	let subs: Array<(_: a) => void> = [];
	let unsub: () => void;
	return {
		value,
		subscribe(f) {
			if (subs.length === 0) {
				subs = [f];
				unsub = subscribe(x => {
					this.update(x);
				});
			} else {
				subs.push(f);
			}
			return () => {
				subs = subs.filter(sub => sub !== f);
				if (subs.length === 0 && unsub) unsub();
			};
		},
		update(newValue) {
			if (!equals(newValue, this.value)) {
				this.value = newValue;
				subs.forEach(sub => sub(newValue));
			}
		}
	};
}

export namespace Incr {
	export const map = <a, b>(incr: Incr<a>, f: (_: a) => b): Incr<b> =>
		Incr(f(incr.value), g => incr.subscribe(x => g(f(x))));

	export const pure = <a>(value: a): Incr<a> =>
		Incr(value, f => {
			f(value);
			return () => {};
		});

	export const bind = <a, b>(fx: Incr<a>, f: (_: a) => Incr<b>): Incr<b> => {
		let fy = f(fx.value);
		let unsub: () => void;
		return Incr(fy.value, g => {
			let innerUnsub = fy.subscribe(y => g(y));
			unsub = fx.subscribe(x => {
				innerUnsub();
				fy = f(x);
				innerUnsub = fy.subscribe(y => g(y));
			});
			return () => {
				innerUnsub();
				unsub();
			};
		});
	};
}
