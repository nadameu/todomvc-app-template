import { sequence } from '../View';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { PersistTodos } from './PersistTodos';

export const App = sequence([Header, Main, Footer, PersistTodos]);
