import { html } from "lit-html";
import { Actions } from "../Action";
import { store } from "../store";
import { ViewState } from "../ViewState";
import { classMap } from "lit-html/directives/class-map";
import { State } from "../State";

export function Filter(
	state: State,
	href: string,
	view: ViewState,
	text: string
) {
	return html`
		<li>
			<a
				class=${classMap({ selected: state.view === view })}
				href=${href}
				@click=${dispatch(view)}
				>${text}</a
			>
		</li>
	`;
}

function dispatch(view: ViewState) {
	return function dispatch(this: HTMLAnchorElement, evt: Event) {
		store.dispatch(Actions.changeView(view));
	};
}
