import { Model } from '../Model';
import { Prop } from '../View';

export const MainSection = Prop(
	'.main',
	'hidden',
	({ todos: { length } }: Model) => length <= 0
);
