import { Fragment, h } from "preact";
import { View } from "../types";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { NewTodo } from "./NewTodo";

export const App: View = (state, dispatch) => {
	return (
		<>
			<header class="header">
				<h1>todos</h1>
				{NewTodo(state, dispatch)}
			</header>
			{Main(state, dispatch)}
			{Footer(state, dispatch)}
		</>
	);
};
