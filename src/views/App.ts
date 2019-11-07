import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { functions as V } from "../View";

export const App = V.combine([Header, Main, Footer]);
