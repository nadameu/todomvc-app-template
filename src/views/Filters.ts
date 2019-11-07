import { $ } from '../$';
import { delegate } from '../delegate';
import { Model } from '../Model';
import { ChangeView } from '../Msg';
import { functions as V, View } from '../View';
import { whenChanged } from '../View/functions';
import { fromHash, ViewType } from '../ViewType';

export const Filters: View = dispatch => {
	const filters = $('.filters') as HTMLUListElement;
	const children = Array.from(filters.querySelectorAll('a')).map(child => ({
		li: child,
		view: fromHash(child.hash)
	}));
	delegate(filters, 'click', 'a[href]', (evt, target: HTMLAnchorElement) => {
		dispatch(ChangeView(fromHash(target.hash)));
	});
	return V.contramap(
		whenChanged(('' as unknown) as ViewType, view => {
			for (const { li: child, view: childView } of children) {
				child.classList.toggle('selected', childView === view);
			}
		}),
		(state: Model) => state.view
	);
};
