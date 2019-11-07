export const $ = <T extends Element>(
	selector: string,
	context: ParentNode = document
): T | null => context.querySelector<T>(selector);
