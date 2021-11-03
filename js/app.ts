import { render } from "preact";
import * as Cmd from "./Cmd";
import { App } from "./components/App";
import { setImmediate } from "./setImmediate";
import {
	Action,
	ActionResult,
	Cmd as Command,
	enqueue,
	Lazy,
	State,
	View,
	ViewState,
} from "./types";

function mount(
	root: Element,
	view: View,
	init: Lazy<ActionResult>,
	subscriptions?: (_: State) => Command[]
): void {
	let state: State;
	handleResult(init());
	function dispatch(action: Action): void {
		handleResult(action(state));
	}
	function handleResult(result: ActionResult): void {
		const [next, cmd] = result;
		state = next;
		update();
		if (cmd) setImmediate(() => cmd(dispatch));
		if (subscriptions)
			subscriptions(state).forEach((sub) => {
				setImmediate(() => sub(dispatch));
			});
	}
	function update(): void {
		render(view(state, dispatch), root);
	}
}

const appSection = document.querySelector(".todoapp")!;

mount(
	appSection,
	App,
	() =>
		enqueue(
			{
				allCompleted: undefined,
				text: "",
				todoCreated: false,
				todos: [],
				view: ViewState.ALL,
			},
			Cmd.LOAD
		),
	(_) => [Cmd.HASH_CHANGE]
);
