import { functions as V } from "../View";
import { MainSection } from "./MainSection";
import { TodoList } from "./TodoList";
import { TogleAll } from "./TogleAll";

export const Main = V.combine([MainSection, TogleAll, TodoList]);
