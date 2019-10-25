import { render } from "lit-html";
import { App } from "./components/App";
import { store } from "./store";
import { STORAGE_ID } from "./constants";
import { Actions } from "./Action";
import { fromHash } from "./ViewState";

const appSection = document.querySelector(".todoapp")!;
function view() {
	const state = store.getState();
	const { view, ...saveMe } = state;
	saveMe.todos = saveMe.todos.map(({ text, completed }) => ({
		text,
		completed,
		editing: false
	}));
	localStorage.setItem(STORAGE_ID, JSON.stringify(saveMe));
	console.log("State is:", state);
	render(App(state), appSection);
	const editing = document.querySelector(
		".editing .edit"
	) as HTMLInputElement | null;
	if (editing) {
		editing.select();
		editing.focus();
	}
	if (state.todoCreated) {
		const input = document.querySelector(".new-todo") as HTMLInputElement;
		input.focus();
		store.dispatch(Actions.clearTodoCreated());
	}
}
store.subscribe(view);
view();
window.addEventListener("hashchange", () => {
	store.dispatch(Actions.changeView(fromHash(window.location.hash)));
});
