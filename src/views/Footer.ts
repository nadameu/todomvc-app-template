import { functions as V } from '../View';
import { ClearCompleted } from './ClearCompleted';
import { Filters } from './Filters';
import { FooterSection } from './FooterSection';
import { TodoCount } from './TodoCount';

export const Footer = V.combine([
	FooterSection,
	TodoCount,
	Filters,
	ClearCompleted
]);
