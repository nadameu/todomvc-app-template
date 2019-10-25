export const ViewState = {
	ALL: "ALL",
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED"
} as const;
export type ViewState = typeof ViewState[keyof typeof ViewState];

export function fromHash(hash: string): ViewState {
	switch (hash) {
		case "#/active":
			return ViewState.ACTIVE;

		case "#/completed":
			return ViewState.COMPLETED;

		case "#/":
		default:
			return ViewState.ALL;
	}
}
