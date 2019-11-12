import { sequence } from '../View';
import { ClearCompleted } from './ClearCompleted';
import { Filters } from './Filters';
import { FooterSection } from './FooterSection';
import { TodoCount } from './TodoCount';

export const Footer = sequence([
	FooterSection,
	TodoCount,
	Filters,
	ClearCompleted
]);
