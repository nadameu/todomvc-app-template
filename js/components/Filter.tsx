import { Actions } from "../Actions";
import { Dispatch, ViewState } from "../types";
import { State } from "../types";
import { h } from "preact";
import { classMap } from "../classMap";

export function Filter(
	state: State,
	href: string,
	view: ViewState,
	text: string,
	dispatch: Dispatch
) {
	return (
		<li>
			<a
				class={classMap({ selected: state.view === view })}
				href={href}
				onClick={onClick(view)}
			>
				{text}
			</a>
		</li>
	);

	function onClick(view: ViewState) {
		return function (this: HTMLAnchorElement, evt: Event) {
			dispatch(Actions.CHANGE_VIEW(view));
		};
	}
}
