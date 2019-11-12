import { sequence } from '../View';
import { MainSection } from './MainSection';
import { TodoList } from './TodoList';
import { ToggleAll } from './ToggleAll';

export const Main = sequence([MainSection, ToggleAll, TodoList]);
