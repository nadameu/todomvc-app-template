export function classMap(classes: Record<string, boolean>): string {
	return Object.entries(classes)
		.filter(([, active]) => active)
		.map(([name]) => name)
		.join(" ");
}
