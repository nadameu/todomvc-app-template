import { Actions } from '../Action';
import { delegate } from '../delegate';
import { dispatch } from '../dispatch';
import { Model } from '../Model';
import { contramap, View, whenChanged } from '../View';
import { fromHash, ViewType } from '../ViewType';

export const Filters = contramap(
	(state: Model) => state.view,
	View((initialState: ViewType, root: ParentNode) => {
		const filters = root.querySelector('.filters') as HTMLUListElement;
		delegate(filters, 'click', 'a[href]', (_, target: HTMLAnchorElement) => {
			dispatch(Actions.ChangeView, fromHash(target.hash));
		});
		const children = Array.from(filters.querySelectorAll('a')).map(child => ({
			li: child,
			view: fromHash(child.hash)
		}));
		render(initialState);
		return whenChanged(initialState, render);
		function render(view: ViewType) {
			for (const { li: child, view: childView } of children) {
				child.classList.toggle('selected', childView === view);
			}
		}
	})
);
