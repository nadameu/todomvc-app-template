export const Views = {
	"#/": "All",
	"#/active": "Active",
	"#/completed": "Completed"
} as const;

export type ViewType = typeof Views[keyof typeof Views];

export const fromHash = (hash: string): ViewType => {
	if (Views.hasOwnProperty(hash)) return Views[hash as keyof typeof Views];
	return Views["#/"];
};
