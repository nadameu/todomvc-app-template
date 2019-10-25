import { html } from "lit-html";
import { State } from "../State";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export function App(state: State) {
	return html`
		${Header(state)}${Main(state)}${Footer(state)}
	`;
}
