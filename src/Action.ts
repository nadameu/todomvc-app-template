export const Actions = {
	textChanged: (value: string) => ({ type: "text-changed", value } as const)
};

export type Action = ReturnType<typeof Actions[keyof typeof Actions]>;
