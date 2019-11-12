import { Model } from '../Model';
import { Prop } from '../View';

export const FooterSection = Prop(
	'.footer',
	'hidden',
	({ todos: { length } }: Model) => length <= 0
);
